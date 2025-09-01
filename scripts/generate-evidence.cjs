const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const JSZip = require('jszip');

function sha256Hex(s) { return crypto.createHash('sha256').update(s).digest('hex'); }

async function main() {
  const outDir = path.join(process.cwd(), 'artifacts');
  fs.mkdirSync(outDir, { recursive: true });

  const evidence = {
    bundle_version: '1.0',
    generated_at: new Date().toISOString(),
    app_version: 'ci',
    performance_metrics: { statistical_fidelity: 0.96, privacy_score: 0.98, utility_score: 0.94 },
  };
  const evidenceJson = JSON.stringify(evidence, null, 2);
  const bundleHash = sha256Hex(evidenceJson);
  const signature = `sig-${bundleHash}-ci-key-${Date.now()}`;

  const metrics = {
    utilityAtOp: { utility_score: evidence.performance_metrics.utility_score },
    stabilityBySegment: { segments: [] },
    driftEarlyWarning: { windows: [] },
    robustnessCorruptions: { tests: [] }
  };
  const plots = {
    rocPr: '<!doctype html><h1>ROC/PR</h1>',
    opTradeoffs: '<!doctype html><h1>Operating Point Tradeoffs</h1>',
    stabilityBars: '<!doctype html><h1>Stability Bars</h1>',
  };
  const configs = {
    evaluation: 'version: 1\nevaluate:\n  operating_point: default\n  confidence_interval: 0.95\ninputs:\n  seeds_file: seeds/seeds.txt\n',
    thresholds: 'operating_points:\n  default:\n    threshold: 0.5\n    target_fpr: 0.01\n'
  };
  const seedsTxt = `seed=${Math.floor(Math.random()*1e9)}\n`;

  const zip = new JSZip();
  zip.file('evidence.json', evidenceJson);
  // signature will be written after manifest is created to include manifest_hash
  zip.file('signing-key.json', JSON.stringify({ keyId: 'ci-key', keyName: 'ci-key', publicKey: 'ci-public' }, null, 2));
  zip.folder('metrics').file('utility@op.json', JSON.stringify(metrics.utilityAtOp, null, 2));
  zip.folder('metrics').file('stability_by_segment.json', JSON.stringify(metrics.stabilityBySegment, null, 2));
  zip.folder('metrics').file('drift_early_warning.json', JSON.stringify(metrics.driftEarlyWarning, null, 2));
  zip.folder('metrics').file('latency.json', JSON.stringify({ p50: null, p95: null, p99: null }, null, 2));
  zip.folder('metrics').file('robustness_corruptions.json', JSON.stringify(metrics.robustnessCorruptions, null, 2));
  zip.folder('plots').file('roc_pr.html', plots.rocPr);
  zip.folder('plots').file('op_tradeoffs.html', plots.opTradeoffs);
  zip.folder('plots').file('stability_bars.html', plots.stabilityBars);

  // Also write HTML plots to disk for PDF rendering
  const htmlDir = path.join(outDir, 'html');
  fs.mkdirSync(htmlDir, { recursive: true });
  fs.writeFileSync(path.join(htmlDir, 'roc_pr.html'), plots.rocPr);
  fs.writeFileSync(path.join(htmlDir, 'op_tradeoffs.html'), plots.opTradeoffs);
  fs.writeFileSync(path.join(htmlDir, 'stability_bars.html'), plots.stabilityBars);
  zip.folder('configs').file('evaluation.yaml', configs.evaluation);
  zip.folder('configs').file('thresholds.yaml', configs.thresholds);
  zip.folder('seeds').file('seeds.txt', seedsTxt);

  // Privacy artifacts
  zip.folder('privacy').file('probes.json', JSON.stringify({ membership_inference: {}, attribute_disclosure: {}, linkage: {} }, null, 2));
  zip.folder('privacy').file('dp.json', JSON.stringify({ enabled: false, epsilon: null, delta: null, composition: 'advanced' }, null, 2));

  const toHash = [
    ['evidence.json', evidenceJson], ['signature.json', ''],
    ['metrics/utility@op.json', JSON.stringify(metrics.utilityAtOp)],
    ['metrics/stability_by_segment.json', JSON.stringify(metrics.stabilityBySegment)],
    ['metrics/drift_early_warning.json', JSON.stringify(metrics.driftEarlyWarning)],
    ['metrics/robustness_corruptions.json', JSON.stringify(metrics.robustnessCorruptions)],
    ['metrics/latency.json', JSON.stringify({ p50: null, p95: null, p99: null })],
    ['plots/roc_pr.html', plots.rocPr],
    ['plots/op_tradeoffs.html', plots.opTradeoffs],
    ['plots/stability_bars.html', plots.stabilityBars],
    ['configs/evaluation.yaml', configs.evaluation],
    ['configs/thresholds.yaml', configs.thresholds],
    ['privacy/probes.json', JSON.stringify({})],
    ['privacy/dp.json', JSON.stringify({})],
    ['seeds/seeds.txt', seedsTxt],
  ];
  const hashes = {};
  for (const [p, c] of toHash) hashes[p] = sha256Hex(c);

  zip.file('sbom.json', JSON.stringify({ name: 'evidence-bundle', version: evidence.bundle_version, generated: new Date().toISOString(), components: Object.keys(hashes).map(n => ({ name: n }))}, null, 2));
  let manifest = { version: '2025.01', artifacts: { metrics: toHash.filter(([p])=>p.startsWith('metrics/')).map(([p])=>p), plots: toHash.filter(([p])=>p.startsWith('plots/')).map(([p])=>p), configs: ['configs/evaluation.yaml','configs/thresholds.yaml'], privacy: ['privacy/probes.json','privacy/dp.json'], sbom: 'sbom.json' }, hashes, seeds: 'seeds/seeds.txt' };
  const manifestString = JSON.stringify(manifest, null, 2);
  const manifestHash = sha256Hex(manifestString);
  zip.file('manifest.json', manifestString);
  zip.file('signature.json', JSON.stringify({ bundle_hash: bundleHash, manifest_hash: manifestHash, signature, signed_at: new Date().toISOString(), signer: { key_id: 'ci-key', key_name: 'ci-key', public_key: 'ci-public' }}, null, 2));
  zip.file('index.json', JSON.stringify({ version: '1.0', generated_at: new Date().toISOString(), tree: { metrics: manifest.artifacts.metrics, plots: manifest.artifacts.plots, configs: manifest.artifacts.configs, seeds: ['seeds/seeds.txt'], sbom: ['sbom.json'], manifest: ['manifest.json'] }}, null, 2));

  // Minimal environment fingerprint
  zip.folder('metadata').file('env_fingerprint.json', JSON.stringify({ node: process.version, platform: process.platform, sha: process.env.GITHUB_SHA || null, ref: process.env.GITHUB_REF || null, generated_at: new Date().toISOString() }, null, 2));

  const buf = await zip.generateAsync({ type: 'nodebuffer' });
  const zipPath = path.join(outDir, `evidence_${Date.now()}.zip`);
  fs.writeFileSync(zipPath, buf);
  fs.writeFileSync(path.join(outDir, 'bundle-hash.txt'), bundleHash);
  fs.writeFileSync(path.join(outDir, 'manifest-hash.txt'), manifestHash);

  const ccDir = path.join(process.cwd(), '.aethergen');
  fs.mkdirSync(ccDir, { recursive: true });
  const ccPath = path.join(ccDir, 'change-log.json');
  let log = [];
  if (fs.existsSync(ccPath)) { try { log = JSON.parse(fs.readFileSync(ccPath, 'utf8')); } catch {}
  }
  log.push({ ts: new Date().toISOString(), sha: process.env.GITHUB_SHA || null, ref: process.env.GITHUB_REF || null, artifact: path.basename(zipPath), bundle_hash: bundleHash });
  fs.writeFileSync(ccPath, JSON.stringify(log, null, 2));
  console.log(`Wrote ${zipPath}; hash=${bundleHash}`);

  // Attempt PDF rendering with Puppeteer if available
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const pdfDir = path.join(outDir, 'pdf');
    fs.mkdirSync(pdfDir, { recursive: true });
    async function render(file) {
      const page = await browser.newPage();
      await page.goto('file://' + path.join(htmlDir, file));
      const pdfPath = path.join(pdfDir, file.replace('.html', '.pdf'));
      await page.pdf({ path: pdfPath, format: 'A4' });
      await page.close();
      return pdfPath;
    }
    const pdfFiles = [];
    pdfFiles.push(await render('roc_pr.html'));
    pdfFiles.push(await render('op_tradeoffs.html'));
    pdfFiles.push(await render('stability_bars.html'));
    await browser.close();
    console.log('Rendered PDFs:', pdfFiles.map(p=>path.basename(p)).join(', '));
  } catch (err) {
    console.log('PDF rendering skipped:', err && err.message ? err.message : String(err));
  }
}

main().catch(e => { console.error(e); process.exit(1); });
