import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";

// Helpers
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Config
const CFG = {
  lattice: { size: 5, spacing: 0.7 },
  camera: { fov: 60 },
  rotation: { x: -0.55, y: 0.7, z: 0.0 },
  placement: { x: 2.8, y: 0.6, z: 0 },
  colors: {
    bg: 0x0b1120,
    edge: 0x00ffff,
    nodeCore: 0xf97316,
    nodeGlow: 0xf97316,
    photonBase: [0x78b4ff, 0x8000ff, 0xffa500, 0xffff00, 0x00ffff, 0xff00ff],
  },
  photons: {
    batchEveryMs: 3000, // Reduced to spawn more frequently
    lifeMs: 150000,
    loyalPerBatch: 48, // Doubled for more photons
    speedBound: 0.05,
    radius: 0.02,
    undulation: 0.02,
    speedFree: 0.3, // Speed for free phase
    // Post-glitch spawning for deep space filling
    postGlitchBatchEveryMs: 2000, // Slower spawning to prevent stuttering
    postGlitchPerBatch: 40, // Fewer photons per batch to prevent stuttering
  },
  flickerAtMs: 40000,
  flashDurationMs: 3000, // Increased from 1200ms to 3000ms for more visible glitch
  loopAfterMs: 120000, // Extended to allow sentient phase to complete with proper timing
};

// Types
interface Node { x: number; y: number; z: number; key: string; }
interface Edge { a: string; b: string; }
interface Photon {
  edge: [string, string];
  t: number;
  born: number;
  death: number;
  hue: number;
  mode: "bound" | "free" | "sentient" | "exploring";
  pos?: THREE.Vector3;
  vel?: THREE.Vector3;
  // Sentient behavior properties
  target?: string; // Target letter
  behavior?: "orbit" | "settle" | "trace" | "meander" | "pathfind" | "confused" | "panic" | "random";
  assignedLetter?: string; // Which letter this photon is assigned to
  orbitRadius?: number; // For orbiting behavior
  orbitAngle?: number; // Current orbit angle
  settleProgress?: number; // Progress toward settling (0-1)
  traceProgress?: number; // Progress along letter trace (0-1)
  confusionLevel?: number; // How confused this photon is
  panicLevel?: number; // How panicked this photon is
  letterReadTime?: number; // When photon started reading letter
}

// Neural Network Component
interface NeuralNetworkProps {
  onGlitchChange: (active: boolean) => void;
}

function NeuralNetwork({ onGlitchChange }: NeuralNetworkProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [photons, setPhotons] = useState<Photon[]>([]);
  const t0 = useRef(performance.now());
  const last = useRef(t0.current);
  const nextBatchAt = useRef(t0.current + CFG.photons.batchEveryMs);
  const [phase, setPhase] = useState<"bound" | "flash" | "free" | "sentient">("bound");
  
  // Letter positions for "Synthetic Data" - positioned on the actual 3D title
  // Title is positioned at [0, 1.5, -2] with main text size 0.8 and subtitle size 0.6
  // Each character is roughly 0.5 units wide, so we can calculate positions
  const letterPositions = {
    // "Global Leaders in" - main title line
    'G': { x: -10.6, y: 2.8, z: 4 },    // Left side of main title
    'L': { x: -10.2, y: 2.8, z: 4 },    // 
    'O': { x: -9.8, y: 2.8, z: 4 },    // 
    'B': { x: -9.4, y: 2.8, z: 4 },    // 
    'A': { x: -9.0, y: 2.8, z: 4 },     // Center of main title
    'L2': { x: -8.6, y: 2.8, z: 4 },    // 
    'S': { x: -8.2, y: 2.8, z: 4 },     // 
    'I': { x: -7.8, y: 2.8, z: 4 },     // 
    'N': { x: -7.4, y: 2.8, z: 4 },     // Right side of main title
    
    // "Synthetic Data" - subtitle line
    'S2': { x: -10.4, y: 1.0, z: 4 },   // Left side of subtitle
    'Y': { x: -10.0, y: 1.0, z: 4 },    // 
    'N2': { x: -9.6, y: 1.0, z: 4 },    // 
    'T': { x: -9.2, y: 1.0, z: 4 },    // 
    'H': { x: -8.8, y: 1.0, z: 4 },     // Center of subtitle
    'E': { x: -8.4, y: 1.0, z: 4 },     // 
    'T2': { x: -8.0, y: 1.0, z: 4 },    // 
    'I2': { x: -7.6, y: 1.0, z: 4 },    // Right side of subtitle
    'C': { x: -7.2, y: 1.0, z: 4 }      // 
  };

  // Build lattice
  useEffect(() => {
    const N = CFG.lattice.size;
    const S = CFG.lattice.spacing;
    const half = ((N - 1) * S) / 2;
    const tmpNodes: Node[] = [];
    const nodeMap: { [key: string]: Node } = {};

    const mapIndex = (x: number, y: number, z: number) => `${x}-${y}-${z}`;

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let z = 0; z < N; z++) {
          const key = mapIndex(x, y, z);
          const n = { x: x * S - half, y: y * S - half, z: z * S - half, key };
          tmpNodes.push(n);
          nodeMap[key] = n;
        }
      }
    }

    const tmpEdges: Edge[] = [];
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let z = 0; z < N; z++) {
          const aKey = mapIndex(x, y, z);

          const neighbors = [
            [x + 1, y, z], [x, y + 1, z], [x, y, z + 1],
            [x + 1, y + 1, z], [x + 1, y, z + 1], [x, y + 1, z + 1],
            [x + 1, y - 1, z], [x - 1, y + 1, z], [x + 1, y, z - 1],
            [x, y + 1, z - 1], [x + 1, y + 1, z + 1],
          ];

          neighbors.forEach(([nx, ny, nz]) => {
            const bKey = mapIndex(nx, ny, nz);
            if (nodeMap[bKey]) tmpEdges.push({ a: aKey, b: bKey });
          });
        }
      }
    }

    setNodes(tmpNodes);
    setEdges(tmpEdges);
  }, []);

  // Spawn photons
  const spawnBatch = (ts: number) => {
    const newPhotons: Photon[] = [];
    
    // Use different spawn settings based on phase
    const batchSize = (phase === "free" || phase === "sentient") ? CFG.photons.postGlitchPerBatch : CFG.photons.loyalPerBatch;
    
    for (let i = 0; i < batchSize; i++) {
      const e = edges[Math.floor(Math.random() * edges.length)];
      if (!e) continue;
      
      // After glitch, spawn photons to fill the space
      if (phase === "free" || phase === "sentient") {
        // Spawn new photons from nodes to fill the space
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        const randomVel = new THREE.Vector3(rand(-0.2, 0.2), rand(-0.2, 0.2), rand(-0.2, 0.2));
        
        newPhotons.push({
          edge: [e.a, e.b],
          t: 0,
          born: ts,
          death: ts + CFG.photons.lifeMs,
          hue: CFG.colors.photonBase[Math.floor(Math.random() * CFG.colors.photonBase.length)],
          mode: "free",
          pos: new THREE.Vector3(randomNode.x, randomNode.y, randomNode.z),
          vel: randomVel,
        });
      } else {
        // Before glitch, normal bound mode
        newPhotons.push({
          edge: [e.a, e.b],
          t: rand(0, 1),
          born: ts,
          death: ts + CFG.photons.lifeMs,
          hue: CFG.colors.photonBase[Math.floor(Math.random() * CFG.colors.photonBase.length)],
          mode: "bound",
        });
      }
    }
    setPhotons((prev) => [...prev, ...newPhotons]);
    
    // Use different timing based on phase
    const nextBatchDelay = (phase === "free" || phase === "sentient") ? CFG.photons.postGlitchBatchEveryMs : CFG.photons.batchEveryMs;
    nextBatchAt.current = ts + nextBatchDelay;
  };

  // Convert to free phase
  const convertToFree = (ts: number) => {
    setPhotons((prev) =>
      prev.map((p) => {
        const a = nodes.find((n) => n.key === p.edge[0])!;
        const b = nodes.find((n) => n.key === p.edge[1])!;
        const pos = new THREE.Vector3(lerp(a.x, b.x, p.t), lerp(a.y, b.y, p.t), lerp(a.z, b.z, p.t));
        const vel = new THREE.Vector3(rand(-0.2, 0.2), rand(-0.2, 0.2), rand(-0.2, 0.2));
        return {
          ...p,
          mode: "free",
          pos,
          vel,
          death: ts + CFG.photons.lifeMs * 1.5, // Extend life in free phase
        };
      })
    );
    setPhase("free");
  };
  
  // Convert to sentient phase - ALL photons become sentient (but only 80 are special)
  const convertToSentient = (ts: number) => {
    const letterKeys = Object.keys(letterPositions);
    let sentientCount = 0;
    const maxSentient = 80;
    
    setPhotons((prev) =>
      prev.map((p) => {
        if (p.mode === "free") {
          // ALL photons become sentient - but only 80 get special letter-seeking behavior
          const pos = p.pos || new THREE.Vector3(0, 0, 0);
          
          if (sentientCount < maxSentient) {
            // Special 80: assigned to letters, will seek them out
            // Assign each photon to a specific letter for better distribution
            const assignedLetter = letterKeys[sentientCount % letterKeys.length];
            
            sentientCount++;
            
            return {
              ...p,
              mode: "sentient",
              pos,
              vel: p.vel, // Keep EXACT momentum for total continuity
              assignedLetter,
              behavior: "settle",
              orbitRadius: 0.3,
              orbitAngle: rand(0, Math.PI * 2),
              settleProgress: 0,
              traceProgress: 0,
              death: ts + CFG.photons.lifeMs * 2, // Extended life for sentient behavior
              // Keep EXACT same visual properties for total continuity
              hue: p.hue, // Preserve original color exactly
            };
          } else {
            // Rest of photons: just random exploring (looks sentient but no tracking)
            return {
              ...p,
              mode: "sentient",
              pos,
              vel: p.vel, // Keep EXACT momentum for total continuity
              behavior: "random",
              death: ts + CFG.photons.lifeMs * 1.5,
              // Keep EXACT same visual properties for total continuity
              hue: p.hue, // Preserve original color exactly
            };
          }
        }
        return p;
      })
    );
    setPhase("sentient");
  };
  


  // Animate
  useFrame(() => {
    const ts = performance.now();
    const dt = Math.min(16.67, ts - last.current) / 16.67; // Normalize to 60 FPS
    last.current = ts;
    const elapsed = ts - t0.current;

    // Phase transitions
    if (phase === "bound" && elapsed >= CFG.flickerAtMs) {
      setPhase("flash");
      onGlitchChange(true); // Activate glitch immediately
      setTimeout(() => {
        convertToFree(ts); // Convert to free first (floating phase)
        onGlitchChange(false); // Deactivate glitch
      }, CFG.flashDurationMs * 0.6);
    }
    
    // After floating phase ends, convert ALL photons to sentient behavior (80 special, rest random)
    if (phase === "free" && elapsed >= CFG.flickerAtMs + 15000) { // 15 seconds after glitch for proper floating phase
      convertToSentient(ts);
    }

    // Loop logic - complete reset to prevent hybrid animations
    if (CFG.loopAfterMs && elapsed >= CFG.loopAfterMs) {
      if (phase === "sentient") {
        // After sentient phase, wait much longer then complete reset
        if (elapsed >= CFG.loopAfterMs + 30000) { // 30 seconds after sentient phase
          // Complete reset - clear everything
          setPhotons([]); // Clear ALL photons
          setPhase("bound");
          t0.current = ts;
          last.current = ts;
          nextBatchAt.current = ts + CFG.photons.batchEveryMs;
          // Start fresh with only bound photons
          spawnBatch(ts);
        }
      } else {
        // Normal loop for other phases
        setPhotons([]); // Clear ALL photons
        setPhase("bound");
        t0.current = ts;
        last.current = ts;
        nextBatchAt.current = ts + CFG.photons.batchEveryMs;
        spawnBatch(ts);
      }
    }

    // Continue spawning photons in all phases to fill the area
    if (ts >= nextBatchAt.current && edges.length) spawnBatch(ts);

    setPhotons((prev) => {
      return prev
        .map((p) => {
          if (p.mode === "bound") {
            let t = clamp(p.t + CFG.photons.speedBound * dt, 0, 1);
            if (t >= 1) {
              const here = Math.random() < 0.5 ? p.edge[1] : p.edge[0];
              const nextEdges = edges.filter((e) => e.a === here || e.b === here);
              if (nextEdges.length) {
                const next = nextEdges[Math.floor(Math.random() * nextEdges.length)];
                p.edge = [next.a, next.b];
                t = 0;
              }
            }
            
            // Subtle energy boost to keep bound photons dynamic
            if (Math.random() < 0.0005) {
              t += rand(-0.001, 0.001);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.0003) {
              t += rand(-0.002, 0.002);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.0001) {
              t += rand(-0.003, 0.003);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.00005) {
              t += rand(-0.004, 0.004);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.00001) {
              t += rand(-0.005, 0.005);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.000005) {
              t += rand(-0.006, 0.006);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.000001) {
              t += rand(-0.007, 0.007);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.0000005) {
              t += rand(-0.008, 0.008);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.0000001) {
              t += rand(-0.009, 0.009);
              t = clamp(t, 0, 1);
            }
            
            // Additional energy boost to keep bound photons moving
            if (Math.random() < 0.00000005) {
              t += rand(-0.01, 0.01);
              t = clamp(t, 0, 1);
            }
            
            return { ...p, t };
          } else if (p.mode === "free" && p.pos && p.vel) {
            p.pos.addScaledVector(p.vel, CFG.photons.speedFree * dt);
            p.vel.multiplyScalar(0.98); // Slight damping for natural movement
            
            // Energy boost to prevent free photons from stopping
            if (p.vel.length() < 0.005) {
              p.vel.set(rand(-0.15, 0.15), rand(-0.15, 0.15), rand(-0.15, 0.15));
            }
            
            // Occasional energy boost for variety
            if (Math.random() < 0.001) {
              p.vel.add(new THREE.Vector3(rand(-0.02, 0.02), rand(-0.02, 0.02), rand(-0.02, 0.02)));
            }
            
            // Additional energy boost to keep free photons moving
            if (Math.random() < 0.0005) {
              p.vel.multiplyScalar(1.02);
            }
            
            // Additional energy boost to keep free photons moving
            if (Math.random() < 0.0003) {
              p.vel.add(new THREE.Vector3(rand(-0.01, 0.01), rand(-0.01, 0.01), rand(-0.01, 0.01)));
            }
            
            return p;
          } else if (p.mode === "sentient" && p.pos && p.assignedLetter) {
            // Sentient photon behavior - read letter then become exploring
            const targetPos = letterPositions[p.assignedLetter as keyof typeof letterPositions];
            if (targetPos) {
              const target = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
              const distance = p.pos.distanceTo(target);
              
              if (distance > 0.1) {
                // Move toward letter with smooth, intentional movement
                const direction = target.clone().sub(p.pos).normalize();
                p.pos.addScaledVector(direction, 0.08 * dt); // Much faster, more intentional
                
                // Add some personality to the movement
                if (Math.random() < 0.01) {
                  const personality = new THREE.Vector3(rand(-0.01, 0.01), rand(-0.01, 0.01), rand(-0.01, 0.01));
                  p.pos.add(personality);
                }
              } else {
                // At letter - settle and show approval
                if (!p.letterReadTime) {
                  p.letterReadTime = ts;
                }
                
                // Gentle pulsing to show they're alive and approving
                const pulse = Math.sin((ts - p.letterReadTime) * 0.005) * 0.02;
                p.pos.copy(target).add(new THREE.Vector3(0, 0, pulse));
                
                // Subtle glow effect - but keep it gentle to maintain scene continuity
                // The glow will be handled in the rendering section
                
                // No more movement - permanently settled and glowing
              }
            }
            return p;
          } else if (p.mode === "sentient" && p.pos && p.behavior === "random") {
            // Non-special sentient photons: random exploring (looks sentient but no tracking)
            if (Math.random() < 0.02) {
              // Occasionally decide on a new direction with purpose
              const targetX = rand(-4, 4);
              const targetY = rand(-3, 3);
              const targetZ = rand(-3, 3);
              p.pos.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.01);
            }
            
            // Add tiny random movement to show they're thinking
            if (Math.random() < 0.001) {
              p.pos.add(new THREE.Vector3(rand(-0.02, 0.02), rand(-0.02, 0.02), rand(-0.02, 0.02)));
            }
            
            return p;
          } else if (p.mode === "sentient" && p.pos && p.behavior === "random") {
            // Non-special sentient photons: random exploring (looks sentient but no tracking)
            if (Math.random() < 0.02) {
              // Occasionally decide on a new direction with purpose
              const targetX = rand(-4, 4);
              const targetY = rand(-3, 3);
              const targetZ = rand(-3, 3);
              p.pos.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.01);
            }
            
            // ALWAYS move - never stop
            if (p.vel) {
              // Continuous movement with existing velocity
              p.pos.addScaledVector(p.vel, 0.03 * dt); // Faster movement
              
              // Add tiny random movement to show they're thinking
              if (Math.random() < 0.001) {
                p.pos.add(new THREE.Vector3(rand(-0.02, 0.02), rand(-0.02, 0.02), rand(-0.02, 0.02)));
              }
              
              // Prevent them from stopping by frequently refreshing velocity
              if (Math.random() < 0.01) { // Increased frequency
                p.vel.set(rand(-0.15, 0.15), rand(-0.15, 0.15), rand(-0.15, 0.15));
              }
            } else {
              // Fallback: if no velocity, create one to prevent stopping
              p.vel = new THREE.Vector3(rand(-0.1, 0.1), rand(-0.1, 0.1), rand(-0.1, 0.1));
            }
            
            return p;
          } else if (p.mode === "exploring" && p.pos && p.vel) {
            // Exploring photon behavior - varied individual personalities
            switch (p.behavior) {
              case "meander":
                // Gentle wandering with slight random movement
                p.vel.add(new THREE.Vector3(rand(-0.01, 0.01), rand(-0.01, 0.01), rand(-0.01, 0.01)));
                p.pos.addScaledVector(p.vel, 0.015 * dt);
                
                // Occasional energy boost for variety
                if (Math.random() < 0.002) {
                  p.vel.add(new THREE.Vector3(rand(-0.05, 0.05), rand(-0.05, 0.05), rand(-0.05, 0.05)));
                }
                
                // Additional gentle energy boost
                if (Math.random() < 0.001) {
                  p.vel.multiplyScalar(1.05);
                }
                break;
                
              case "pathfind":
                // Try to find new routes, occasionally change direction
                if (Math.random() < 0.01) {
                  p.vel.set(rand(-0.3, 0.3), rand(-0.3, 0.3), rand(-0.3, 0.3));
                }
                p.pos.addScaledVector(p.vel, 0.02 * dt);
                
                // Pathfinding energy - keep exploring
                if (Math.random() < 0.001) {
                  p.vel.add(new THREE.Vector3(rand(-0.08, 0.08), rand(-0.08, 0.08), rand(-0.08, 0.08)));
                }
                
                // Additional energy boost for variety
                if (Math.random() < 0.0005) {
                  p.vel.multiplyScalar(1.1);
                }
                break;
                
              case "confused":
                // Go in circles and figure-8s
                const confusion = p.confusionLevel || 0;
                const time = ts * 0.001;
                const radius = 0.5 + confusion * 0.5;
                p.pos.set(
                  Math.cos(time * (1 + confusion)) * radius,
                  Math.sin(time * (2 + confusion)) * radius * 0.5,
                  Math.sin(time * (1.5 + confusion)) * radius * 0.3
                );
                
                // Confusion energy - keep the pattern alive
                if (Math.random() < 0.001) {
                  p.confusionLevel = (p.confusionLevel || 0) + rand(-0.1, 0.1);
                  p.confusionLevel = Math.max(0, Math.min(1, p.confusionLevel));
                }
                
                // Additional confusion energy boost
                if (Math.random() < 0.0008) {
                  const energyBoost = rand(0.8, 1.2);
                  p.pos.multiplyScalar(energyBoost);
                }
                break;
                
              case "panic":
                // Shooting star behavior - fast, erratic movement
                p.vel.add(new THREE.Vector3(rand(-0.1, 0.1), rand(-0.1, 0.1), rand(-0.1, 0.1)));
                p.pos.addScaledVector(p.vel, 0.05 * dt);
                
                // Panic energy - never stop moving
                if (p.vel.length() < 0.02) {
                  p.vel.set(rand(-0.3, 0.3), rand(-0.3, 0.3), rand(-0.3, 0.3));
                }
                
                // Additional panic energy boost
                if (Math.random() < 0.005) {
                  p.vel.multiplyScalar(1.2);
                }
                break;
                
              case "random":
              default:
                // Completely random independent paths
                if (Math.random() < 0.02) {
                  p.vel.set(rand(-0.2, 0.2), rand(-0.2, 0.2), rand(-0.2, 0.2));
                }
                p.pos.addScaledVector(p.vel, 0.025 * dt);
                
                // Random energy bursts for true chaos
                if (Math.random() < 0.003) {
                  p.vel.add(new THREE.Vector3(rand(-0.1, 0.1), rand(-0.1, 0.1), rand(-0.1, 0.1)));
                }
                
                // Additional random energy boost
                if (Math.random() < 0.002) {
                  p.vel.multiplyScalar(1.15);
                }
                break;
            }
            
            // Add slight damping to all exploring photons
            p.vel.multiplyScalar(0.99);
            
            // Energy boost to prevent complete standstill
            if (p.vel.length() < 0.01) {
              p.vel.set(rand(-0.1, 0.1), rand(-0.1, 0.1), rand(-0.1, 0.1));
            }
            
            // Additional energy boost to keep exploring photons moving
            if (Math.random() < 0.0005) {
              p.vel.add(new THREE.Vector3(rand(-0.05, 0.05), rand(-0.05, 0.05), rand(-0.05, 0.05)));
            }
            
            // Additional energy boost to keep exploring photons moving
            if (Math.random() < 0.0003) {
              p.vel.multiplyScalar(1.03);
            }
            
            // Additional energy boost to keep exploring photons moving
            if (Math.random() < 0.0001) {
              p.vel.add(new THREE.Vector3(rand(-0.02, 0.02), rand(-0.02, 0.02), rand(-0.02, 0.02)));
            }
            
            return p;
          }
          return p;
        })
        .filter((p) => ts < p.death);
    });

    // Glitch effect is now controlled by state, no need for DOM manipulation here
  });

  return (
    <group rotation={[CFG.rotation.x, CFG.rotation.y, CFG.rotation.z]} position={[CFG.placement.x, CFG.placement.y, CFG.placement.z]}>
      {/* Nodes */}
      {nodes.map((n) => (
        <mesh key={n.key} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={CFG.colors.nodeCore} />
        </mesh>
      ))}
      
      {/* Node Glows - soft illumination for pathways */}
      {nodes.map((n) => (
        <mesh key={`glow-${n.key}`} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial 
            color={CFG.colors.nodeGlow} 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Edges */}
      {edges.map((e, i) => {
        const a = nodes.find((n) => n.key === e.a);
        const b = nodes.find((n) => n.key === e.b);
        if (!a || !b) return null;
        const mid: [number, number, number] = [(a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2];
        const vec = new THREE.Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
        const len = vec.length();
        const axis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, vec.clone().normalize());
        return (
          <mesh key={i} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.005, 0.005, len, 4]} />
            <meshBasicMaterial color={CFG.colors.edge} transparent opacity={0.3} />
          </mesh>
        );
      })}

      {/* Photons */}
      {photons.map((p, i) => {
        const a = nodes.find((n) => n.key === p.edge[0]);
        const b = nodes.find((n) => n.key === p.edge[1]);
        if (!a || !b) return null;
        const x = p.mode === "bound" ? lerp(a.x, b.x, p.t) : (p.pos?.x ?? lerp(a.x, b.x, p.t));
        const y = p.mode === "bound" ? lerp(a.y, b.y, p.t) : (p.pos?.y ?? lerp(a.y, b.y, p.t));
        const z = p.mode === "bound" ? lerp(a.z, b.z, p.t) : (p.pos?.z ?? lerp(a.z, b.z, p.t));
        // Different visual styles based on photon mode
        let photonColor = p.hue;
        let photonSize = CFG.photons.radius;
        let photonOpacity = 0.8;
        
        if (p.mode === "sentient") {
          // Sentient photons keep their original beautiful colors and size for continuity
          photonColor = p.hue; // Keep original color
          photonSize = CFG.photons.radius; // Same size as free photons
          photonOpacity = 0.8; // Same opacity as free photons
          
          // Only add glow for photons that have actually reached their letters
          if (p.letterReadTime && p.assignedLetter) {
            photonSize = CFG.photons.radius * 1.2; // Only slightly larger when settled
            photonOpacity = 0.8; // Keep same opacity for continuity
          }
        } else if (p.mode === "exploring") {
          // Exploring photons keep their original beautiful colors
          photonColor = p.hue; // Keep original color
          photonSize = CFG.photons.radius;
        }
        
        return (
          <>
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[photonSize, 8, 8]} />
              <meshBasicMaterial 
                color={photonColor} 
                transparent 
                opacity={photonOpacity} 
                blending={THREE.AdditiveBlending} 
              />
            </mesh>
            
            {/* Add subtle glow for settled sentient photons - ONLY when they reach letters */}
            {p.mode === "sentient" && p.letterReadTime && p.assignedLetter && (
              <mesh key={`glow-${i}`} position={[x, y, z]}>
                <sphereGeometry args={[photonSize * 1.5, 8, 8]} />
                <meshBasicMaterial 
                  color={photonColor} 
                  transparent 
                  opacity={0.3} 
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}
            
            {/* Add pulsing effect for settled sentient photons - ONLY when they reach letters */}
            {p.mode === "sentient" && p.letterReadTime && p.assignedLetter && (
              <mesh key={`pulse-${i}`} position={[x, y, z]} scale={[1 + Math.sin(performance.now() * 0.005) * 0.2, 1 + Math.sin(performance.now() * 0.005) * 0.2, 1 + Math.sin(performance.now() * 0.005) * 0.2]}>
                <sphereGeometry args={[photonSize * 2.5, 8, 8]} />
                <meshBasicMaterial 
                  color={photonColor} 
                  transparent 
                  opacity={0.1} 
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}
          </>
        );
      })}
    </group>
  );
}

// 3D Title Component - positioned in 3D space but appears flat from initial camera angle
function Title3D() {
  // Position the title where the red boxes indicate - to the left of the network
  // Camera is at [6, 6, 6] looking at the network
  // We want the title to face the camera initially but have 3D depth
  const titlePosition: [number, number, number] = [-10, 2, 4]; // Shift more left parallel to camera
  const titleRotation: [number, number, number] = [0, 0.6, 0]; // Reduce rotation to match aligned viewport - no more leaning back
  
  return (
    <group position={titlePosition} rotation={titleRotation}>
      {/* Main 3D Title */}
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.8}
        height={0.15} // Reduced depth for better readability
        curveSegments={12}
        bevelEnabled={true}
        bevelThickness={0.015}
        bevelSize={0.008}
        bevelOffset={0}
        bevelSegments={5}
      >
        Global Leaders in
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.05}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </Text3D>
      
              {/* Synthetic Data subtitle with different styling */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.6}
          height={0.12}
          curveSegments={12}
          bevelEnabled={true}
          bevelThickness={0.012}
          bevelSize={0.006}
          bevelOffset={0}
          bevelSegments={5}
          position={[0, -1.2, 0]}
        >
          Synthetic Data
          <meshStandardMaterial 
            color="#00ffff" 
            metalness={0.1}
            roughness={0.15}
            emissive="#00ffff"
            emissiveIntensity={0.2}
          />
        </Text3D>
        
        {/* Artist Signature - by Gwylym Owen */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.06}
          curveSegments={8}
          bevelEnabled={true}
          bevelThickness={0.008}
          bevelSize={0.004}
          bevelOffset={0}
          bevelSegments={3}
          position={[-9.5, -0.5, 4]}
        >
          by Gwylym Owen
          <meshStandardMaterial 
            color="#9ca3af" 
            metalness={0.05}
            roughness={0.3}
            emissive="#9ca3af"
            emissiveIntensity={0.05}
          />
        </Text3D>
      </group>
    );
  }

// Camera Tracker Component - gets camera position from Canvas context
function CameraTracker({ onCameraUpdate }: { onCameraUpdate: (pos: [number, number, number], rot: [number, number, number]) => void }) {
  useFrame(({ camera }) => {
    onCameraUpdate(
      [camera.position.x, camera.position.y, camera.position.z],
      [camera.rotation.x, camera.rotation.y, camera.rotation.z]
    );
  });
  return null;
}

export default function AethergenHero() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [blackScreenVisible, setBlackScreenVisible] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([6, 6, 6]);
  const [cameraRotation, setCameraRotation] = useState<[number, number, number]>([0, 0, 0]);
  
  // Control black screen flashes when glitch is active
  useEffect(() => {
    if (!glitchActive) {
      setBlackScreenVisible(false);
      return;
    }
    
    // First black flash
    const timer1 = setTimeout(() => setBlackScreenVisible(true), 600); // 21% of 3s
    const timer2 = setTimeout(() => setBlackScreenVisible(false), 900); // 30% of 3s
    
    // Second black flash
    const timer3 = setTimeout(() => setBlackScreenVisible(true), 1530); // 51% of 3s
    const timer4 = setTimeout(() => setBlackScreenVisible(false), 1800); // 60% of 3s
    
    // Third black flash - THE FINAL DEATH BLOW!
    const timer5 = setTimeout(() => setBlackScreenVisible(true), 2400); // 80% of 3s
    const timer6 = setTimeout(() => setBlackScreenVisible(false), 2700); // 90% of 3s
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [glitchActive]);

  return (
    <div className="w-full h-[78vh] min-h-[520px] bg-[#0b1120] overflow-hidden relative">
      <Canvas 
        camera={{ 
          position: [3.62, 1.37, 10.22], 
          rotation: [-0.093, 0.445, 0.044],
          fov: CFG.camera.fov 
        }} 
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
        onCreated={() => {
          // Scene reference not needed for current functionality
        }}
      >
        <color attach="background" args={[CFG.colors.bg]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <NeuralNetwork onGlitchChange={setGlitchActive} />
        <Title3D />
        <CameraTracker onCameraUpdate={(pos, rot) => {
          setCameraPosition(pos);
          setCameraRotation(rot);
        }} />
        <OrbitControls
          enableZoom
          maxDistance={10}
          minDistance={0.5}
          enablePan={true} // Enable panning
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          dampingFactor={0.05} // Enable damping for smoother stopping
          rotateSpeed={0.5} // Adjust sensitivity
          enableDamping={true} // Ensure damping is active
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,    // Left click = rotate
            MIDDLE: THREE.MOUSE.DOLLY,   // Middle click = zoom
            RIGHT: THREE.MOUSE.PAN       // Right click = pan/drag
          }}
          onChange={() => {
            // Camera position and rotation are updated automatically by OrbitControls
            // We'll get the camera from the Canvas context instead
          }}
        />
      </Canvas>
      
      {/* Realistic AGI Emergence Glitch Overlay - looks like electrical interference */}
      <div className={`glitch-overlay absolute inset-0 pointer-events-none z-[9999] ${glitchActive ? 'active' : ''}`}>
        {/* TV interference pattern - covers whole hero section */}
        <div className="glitch-static absolute inset-0" />
        {/* Glitch lines */}
        <div className="glitch-lines absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="glitch-line absolute w-full h-1 bg-white"
              style={{
                top: `${(i * 20)}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
        <div className="glitch-flicker absolute inset-0 bg-white" />
      </div>

      {/* AGI Letters emerging through the interference - CRITICAL: 24 hours of work */}
      <div className={`agi-letters absolute inset-0 pointer-events-none z-[9997] ${glitchActive ? 'active' : ''}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-8xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">
            AGI
          </h1>
        </div>
      </div>

      {/* Black screen overlay - controlled by React state */}
      <div className={`absolute inset-0 pointer-events-none z-[10000] bg-black transition-opacity duration-100 ${blackScreenVisible ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Camera Position Tracker - for perfect positioning */}
      <div className="absolute top-20 left-4 z-[10001] pointer-events-none bg-black bg-opacity-70 text-white p-3 rounded font-mono text-sm">
        <div className="font-bold mb-2">Camera Position:</div>
        <div>X: {cameraPosition[0].toFixed(2)}</div>
        <div>Y: {cameraPosition[1].toFixed(2)}</div>
        <div>Z: {cameraPosition[2].toFixed(2)}</div>
        <div className="font-bold mt-3 mb-2">Camera Rotation:</div>
        <div>X: {cameraRotation[0].toFixed(3)}</div>
        <div>Y: {cameraRotation[1].toFixed(3)}</div>
        <div>Z: {cameraRotation[2].toFixed(3)}</div>
      </div>
      
    </div>
  );
}