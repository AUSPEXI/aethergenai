import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

// Blog post data – curated, evidence-led posts only
const blogPostsData = {
  'phoenix-rising-journey': {
    title: '🎭 Phoenix Rising: A Founder’s Journey',
    excerpt: 'How a personal reset, disciplined work, and evidence-led engineering shaped AethergenPlatform. A human story behind the technology.',
    author: 'Gwylym Owen',
    date: 'January 12, 2025',
    readTime: '8 min read',
    category: 'Founder Story',
    content: `
      <h2>A disciplined build</h2>
      <p>Behind the platform is a straightforward story: reset, focus, and ship. Long weeks, measured progress, and a commitment to evidence over hype.</p>
      <h2>What mattered</h2>
      <p>Clear requirements, small validated steps, and transparent outcomes. That’s the through‑line from idea to working system.</p>
    `
  },
  'evidence-led-ai-regulated-industries': {
    title: '📜 Evidence‑Led AI in Regulated Industries: A Practical Guide',
    excerpt: 'How to deploy synthetic‑first, evidence‑led AI in finance, healthcare, and government with privacy, auditability, and scale.',
    author: 'Gwylym Owen',
    date: 'January 16, 2025',
    readTime: '12 min read',
    category: 'Technology',
    content: `
      <h2>Why This Post Exists</h2>
      <p>If you work in a regulated organisation, you’ve probably felt this tension: the business wants AI yesterday, but compliance, privacy, and procurement are (rightly) cautious. Promises aren’t enough—<strong>evidence</strong> is. This article explains how we build and ship AI with <em>evidence first</em> so teams can move quickly <em>and</em> keep trust.</p>

      <h2>What “Evidence‑Led” Actually Means</h2>
      <p>At Auspexi, we build on our platform <strong>AethergenPlatform</strong> to generate synthetic data, train/evaluate models, and produce <em>evidence bundles</em> as standard. An evidence bundle is a signed JSON (and attachments) that tells a reviewer:</p>
      <ul>
        <li><strong>Where it came from:</strong> schema, versions, recipe/parameter hashes, artifact checksums</li>
        <li><strong>How safe it is:</strong> differential privacy budget (ε), attribute disclosure, membership‑inference probes</li>
        <li><strong>How useful it is:</strong> statistical alignment (KS/TV), task accuracy deltas vs reference</li>
        <li><strong>What mattered:</strong> ablation traces that show which modules/features actually move the needle</li>
        <li><strong>How to use it:</strong> a model card/datasheet with limits and responsible‑use notes</li>
      </ul>
      <p>Reviewers get facts, not fluff. Builders keep momentum because reviews focus on the <em>bundle</em>, not scattered spreadsheets and slides.</p>

      <h2>The Privacy Bit (Plain Language)</h2>
      <p>We default to <strong>synthetic‑first</strong> data: we learn patterns from minimal or redacted seed samples, then generate new records that 
      behave like the real thing without carrying real identifiers. When needed, we apply differential privacy (ε, δ) so that no single person’s data 
      can significantly change the output. We also run disclosure probes—can we recognise a person, or overfit to a rare pattern?—and include those results in the bundle.</p>

      <h2>A Concrete Example</h2>
      <p>Imagine credit‑risk modelling under Basel governance. We build a <em>synthetic transaction graph</em> with risk features and typology injection (e.g., late‑pay patterns) using privacy budgets appropriate for the use case. We train and evaluate, then publish the bundle:</p>
      <ul>
        <li>PD AUC/KS lift vs baseline (utility)</li>
        <li>MIA/attribute‑disclosure scores (privacy)</li>
        <li>Drift signals and stability under scenario stress (risk)</li>
        <li>What changed outcomes (ablation)</li>
      </ul>
      <p>Compliance can reason about the model in <em>their</em> language. Procurement can file the signed JSON with the contract. 
      Product can move forward without putting raw customer data at risk.</p>

      <h2>How This Works on AethergenPlatform</h2>
      <p>AethergenPlatform is our evidence‑led workspace. In practice you walk the workflow like this:</p>
      <ol>
        <li><strong>Schema Designer:</strong> define fields, constraints, and privacy levels (who needs to see what)</li>
        <li><strong>Generator:</strong> produce synthetic datasets at the volumes you need with ε control</li>
        <li><strong>Benchmarks & Ablation:</strong> run task evaluations, stress, and ablations (what actually matters)</li>
        <li><strong>Reporting:</strong> export a <em>signed evidence bundle</em> and model/dataset cards for review</li>
      </ol>
      <p>If you’re a self‑hosted team, you run compute. If you need us to shoulder production and SLAs, we provide <em>Managed Delivery</em> 
      (Databricks‑aligned) with the same evidence baked in.</p>

      <h2>What We Publish—and What We Don’t</h2>
      <p>We publish enough for trust and operation: lineage, metrics, ablations, and cards. We <em>don’t</em> publish proprietary control laws or full training code unless a contract calls for it. The boundary is deliberate: buyers get assurance; IP stays protected.</p>

      <h2>Where to Start</h2>
      <p>If you’re evaluating AI in a regulated space, start with <em>one</em> use case and one clear success metric. We’ll generate a synthetic dataset, train/evaluate a baseline, and hand you a bundle with signed metrics. You can then decide, with evidence in hand, whether to proceed to a pilot.</p>

      <p><strong>Next:</strong> If you want a guided pilot (credit risk, AML, claims fraud, or operations forecasting), <a href="/contact">contact us</a>. We’ll align privacy budgets, KPIs, and documentation from day one so adoption doesn’t stall at the last mile.</p>
    `
  },
  'databricks-marketplace-lab-to-revenue': {
    title: '🧪➡️💸 Databricks Marketplace: From Lab to Revenue in Days',
    excerpt: 'Turn synthetic datasets and niche models into marketplace listings with bundled evidence and enterprise‑ready packaging.',
    author: 'Gwylym Owen',
    date: 'January 17, 2025',
    readTime: '11 min read',
    category: 'Business Strategy',
    content: `
      <h2>Why Marketplace</h2>
      <p>Marketplaces shorten discovery, legal, and delivery. We package datasets/models with <strong>Delta tables, Unity Catalog metadata</strong>, and a <em>signed evidence bundle</em> so enterprise buyers evaluate quickly.</p>
      <h2>Packaging Steps</h2>
      <ul>
        <li>Create Delta table (OPTIMIZE/Z‑ORDER) with preview & descriptions</li>
        <li>Register in Unity Catalog; attach tags (domain, license, sensitivity)</li>
        <li>Export evidence bundle (privacy/utility/ablation) and link in listing</li>
        <li>Provide notebook quickstart; optional MLflow model with examples</li>
      </ul>
      <h2>Quality Gates</h2>
      <p>Listings fail closed unless <em>utility ≥ threshold</em>, <em>privacy ≤ bound</em>, and <em>docs complete</em>. This protects brand and accelerates acceptance.</p>
      <h2>Platform Tie‑In</h2>
      <p>Use the <em>Datasets/Models</em> libraries to create a <em>bundle</em> zip (manifest + SBOM/evidence), then follow our Marketplace runbook. Push‑button from Reporting is coming.</p>
    `
  },
  'pricing-and-entitlements-explained': {
    title: '💡 Pricing & Entitlements Explained: Self‑Service vs Full‑Service',
    excerpt: 'How our tiers map to real‑world needs, prevent cannibalisation, and clarify who runs compute.',
    author: 'Gwylym Owen',
    date: 'January 18, 2025',
    readTime: '10 min read',
    category: 'Business Strategy',
    content: `
      <h2>Two Clear Service Models</h2>
      <ul>
        <li><strong>Platform (Self‑Service):</strong> tools only; you run compute; datasets sold separately</li>
        <li><strong>Managed Delivery (Full‑Service):</strong> we run compute and deliver on Databricks with SLAs</li>
      </ul>
      <h2>Why This Separation</h2>
      <p>Separating platform tools from managed compute prevents entitlements confusion and preserves economics: experimentation is inexpensive, production has guarantees.</p>
      <h2>Evidence in Pricing</h2>
      <p>Enterprise tiers include <em>evidence reporting</em> and <em>compliance support</em>. Platform tiers export the same evidence, but SLAs and run‑ownership differ. This avoids apples‑to‑oranges comparisons.</p>
    `
  },
  'synthetic-data-lifecycle': {
    title: '🔁 The Synthetic Data Lifecycle: From Seeds to Evidence',
    excerpt: 'A practical tour of how synthetic data flows through design, generation, validation, and evidence bundling—without exposing PHI/PII.',
    author: 'Gwylym Owen',
    date: 'January 18, 2025',
    readTime: '12 min read',
    category: 'Technology',
    content: `
      <h2>Lifecycle Stages</h2>
      <ol>
        <li><strong>Design:</strong> multi‑schema with constraints and privacy levels</li>
        <li><strong>Seed:</strong> minimal, scrubbed samples (or none) with field‑wise synthesis</li>
        <li><strong>Generate:</strong> high‑scale rows with ε control and drift detection</li>
        <li><strong>Validate:</strong> privacy/utility probes; task eval</li>
        <li><strong>Evidence:</strong> bundle metrics, lineage, ablation; sign & ship</li>
      </ol>
      <h2>What “Evidence‑Led” Means</h2>
      <p>Every hand‑off produces an artifact (JSON) that a buyer or auditor can verify. The platform automates these artifacts to keep velocity high without cutting corners.</p>
    `
  },
  'evidence-bundles-and-testing': {
    title: '📦 Evidence Bundles & Testing: Trustworthy AI Without Exposing IP',
    excerpt: 'What we publish (and what we deliberately withhold). Evidence that convinces risk teams while protecting core IP.',
    author: 'Gwylym Owen',
    date: 'January 19, 2025',
    readTime: '12 min read',
    category: 'Technology',
    content: `
      <h2>What We Publish</h2>
      <ul>
        <li><strong>Lineage & hashes:</strong> schema, recipes, artifacts checksums</li>
        <li><strong>Privacy/utility:</strong> re‑id, attribute disclosure, task deltas</li>
        <li><strong>Ablations:</strong> which modules matter, and how much</li>
        <li><strong>Limits:</strong> intended use, known failure modes</li>
      </ul>
      <h2>What We Withhold</h2>
      <p>Control laws, full training code, and weights absent contractual terms. We provide <em>enough to trust</em> and <em>enough to operate</em> without leaking IP.</p>
      <h2>Verification</h2>
      <p>Bundles are signed. Optionally, we add <em>zk‑UPB</em> (privacy bounds) and attach ablation cards so third parties can check claims.</p>
    `
  },
  'schema-designer-multi-data-llm': {
    title: '🧱 Schema Designer & Multi‑Data Pipelines for LLMs',
    excerpt: 'Design schemas, harmonise multi‑domain data, and scale synthetic generation to billions—then train niche or large models.',
    author: 'Gwylym Owen',
    date: 'January 19, 2025',
    readTime: '13 min read',
    category: 'Technology',
    content: `
      <h2>Multi‑Schema by Design</h2>
      <p>Real programmes span domains (events, profiles, logs). We model <em>linked schemas</em> with constraints and cardinalities; the generator respects these relationships at scale.</p>
      <h2>Harmonisation</h2>
      <p>We normalise types, units, and identifiers and provide adapters to map legacy datasets onto target schemas. This is where evidence starts: schema diffs and harmonisation notes are part of the bundle.</p>
      <h2>From Pipelines to Models</h2>
      <p>Pipeline outputs feed into training/eval recipes with ablations. We export <em>model cards</em> and <em>dataset sheets</em> so teams can reproduce or extend safely.</p>
      <h2>Platform Tie‑In</h2>
      <p>Use Pipelines to snapshot configurations, Benchmarks to compare variants, and Reporting to export procurement‑ready documents.</p>
    `
  },
  'from-starlings-to-swarms-8d-safety': {
    title: '🕊️ From Starlings to Swarms: 8D Safety for Thousands of Drones',
    excerpt: 'How an 8D state manifold, safety controllers, and evidence-led evaluation can enable resilient drone swarms—without disclosing proprietary algorithms.',
    author: 'Gwylym Owen',
    date: 'January 20, 2025',
    readTime: '14 min read',
    category: 'Case Study',
    content: `
      <h2>Overview</h2>
      <p>This post outlines an <strong>evidence‑led safety architecture</strong> for large agent swarms (1k–15k+) that must operate under faults, variable density, and limited communications. We describe the <em>concepts</em>—state representation, neighborhood topology, runtime safety enforcement, and evaluation—while <strong>deliberately omitting proprietary control laws</strong>. The goal is to show <em>what</em> we validate and <em>how</em> we evidence performance for regulated buyers.</p>

      <h2>8D Agent State</h2>
      <p>Each agent maintains an 8‑dimensional state combining kinematic, health, and link quality features:</p>
      <ul>
        <li>Position (x,y,z) and Velocity (vx,vy,vz)</li>
        <li>Risk/Health (r): composite indicator from sensor sanity, actuator margin, and thermal budget</li>
        <li>Link Quality (q): packet success + latency jitter windowed estimate</li>
      </ul>
      <p>This state enables safety policies that factor <em>how well</em> an agent can respond—not just where it is. Low <code>r</code> or <code>q</code> tightens envelopes and triggers conservative behaviors.</p>

      <h2>Topological Neighborhoods</h2>
      <p>Instead of metric neighbors within a radius, each agent considers the ~7 nearest peers by <em>connectivity</em> and <em>signal quality</em>. This <strong>topological flocking</strong> is more robust under uneven density and avoids pathological clumping. Neighborhoods update at 10–30 Hz with hysteresis to prevent oscillations.</p>

      <h2>Safety‑First Control (CBF + RTA)</h2>
      <p>We enforce constraints with a <strong>Control Barrier Function (CBF)</strong> layer supervised by <strong>Real‑Time Assurance (RTA)</strong>:</p>
      <ul>
        <li><strong>Hard constraints:</strong> minimum separation, geo‑fences, altitude bands, no‑fly volumes</li>
        <li><strong>Fail‑safe actions:</strong> hover, rise, land, or return‑to‑safe based on envelope violations</li>
        <li><strong>Resilient consensus:</strong> filters outliers/unreliable peers before consensus updates</li>
      </ul>
      <p>The RTA monitor computes a forward‑reachable set given current <code>r,q</code> and vetoes nominal actions that would violate safety in finite time.</p>

      <h2>Faults, Adversity, and Evaluation</h2>
      <p>Using NVIDIA Isaac/Omniverse, we run stress suites across:</p>
      <ul>
        <li>Wind gusts, GPS bias, magnetometer drift, IMU bias</li>
        <li>Packet loss/latency, topology churn, intermittent GNSS</li>
        <li>Injected faults: actuator degradation, battery sag, sensor dropouts</li>
      </ul>
      <p>We report <strong>evidence bundles</strong> with signed metrics:</p>
      <ul>
        <li>Safety violations per 100 flight‑hours (hard/soft classes)</li>
        <li>Resilience under <em>k</em> concurrent failures (success bands)</li>
        <li>Connectivity continuity (%) and rejoin latency</li>
        <li>Task efficiency (path stretch, completion rate)</li>
      </ul>

      <h2>Large‑Scale Behavior</h2>
      <p>At 1k–15k agents, we validate that the topological policy preserves <em>cohesion without collapse</em> and bounds local density. We sweep agent insertion/removal, corridor bottlenecks, and mixed‑mission regions (survey vs convoy). KPIs include density deviation, collision‑free hours, and evacuation time under alarm.</p>

      <h2>Edge Deployment & Packaging</h2>
      <p>For field operations we package models and policies for <strong>offline edge</strong> devices with:</p>
      <ul>
        <li>Checksums manifest and SBOM</li>
        <li>Signed policy packs (CBF/RTA parameters)</li>
        <li>Device‑profile guidance (VRAM, thermal envelopes)</li>
      </ul>
      <p>This supports air‑gapped deployments for defence and other sensitive sectors. Evidence bundles ship separately for procurement.</p>

      <h2>Platform Tie‑In</h2>
      <p>All of this is built on AethergenPlatform workflows:</p>
      <ul>
        <li><strong>Schema Designer:</strong> define 8D state schema + health/link sub‑schemas</li>
        <li><strong>Generator:</strong> synthesize agent traces and disturbances at scale</li>
        <li><strong>Benchmarks & Ablation:</strong> compare control variants; export evidence</li>
        <li><strong>Reporting:</strong> compile signed evidence bundles for buyers</li>
      </ul>

      <h2>What We Deliberately Withhold</h2>
      <p>We do <em>not</em> publish proprietary control laws or full policy code. Posts focus on <em>safety envelopes, metrics, and evidence</em> so buyers can evaluate without IP leakage.</p>

      <h2>Next Steps</h2>
      <p>If you need scalable swarms with safety evidence—and edge packages for offline operation—<a href="/contact">contact us</a>. We can tailor evaluation protocols and packaging to your device profiles.</p>
    `
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const [remote, setRemote] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/.netlify/functions/blog-get?slug=${encodeURIComponent(slug || '')}`);
        if (res.ok) setRemote(await res.json());
      } catch {}
      finally { setIsLoading(false); }
    })();
  }, [slug]);
  const post = remote || (blogPostsData as any)[slug as keyof typeof blogPostsData];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center text-slate-600">Loading…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title || 'Auspexi Blog';
  const shareLinks = {
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}`,
    hackernews: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(currentUrl)}&t=${encodeURIComponent(shareTitle)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + currentUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(currentUrl)}`,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center text-sm text-slate-500 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mr-4">
              {post.category}
            </span>
            <User className="h-4 w-4 mr-2" />
            <span className="mr-4">{post.author}</span>
            <Calendar className="h-4 w-4 mr-2" />
            <span className="mr-4">{(post as any).date || ((post as any).published_at ? new Date((post as any).published_at).toDateString() : '')}</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-900">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="prose prose-lg max-w-none text-slate-900">
          <style>{`
            .prose { color: #0f172a !important; }
            .prose h2 { 
              margin-top: 2rem !important; 
              margin-bottom: 1rem !important; 
              font-size: 1.5rem !important; 
              font-weight: 700 !important; 
              color: #0f172a !important;
            }
            .prose p { 
              margin-bottom: 1.5rem !important; 
              line-height: 1.75 !important;
              color: #1e293b !important; /* slate-800 */
            }
            .prose ul, .prose ol { 
              color: #1e293b !important; /* ensure list text is dark */
            }
            .prose li { 
              color: #1e293b !important; 
              margin-bottom: 0.5rem !important;
            }
            .prose ul > li::marker, .prose ol > li::marker {
              color: #64748b !important; /* slate-500 for markers */
            }
            .prose strong { 
              color: #0f172a !important; 
              font-weight: 700 !important;
            }
            .prose a { color: #2563eb !important; }
            .prose a.aeg-btn { color: #ffffff !important; }
          `}</style>
          <div 
            dangerouslySetInnerHTML={{ __html: (post as any).content || (post as any).content_html }} 
            className="space-y-8"
            style={{
              '--tw-prose-body': '#1e293b',
              '--tw-prose-headings': '#0f172a',
              '--tw-prose-links': '#2563eb',
              '--tw-prose-bold': '#0f172a',
              '--tw-prose-counters': '#64748b',
              '--tw-prose-bullets': '#cbd5e1',
              '--tw-prose-hr': '#e2e8f0',
              '--tw-prose-quotes': '#0f172a',
              '--tw-prose-quote-borders': '#e2e8f0',
              '--tw-prose-captions': '#64748b',
              '--tw-prose-code': '#0f172a',
              '--tw-prose-pre-code': '#e2e8f0',
              '--tw-prose-pre-bg': '#1e293b',
              '--tw-prose-th-borders': '#cbd5e1',
              '--tw-prose-td-borders': '#e2e8f0'
            } as React.CSSProperties}
          />
          <div className="mt-8">
            <a href="/pricing" className="aeg-btn inline-block px-4 py-2 bg-blue-600 text-white rounded mr-3">View Pricing →</a>
            <a href="/contact" className="aeg-btn inline-block px-4 py-2 bg-slate-800 text-white rounded">Contact Sales →</a>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 flex flex-wrap gap-2 items-center justify-center">
            <a className="px-3 py-2 rounded bg-blue-600 text-white text-sm" href={shareLinks.linkedin} target="_blank" rel="noreferrer">Share on LinkedIn</a>
            <a className="px-3 py-2 rounded bg-slate-900 text-white text-sm" href={shareLinks.twitter} target="_blank" rel="noreferrer">Share on X</a>
            <a className="px-3 py-2 rounded bg-blue-700 text-white text-sm" href={shareLinks.facebook} target="_blank" rel="noreferrer">Share on Facebook</a>
            <a className="px-3 py-2 rounded bg-orange-600 text-white text-sm" href={shareLinks.reddit} target="_blank" rel="noreferrer">Share on Reddit</a>
            <a className="px-3 py-2 rounded bg-amber-600 text-white text-sm" href={shareLinks.hackernews} target="_blank" rel="noreferrer">Share on HN</a>
            <a className="px-3 py-2 rounded bg-green-600 text-white text-sm" href={shareLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="px-3 py-2 rounded bg-slate-700 text-white text-sm" href={shareLinks.email}>Email</a>
            <button
              onClick={() => { try { navigator.clipboard.writeText(currentUrl); } catch {} }}
              className="px-3 py-2 rounded bg-slate-800 text-white text-sm"
            >Copy Link</button>
          </div>
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;