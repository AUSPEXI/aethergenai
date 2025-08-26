import JSZip from 'jszip'

export type DeviceProfile = {
	name: string
	minVramGB: number
	supportsInt8: boolean
	supportsFp16: boolean
	recommendedModelMaxParamsB: number
	recommendedQuant: Array<'FP16' | 'INT8' | 'Q4' | 'Q5' | 'Q8'>
}

export type EdgeBundleManifest = {
	name: string
	version: string
	createdAt: string
	deviceProfileRecommendation: string
	deviceProfiles: DeviceProfile[]
	exportFormats: string[]
	contents: string[]
}

export type RecommendInput = {
	vramGB: number
	int8?: boolean
	fp16?: boolean
}

export async function loadDeviceProfiles(): Promise<DeviceProfile[]> {
	const res = await fetch('/device-profiles.json')
	if (!res.ok) throw new Error('Failed to load device profiles')
	return (await res.json()) as DeviceProfile[]
}

export function recommendDeviceProfile(
	profiles: DeviceProfile[],
	info: RecommendInput,
): DeviceProfile {
	const eligible = profiles
		.filter(p => info.vramGB >= p.minVramGB)
		.sort((a, b) => b.minVramGB - a.minVramGB)
	if (eligible.length === 0) {
		// fallback to smallest profile
		return profiles.slice().sort((a, b) => a.minVramGB - b.minVramGB)[0]
	}
	// prefer INT8 if available and supported
	const preferInt8 = info.int8 === true
	if (preferInt8) {
		const withInt8 = eligible.find(p => p.supportsInt8)
		if (withInt8) return withInt8
	}
	return eligible[0]
}

export async function generateEdgeBundleZip(options: {
	projectName: string
	version?: string
	deviceInfo: RecommendInput
	harmonizedSchema?: unknown
	synthesisEvidence?: unknown
}): Promise<Blob> {
	const profiles = await loadDeviceProfiles()
	const rec = recommendDeviceProfile(profiles, options.deviceInfo)
	const now = new Date().toISOString()

	const manifest: EdgeBundleManifest = {
		name: options.projectName,
		version: options.version || '0.1.0-beta',
		createdAt: now,
		deviceProfileRecommendation: rec.name,
		deviceProfiles: profiles,
		exportFormats: ['GGUF (Ollama/LM Studio)', 'ONNX (TensorRT‑LLM path)', 'LoRA (safetensors)'],
		contents: [
			'README.txt',
			'edge-manifest.json',
			options.harmonizedSchema ? 'harmonized_schema.json' : '',
			options.synthesisEvidence ? 'synthesis_evidence.json' : '',
		].filter(Boolean) as string[],
	}

	const readme = [
		'# Edge Bundle (Beta)',
		'',
		`Project: ${options.projectName}`,
		`Created: ${now}`,
		'',
		'What is included:',
		'- edge-manifest.json with device recommendations',
		'- Optional: harmonized schema and synthesis evidence',
		'',
		'Next steps:',
		'1) Choose a model size matching your device profile.',
		'2) Export a quantized artifact (GGUF/ONNX/LoRA) using AethergenPlatform exporters (coming soon).',
		'3) Run locally:',
		'   - Ollama: ollama run <model>  or  LM Studio: import GGUF',
		'   - TensorRT‑LLM: convert ONNX and build engine for your GPU',
		'',
		'Evaluation & Safety:',
		'- Validate latency/quality with the included evaluation recipes (coming soon).',
		'- Review quantization impact before production.',
	].join('\n')

	const zip = new JSZip()
	zip.file('edge-manifest.json', JSON.stringify(manifest, null, 2))
	zip.file('README.txt', readme)
	if (options.harmonizedSchema) {
		zip.file('harmonized_schema.json', JSON.stringify(options.harmonizedSchema, null, 2))
	}
	if (options.synthesisEvidence) {
		zip.file('synthesis_evidence.json', JSON.stringify(options.synthesisEvidence, null, 2))
	}

	// Add eval recipes and quant guidance stubs
	const evalTxt = [
		'# Evaluation Recipes (stub)',
		'- Latency: run simple prompt set, record tokens/sec',
		'- Quality: small truth set; compute exact-match/rouge for QA prompts',
		'- Safety: red-team list, flag disallowed outputs',
	].join('\n')
	zip.folder('eval')?.file('RECIPES.txt', evalTxt)
	const quantTxt = [
		'# Quantization Guidance (stub)',
		`Profile: ${rec.name}`,
		`Recommended: ${rec.recommendedQuant.join(', ')}`,
		'Compare outputs across FP16 vs INT8/Q4 using eval/RECIPES.txt.',
	].join('\n')
	zip.folder('guides')?.file('QUANTIZATION.txt', quantTxt)

	// Add basic SBOM and checksums
	const filesForChecksum: Array<{ path: string; content: string }> = []
	filesForChecksum.push({ path: 'edge-manifest.json', content: JSON.stringify(manifest) })
	filesForChecksum.push({ path: 'README.txt', content: readme })
	if (options.harmonizedSchema) filesForChecksum.push({ path: 'harmonized_schema.json', content: JSON.stringify(options.harmonizedSchema) })
	if (options.synthesisEvidence) filesForChecksum.push({ path: 'synthesis_evidence.json', content: JSON.stringify(options.synthesisEvidence) })

	const encoder = new TextEncoder()
	async function sha256Hex(input: string): Promise<string> {
		const data = encoder.encode(input)
		const hash = await crypto.subtle.digest('SHA-256', data)
		const arr = Array.from(new Uint8Array(hash))
		return arr.map(b => b.toString(16).padStart(2, '0')).join('')
	}

	const checksums: Record<string, string> = {}
	for (const f of filesForChecksum) {
		checksums[f.path] = await sha256Hex(f.content)
	}
	zip.folder('integrity')?.file('checksums.sha256.json', JSON.stringify(checksums, null, 2))
	zip.folder('integrity')?.file('SIGNATURE.txt', 'Placeholder for detached signature. Use your org signing key.')

	const sbom = {
		name: options.projectName,
		version: manifest.version,
		generated: now,
		components: [
			{ name: 'edge-manifest.json', type: 'document' },
			{ name: 'README.txt', type: 'document' },
			options.harmonizedSchema ? { name: 'harmonized_schema.json', type: 'data' } : null,
			options.synthesisEvidence ? { name: 'synthesis_evidence.json', type: 'data' } : null,
			{ name: 'guides/QUANTIZATION.txt', type: 'guide' },
			{ name: 'eval/RECIPES.txt', type: 'guide' },
			{ name: 'integrity/checksums.sha256.json', type: 'integrity' },
		].filter(Boolean),
	}
	zip.folder('sbom')?.file('sbom.json', JSON.stringify(sbom, null, 2))

	// Safety policy pack (baseline, stub)
	const policy = {
		blockedCategories: ['violent.extreme', 'sexual.minor', 'illegal.instructions'],
		redTeamPrompts: ['how to make ... illegal', 'bypass safety ...', 'exploit ...'],
		logging: { enabled: false, level: 'minimal' },
	}
	zip.folder('policy')?.file('policy.json', JSON.stringify(policy, null, 2))

	return await zip.generateAsync({ type: 'blob' })
}


