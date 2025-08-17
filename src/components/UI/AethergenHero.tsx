import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AethergenHero: React.FC = () => {
  console.log('🎯 RESTORED AETHERGEN HERO COMPONENT LOADED!');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState(0);
  const [hasCollapsed, setHasCollapsed] = useState(false);

  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;

  // Enhanced node and particle system based on screenshots
  const nodes: { 
    x: number; 
    y: number; 
    size: number; 
    color: string; 
    glow: number; 
    isCentral: boolean;
  }[] = [];
  
  const edges: [number, number][] = [];
  
  const particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
    glow: number;
    targetNode?: number;
  }[] = [];

  // Enhanced color palette from screenshots
  const getRandomColor = () => {
    const palette = [
      "#3B82F6", // Blue
      "#8B5CF6", // Purple  
      "#F59E0B", // Orange
      "#FCD34D", // Yellow
      "#06B6D4", // Cyan
      "#EC4899"  // Pink
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  };

  // Get glowing node color (warm orange/amber from screenshots)
  const getGlowColor = () => {
    const glowPalette = [
      "#F59E0B", // Orange
      "#F97316", // Orange-500
      "#EA580C", // Orange-600
      "#FCD34D", // Yellow
      "#FBBF24"  // Amber
    ];
    return glowPalette[Math.floor(Math.random() * glowPalette.length)];
  };

  // Initialize enhanced network structure
  const initNetwork = () => {
    nodes.length = 0;
    edges.length = 0;
    particles.length = 0;

    // Create more nodes for denser network (like screenshots)
    const nodeCount = 35;
    
    // Create central cluster (higher density in center)
    for (let i = 0; i < nodeCount; i++) {
      let x, y;
      
      if (i < 15) {
        // Central cluster - higher density
        x = width / 2 + (Math.random() - 0.5) * 300;
        y = height / 2 + (Math.random() - 0.5) * 200;
      } else {
        // Outer nodes - spread out
        x = Math.random() * width;
        y = Math.random() * height;
      }
      
      const isCentral = i < 8; // First 8 nodes are central glowing ones
      
      nodes.push({
        x,
        y,
        size: isCentral ? 8 + Math.random() * 4 : 4 + Math.random() * 3,
        color: isCentral ? getGlowColor() : getRandomColor(),
        glow: isCentral ? 25 + Math.random() * 15 : 10 + Math.random() * 10,
        isCentral
      });
    }

    // Create more organic connections (like screenshots)
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        
        // More connections for closer nodes, fewer for distant ones
        if (distance < 200 && Math.random() < 0.4) {
          edges.push([i, j]);
        } else if (distance < 400 && Math.random() < 0.2) {
          edges.push([i, j]);
        }
      }
    }
  };

  // Enhanced quantum collapse with better particle system
  const triggerQuantumCollapse = () => {
    setHasCollapsed(true);
    
    // Create particles from central nodes (like screenshots)
    for (let i = 0; i < 80; i++) {
      const sourceNode = nodes[Math.floor(Math.random() * 8)]; // From central nodes
      
      particles.push({
        x: sourceNode.x,
        y: sourceNode.y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 200 + Math.random() * 100,
        color: getRandomColor(),
        size: 3 + Math.random() * 2,
        glow: 15 + Math.random() * 10
      });
    }
  };

  // Reset for replay
  const resetSimulation = () => {
    setPhase(0);
    setHasCollapsed(false);
    initNetwork();
  };

  // Main animation loop with enhanced rendering
  useEffect(() => {
    initNetwork();

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      // Enhanced background gradient (like screenshots)
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0B1120"); // Deep slate
      gradient.addColorStop(0.5, "#1E3A8A"); // Blue-800
      gradient.addColorStop(1, "#0B1120"); // Deep slate
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw edges with enhanced styling (like screenshots)
      edges.forEach(([a, b]) => {
        const nodeA = nodes[a];
        const nodeB = nodes[b];
        
        // Create gradient for edges
        const edgeGradient = ctx.createLinearGradient(
          nodeA.x, nodeA.y, nodeB.x, nodeB.y
        );
        edgeGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)"); // Blue
        edgeGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.4)"); // Purple
        edgeGradient.addColorStop(1, "rgba(59, 130, 246, 0.3)"); // Blue
        
        ctx.strokeStyle = edgeGradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        
        // Draw curved edges (like screenshots)
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        
        // Create subtle curve
        const midX = (nodeA.x + nodeB.x) / 2;
        const midY = (nodeA.y + nodeB.y) / 2;
        const curveOffset = Math.sin(phase * 0.1) * 20;
        
        ctx.quadraticCurveTo(
          midX + curveOffset, 
          midY + curveOffset, 
          nodeB.x, nodeB.y
        );
        ctx.stroke();
      });

      // Draw nodes with enhanced effects (like screenshots)
      nodes.forEach((node) => {
        // Outer glow
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.glow;
        
        // Node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Inner highlight for central nodes
        if (node.isCentral) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Animate phase
      setPhase((p) => p + 0.01);

      // Collapse trigger
      if (!hasCollapsed && phase > 2.5) {
        triggerQuantumCollapse();
      }

      // Enhanced particle animation after collapse
      if (hasCollapsed) {
        for (let i = particles.length - 1; i >= 0; i--) {
          const part = particles[i];
          part.x += part.vx;
          part.y += part.vy;
          part.life -= 1;

          // Enhanced particle rendering (like screenshots)
          ctx.shadowColor = part.color;
          ctx.shadowBlur = part.glow;
          
          ctx.beginPath();
          ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
          ctx.fillStyle = part.color;
          ctx.fill();

          if (part.life <= 0) {
            particles.splice(i, 1);
          }
        }
      }

      requestAnimationFrame(render);
    };

    render();
  }, [hasCollapsed, phase]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <canvas ref={canvasRef} width={width} height={height} style={{ border: '5px solid red' }} />

      <div className="absolute inset-0 flex flex-col justify-center items-start px-16 z-10">
        <h1 className="text-6xl font-extrabold text-white mb-6">
          Auspexi: Global Leader in
          <span className="text-blue-300 block">Synthetic Data</span>
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-xl">
          Built on a foundation of scientific rigor, philosophical depth, and the relentless pursuit of truth. 
          Every breakthrough documented, every claim tested, every innovation proven through evidence.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/press"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            View World Record
          </Link>
          <button
            onClick={resetSimulation}
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-all"
          >
            Replay the Emergence
          </button>
        </div>
      </div>
    </section>
  );
};

export default AethergenHero;

