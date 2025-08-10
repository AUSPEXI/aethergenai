import React from 'react';
import { Rocket, ShieldCheck, PiggyBank, Database, Sparkles, Boxes, Mail, ArrowRightCircle, Cpu } from 'lucide-react';

const CTAButton: React.FC<{ label: string; tab?: 'pricing' | 'resources' | 'account'; variant?: 'primary' | 'secondary' }>=({ label, tab, variant='primary' })=> (
  <button
    onClick={() => tab && window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab } }))}
    className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-colors ${
      variant==='primary' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
    }`}
  >{label}</button>
);

const Divider: React.FC<{ icon?: React.ReactNode }>=({ icon }) => (
  <div className="flex items-center justify-center my-10">
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
    <div className="mx-3 text-blue-300">{icon}</div>
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
  </div>
);

const Section: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }>=({ title, subtitle, children }) => (
  <section className="max-w-7xl mx-auto px-6 py-12">
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100 mb-2">{title}</h2>
    {subtitle && (<p className="text-slate-300 mb-6 max-w-3xl">{subtitle}</p>)}
    {children}
  </section>
);

const LandingPage: React.FC = () => {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-2xl px-4 py-1 text-sm bg-emerald-900/30 text-emerald-300 mb-4 neon-ring">
          <Sparkles size={16} /> Evidence‑led. Privacy‑preserving. Databricks‑ready.
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
          Unlock the Future of AI Training: AethergenAI – Evidence‑Led Synthetic Data & Models
        </h1>
        <p className="text-slate-300 max-w-3xl mx-auto mb-8">
          Generate high‑fidelity datasets, build specialised models, and optimise with Autopilot—faster, safer, and at a fraction of the cost. Designed for regulated industries, powered by 10 innovations. In a world where AI scaling hits limits, AethergenAI empowers you to innovate without the hefty price tag.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <CTAButton label="Explore Resources →" tab="resources" variant="secondary" />
          <CTAButton label="View Pricing" tab="pricing" />
        </div>
      </section>

      {/* Section 1: Problem We Solve */}
      <Divider icon={<ShieldCheck size={20} />} />
      <Section title="Why Traditional AI Training Falls Short" subtitle="Brute‑force scaling with GPUs is expensive and unsustainable—hitting cost walls, data scarcity, and privacy risks. Regulated sectors like healthcare and MoD struggle with compliance, while businesses waste time on opaque processes. AethergenAI changes that with evidence‑led, optimised tools that put control back in your hands.">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl p-6 dark-card neon-card">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1"><PiggyBank size={18}/> Cost Barriers</div>
            <p className="text-slate-300 text-sm">Spend 5–10x less on training with lean techniques.</p>
          </div>
          <div className="rounded-xl p-6 dark-card neon-card">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1"><Database size={18}/> Data Scarcity</div>
            <p className="text-slate-300 text-sm">Generate unlimited synthetic data with &lt;3% real data reliance.</p>
          </div>
          <div className="rounded-xl p-6 dark-card neon-card">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1"><ShieldCheck size={18}/> Privacy Risks</div>
            <p className="text-slate-300 text-sm">Built‑in compliance for GDPR/ISO, ensuring trust.</p>
          </div>
        </div>
        <div className="mt-6">
          <CTAButton label="View Pricing" tab="pricing" />
        </div>
      </Section>

      {/* Section 2: Innovations & Capabilities */}
      <Divider icon={<Rocket size={20} />} />
      <Section title="10 Innovations Powering Your Success" subtitle="AethergenAI’s breakthroughs deliver real‑world results without revealing the magic. From synthetic‑first generation to self‑improving Autopilot, we’ve crafted a platform that’s efficient, auditable, and scalable.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl p-6 dark-card neon-card">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1"><Cpu size={18}/> Synthetic‑First Generation</div>
            <p className="text-slate-300 text-sm">Scale to tens of millions of rows locally, with DP control and cleaning built‑in—perfect for experimenting at the edge.</p>
          </div>
          <div className="rounded-xl p-6 dark-card neon-card">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1"><ShieldCheck size={18}/> Auditable Evidence</div>
            <p className="text-slate-300 text-sm">AUM certificates, AGO resonance, 432 harmony, TriCoT, ACI, VRME—bundled per release for compliance and confidence.</p>
          </div>
          <div className="rounded-xl p-6 dark-card neon-card">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1"><Boxes size={18}/> Databricks Ready</div>
            <p className="text-slate-300 text-sm">Delta tables + preview, OPTIMIZE/Z‑ORDER, Unity Catalog—seamless Marketplace listings.</p>
          </div>
          <div className="rounded-xl p-6 dark-card neon-card">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1"><Sparkles size={18}/> Build Specialised Models</div>
            <p className="text-slate-300 text-sm">Autopilot finds optimal recipes for your data—faster than brute force, safer than real data.</p>
          </div>
        </div>
        <div className="mt-6">
          <CTAButton label="Build Your Model" tab="account" />
        </div>
      </Section>

      {/* Section 3: Offerings & Pricing */}
      <Divider icon={<ArrowRightCircle size={20} />} />
      <Section title="Tailored Solutions for Your Needs" subtitle="Whether you’re buying datasets, renting models, or building your own, AethergenAI offers flexible tiers with benefits like cost savings, privacy assurance, and innovation at scale.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {[
            {t:'Datasets',d:'Preview (Free, 50k rows) • Standard £399/$499 • Enterprise £25k/$30k/yr (Delta Sharing)'},
            {t:'Specialised Models',d:'Niche like Healthcare Fraud Detection £149/$199 p/seat / month'},
            {t:'Prediction Credits',d:'100k £49/$59 • 1M £399/$499 (one‑time)'},
            {t:'Developer Hub',d:'Dev Hub £299/$379 • Pro £499/$629 • Enterprise £2,999/$3,799 (5 seats)'}
          ].map(({t,d}) => (
            <div key={t} className="rounded-xl p-6 dark-card neon-card flex flex-col">
              <div className="text-emerald-300 font-semibold mb-2">{t}</div>
              <p className="text-slate-300 text-sm flex-grow">{d}</p>
              <div className="mt-4"><CTAButton label="View Pricing" tab="pricing" /></div>
            </div>
          ))}
        </div>
        <p className="text-slate-300 mt-6">Unlock unlimited potential—contact us for bundles or custom quotes.</p>
        <div className="mt-4"><CTAButton label="Get Started" tab="account" /></div>
      </Section>

      {/* Section 4: Call to Action (Netlify form) */}
      <Divider icon={<Mail size={20} />} />
      <Section title="Ready to Transform Your AI Workflow?" subtitle="Join innovators using AethergenAI to experiment at the edge and compete on outcomes, not hardware. We’re here to partner—let’s chat.">
        <form name="contact" method="POST" data-netlify="true" className="grid md:grid-cols-3 gap-4 max-w-3xl" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" />
          <input className="col-span-1 bg-slate-900/70 border border-slate-700 rounded px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Name" name="name" required />
          <input className="col-span-1 bg-slate-900/70 border border-slate-700 rounded px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Email" type="email" name="email" required />
          <div className="hidden">
            <input name="bot-field" />
          </div>
          <textarea className="md:col-span-3 bg-slate-900/70 border border-slate-700 rounded px-3 py-2 h-28 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Message" name="message" required />
          <div className="md:col-span-3"><button type="submit" className="px-6 py-3 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-500">Submit</button></div>
        </form>
      </Section>
    </div>
  );
};

export default LandingPage;


