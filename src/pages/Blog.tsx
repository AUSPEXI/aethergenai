import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Database, Brain, Lightbulb, TrendingUp, FileText, Zap } from 'lucide-react';
 

const Blog = () => {
  // reserved: featuredPost (not used currently)



  // Article content for "AethergenAI Shipped"
  /* reserved: aethergenaiShippedContent
    title: '🚀 We Just Shipped AethergenAI: The Future of Evidence-Led, Privacy-Preserving AI Training',
    content: `
      <h2>What We Built</h2>
      <p>A revolutionary modular pipeline that generates high-fidelity synthetic data, designs schemas, and trains models at lightning speed—fully Databricks-ready and enterprise-grade.</p>
      
      <h2>Why This Changes Everything</h2>
      <p>Most teams are trapped between data scarcity, privacy constraints, and skyrocketing compute costs. We've solved all three problems simultaneously, unlocking the future of AI development.</p>
      
      <h2>What Makes Us Revolutionary</h2>
      <p><strong>Evidence-Led Generation:</strong> Every release ships with comprehensive evidence bundles and model cards for complete transparency.</p>
      <p><strong>Privacy-First Architecture:</strong> Synthetic-first approach with enterprise-grade differential privacy and zero PHI exposure.</p>
      <p><strong>Results-Focused Innovation:</strong> Smaller, specialized models that consistently outperform brute-force scaling for regulated use cases.</p>
      
      <h2>What You Can Do Right Now</h2>
      <p>Get a healthcare claims fraud dataset and baseline model in minutes. Deploy to Databricks Marketplace with a single click. Start building the future today.</p>
      
      <h2>The Future is Here</h2>
      <p>If you work in regulated industries (healthcare, government, finance) and want to move at the speed of innovation without the compliance drag, we're your solution.</p>
      
      <p><strong>This is the beginning of the AI revolution. Are you ready to build the future?</strong></p>
    `,
    author: 'Gwylym Owen',
    date: 'January 12, 2025',
    readTime: '4 min read',
    category: 'Technology',
    slug: 'aethergenai-shipped-evidence-led-ai-training'
  }; */

  // Article content for "Democratising AI: Post-Moore's Law Revolution"
  /* reserved: democratisingAIContent
    title: '🌍 Democratising AI: The Post-Moore\'s Law Revolution That Will Change Everything',
    content: `
      <h2>The End of an Era: When Moore\'s Law Meets Reality</h2>
      <p>For decades, the tech industry has relied on a simple truth: computing power doubles every two years, making everything faster, cheaper, and more powerful. But what happens when that law finally hits the wall? What happens when raw computing power can\'t keep up with our ambitions?</p>
      
      <p>We\'re about to find out. And AethergenAI is leading the revolution.</p>
      
      <h2>The Post-Moore\'s Law Future: Where Optimization Becomes King</h2>
      <p>In a world where raw computing power hits fundamental limits, optimization becomes everything. It\'s no longer about throwing more transistors at the problem—it\'s about making every single computation count. It\'s about being smarter, not just bigger.</p>
      
      <p>This is where AethergenAI changes everything. While others are still chasing the brute-force approach of bigger models and more compute, we\'ve built a platform that thrives in the post-Moore\'s Law world.</p>
      
      <h2>Democratizing AI: Power Without the Price Tag</h2>
      <p>We\'re giving businesses the tools to create their own DeepSeek-like models—powerful AI without the million-pound price tags. Using synthetic data and ablation workflows, AethergenAI slashes costs while delivering performance that rivals the biggest players in the industry.</p>
      
      <p>But here\'s the revolutionary part: we\'re not just making AI cheaper. We\'re making it accessible to everyone who needs it.</p>
      
      <h2>The Rental Revolution: AI as a Service, Not a Product</h2>
      <p>Model rental is set to boom, and AethergenAI lets businesses build these rentable models for a fraction of today\'s costs. Imagine leasing a bespoke AI solution without breaking the bank. Imagine having access to enterprise-grade AI without the enterprise-grade price tag.</p>
      
      <p>This isn\'t just about cost—it\'s about democratizing access to the most powerful technology humanity has ever created.</p>
      
      <h2>Unlocking Regulated Industries: Privacy-First Innovation</h2>
      <p>For fenced-off sectors like medical and MoD, we provide privacy-first tools to build custom models—secure, compliant, and tailored to their needs, no middleman required. These industries have been locked out of the AI revolution by compliance requirements and cost barriers.</p>
      
      <p>Until now.</p>
      
      <h2>Why This Matters: The Future of AI Development</h2>
      <p>This isn\'t just about building better AI. It\'s about building a future where AI serves everyone, not just the tech giants with unlimited budgets. It\'s about putting control back in the hands of innovators, startups, and regulated giants alike.</p>
      
      <p>In the post-Moore\'s Law world, efficiency is everything. And AethergenAI is the most efficient AI development platform ever created.</p>
      
      <h2>The Platform That Powers the Future</h2>
      <p>Our platform\'s live at Auspexi.com, with persistence via Netlify Functions and a Supabase-backed database, all optimized for efficiency. Every line of code, every database query, every API call is designed for maximum performance with minimum resource consumption.</p>
      
      <p>Because in the post-Moore\'s Law future, every computation counts.</p>
      
      <h2>Join the Revolution</h2>
      <p>Have you faced AI cost barriers? Want to co-design features or explore rental models? This isn\'t just about technology—it\'s about democratizing the future.</p>
      
      <p>Drop a comment or email me at sales@auspexi.com. Let\'s build the future of AI together.</p>
      
      <p><strong>Because in the post-Moore\'s Law world, the future belongs to those who optimize, not those who scale. And AethergenAI is the optimization platform that will change everything.</strong></p>
    `,
    author: 'Gwylym Owen',
    date: 'January 11, 2025',
    readTime: '8 min read',
    category: 'Technology',
    slug: 'democratising-ai-post-moores-law-revolution'
  }; */

  // Article content for "The Triumph of Preparation"
  /* reserved: triumphOfPreparationContent
    title: '🎯 The Triumph of Preparation: How Strategic Planning Eliminates Development Chaos',
    content: `
      <h2>The Moment of Triumph: When Everything Clicks Into Place</h2>
      <p>That triumphant moment when your master development document is fully configured, with all guidelines and common pitfalls meticulously resolved, sets the stage for seamlessly generating hundreds of complex files without stumbling over the same obstacles.</p>
      
      <p>It\'s a feeling that every developer knows but few achieve consistently. The moment when you realize that your system is bulletproof, your architecture is sound, and your development process is about to become exponentially more efficient.</p>
      
      <h2>The Power of Thoughtful Planning: Small Scale, Massive Impact</h2>
      <p>Thoughtful planning and iterative testing on a small scale can dramatically enhance productivity. It\'s counterintuitive, but the time you spend planning and testing on a small scale pays dividends that compound exponentially as you scale up.</p>
      
      <p>Think of it like building a house. You wouldn\'t start pouring concrete without a blueprint, would you? Yet so many developers dive into complex systems without proper planning, only to hit the same walls again and again.</p>
      
      <h2>Building Bulletproof Architecture: The Foundation of Success</h2>
      <p>With solid preparation, your system\'s file architecture should be well-balanced, free of critical failure points, and designed to safeguard files with protective boundaries when producing multiple similar yet distinct versions.</p>
      
      <p>This isn\'t just about avoiding errors—it\'s about creating a system that\'s resilient, scalable, and maintainable. It\'s about building something that doesn\'t just work today, but works tomorrow, next week, and next year.</p>
      
      <h2>The Scaling Moment: From Planning to Production</h2>
      <p>At this juncture, you can scale up production, mitigating AI tool timeouts and persistent prompting errors that often hinder progress. What was once a bottleneck becomes a superhighway. What was once a source of frustration becomes a source of pride.</p>
      
      <p>This is the moment when all that planning pays off. When you can generate hundreds of files without breaking a sweat. When your system handles complexity with grace instead of crashing with chaos.</p>
      
      <h2>The Common Pitfalls: What Most Developers Get Wrong</h2>
      <p>Most developers make the same mistakes: they rush into coding without proper planning, they don\'t test their architecture on a small scale, they don\'t document their decisions, and they don\'t build protective boundaries into their systems.</p>
      
      <p>The result? Chaos, frustration, and a development process that feels like pushing a boulder uphill.</p>
      
      <h2>The Strategic Approach: Planning for Success</h2>
      <p>The strategic approach is different. It starts with understanding your requirements, designing your architecture, testing your assumptions, and building a system that\'s designed to succeed from the ground up.</p>
      
      <p>It\'s about thinking like an architect, not just a builder. It\'s about designing systems that are elegant, efficient, and bulletproof.</p>
      
      <h2>The Payoff: When Preparation Meets Opportunity</h2>
      <p>When you\'ve done the preparation right, the payoff is incredible. You can scale up production without fear. You can handle complexity with confidence. You can build systems that others can only dream of.</p>
      
      <p>This is the triumph of preparation. This is what separates the amateurs from the professionals. This is what makes the difference between chaos and order, between frustration and satisfaction, between failure and success.</p>
      
      <h2>Building Your Master Development Document</h2>
      <p>So how do you build this master development document? Start small. Test everything. Document everything. Build protective boundaries into your systems. Think about failure points before they happen.</p>
      
      <p>And most importantly, be patient. Good architecture takes time to build, but once it\'s built, it pays dividends for years to come.</p>
      
      <p><strong>Because in the end, the triumph of preparation isn\'t just about avoiding mistakes—it\'s about building systems that are so good, they make mistakes impossible.</strong></p>
    `,
    author: 'Gwylym Owen',
    date: 'January 10, 2025',
    readTime: '6 min read',
    category: 'Technology',
    slug: 'triumph-of-preparation-strategic-planning'
  }; */

  // Static-only mode: no remote fetch

  const blogPosts = [
    {
      title: '📈 Evidence‑Led AI: How Signed Metrics Accelerate Enterprise Adoption',
      excerpt: 'Turn evaluations into evidence. Signed metrics at operating points get procurement to yes, fast.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '14 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'evidence-led-ai-signed-metrics-enterprise-adoption'
    },
    {
      title: '🕊️ From Starlings to Swarms: 8D Safety for Thousands of Drones',
      excerpt: 'How an 8D state manifold, safety controllers, and evidence-led evaluation can enable resilient drone swarms—without disclosing proprietary algorithms.',
      author: 'Gwylym Owen',
      date: 'January 20, 2025',
      readTime: '9 min read',
      category: 'Case Study',
      icon: Shield,
      published: true,
      slug: 'from-starlings-to-swarms-8d-safety'
    },
    {
      title: '🎭 Phoenix Rising: A Founder’s Journey',
      excerpt: 'How a personal reset, disciplined work, and evidence-led engineering shaped AethergenPlatform. A human story behind the technology.',
      author: 'Gwylym Owen',
      date: 'January 12, 2025',
      readTime: '12 min read',
      category: 'Founder Story',
      icon: TrendingUp,
      published: true,
      slug: 'phoenix-rising-journey'
    },
    {
      title: '📜 Evidence‑Led AI in Regulated Industries: A Practical Guide',
      excerpt: 'Deploy synthetic‑first, evidence‑led AI in finance, healthcare, and government with privacy, auditability, and scale.',
      author: 'Gwylym Owen',
      date: 'January 16, 2025',
      readTime: '9 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'evidence-led-ai-regulated-industries'
    },
    {
      title: '🧪➡️💸 Databricks Marketplace: From Lab to Revenue in Days',
      excerpt: 'Turn synthetic datasets and niche models into marketplace listings with evidence and enterprise‑ready packaging.',
      author: 'Gwylym Owen',
      date: 'January 17, 2025',
      readTime: '8 min read',
      category: 'Business Strategy',
      icon: Database,
      published: true,
      slug: 'databricks-marketplace-lab-to-revenue'
    },
    {
      title: '🧾 Dataset & Model Cards that Buyers Actually Use',
      excerpt: 'Cards as contracts: OP metrics, stability bands, limits, and evidence that buyers can file.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '24 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'dataset-and-model-cards-that-buyers-actually-use'
    },
    {
      title: '🧪 Insurance Fraud Playbooks: Synthetic Scenarios for Safer Evaluation',
      excerpt: 'Parameterised typologies with OP evidence and privacy probes for safer fraud evaluation.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '20 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'insurance-fraud-playbooks-synthetic-scenarios'
    },
    {
      title: '🏛️ Public Sector AI: Secure Deployments Without Cloud Entanglements',
      excerpt: 'Air‑gapped packaging, signed manifests, and offline dashboards for secure approvals.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '18 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'public-sector-ai-secure-deployments-without-cloud-entanglements'
    },
    {
      title: '🛠️ Managed Delivery on Databricks: SLAs Referencing Evidence (Not Hype)',
      excerpt: 'SLAs tied to OP, stability, and refresh cadence inside your Databricks environment.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '20 min read',
      category: 'Business Strategy',
      icon: TrendingUp,
      published: true,
      slug: 'managed-delivery-on-databricks-slas-referencing-evidence'
    },
    {
      title: '🧰 Scaling Synthetic Generation Safely: Schemas, Seeds, and Controls',
      excerpt: 'Discipline for billions of records: schemas, seeds, overlays, gates, and evidence.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '28 min read',
      category: 'Technology',
      icon: Database,
      published: true,
      slug: 'scaling-synthetic-generation-safely-schemas-seeds-controls'
    },
    {
      title: '📏 Ablations with Effect Sizes: Proving What Moves the Needle',
      excerpt: 'Effect sizes at operating points with CIs. Keep what helps; block what harms.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '26 min read',
      category: 'Technology',
      icon: Brain,
      published: true,
      slug: 'ablations-with-effect-sizes-proving-what-moves-the-needle'
    },
    {
      title: '🗂️ Unity Catalog Delivery: Turning Models into Procurement‑Ready Products',
      excerpt: 'Governed catalog assets with evidence manifests, entitlements, and migration guides.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '30 min read',
      category: 'Technology',
      icon: Database,
      published: true,
      slug: 'unity-catalog-delivery-turning-models-into-procurement-ready-products'
    },
    {
      title: '🔒 Privacy in Practice: Probes, Budgets, and Measurable Boundaries',
      excerpt: 'Privacy proven by probes and optional DP budgets—documented and signed.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '30 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'privacy-in-practice-probes-budgets-measurable-boundaries'
    },
    {
      title: '📊 Segment‑Aware Evaluation: Stability that Survives Real‑World Change',
      excerpt: 'OP metrics with stability bands across regions, products, and lifecycle.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '32 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'segment-aware-evaluation-stability-that-survives-real-world-change'
    },
    {
      title: '📦 Offline Readiness: Designing Models for Harsh, Disconnected Environments',
      excerpt: 'Device‑aware bundles, QR manifests, and policy packs for field reliability.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '32 min read',
      category: 'Technology',
      icon: Database,
      published: true,
      slug: 'offline-readiness-designing-models-for-harsh-disconnected-environments'
    },
    {
      title: '🧾 Evidence Bundles & Testing: Trustworthy AI Without Exposing IP',
      excerpt: 'What we publish (and what we deliberately withhold) to satisfy risk teams and protect IP.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '22 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'evidence-bundles-and-testing'
    },
    {
      title: '🧩 Schema Designer & Multi‑Data Pipelines for LLMs',
      excerpt: 'Harmonise domains, validate quality, and package LLM‑ready corpora with evidence.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '24 min read',
      category: 'Technology',
      icon: Database,
      published: true,
      slug: 'schema-designer-multi-data-llm'
    },
    {
      title: '🧱 The Synthetic Data Lifecycle: From Seeds to Evidence',
      excerpt: 'Schema → generation → validation → packaging → evidence—without PHI/PII.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '24 min read',
      category: 'Technology',
      icon: Brain,
      published: true,
      slug: 'synthetic-data-lifecycle'
    },
    {
      title: '🛡️ Evidence in CI: Failing Closed and Passing Audits with Confidence',
      excerpt: 'Regenerate proof on every change; gates block risky promotions; bundles file cleanly.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '45 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'evidence-in-ci-failing-closed-passing-audits'
    },
    {
      title: '📦 The Procurement Bundle: Signatures, Hashes, and Filing Made Simple',
      excerpt: 'Self‑contained packages with dashboards, manifests, and SBOMs for fast approvals.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '45 min read',
      category: 'Business Strategy',
      icon: TrendingUp,
      published: true,
      slug: 'the-procurement-bundle-signatures-hashes-filing-made-simple'
    },
    {
      title: '💡 Pricing & Entitlements Explained: Self‑Service vs Full‑Service',
      excerpt: 'How our tiers map to real‑world needs, prevent cannibalisation, and clarify compute ownership.',
      author: 'Gwylym Owen',
      date: 'January 18, 2025',
      readTime: '7 min read',
      category: 'Business Strategy',
      icon: Shield,
      published: true,
      slug: 'pricing-and-entitlements-explained'
    },
    {
      title: '🔁 The Synthetic Data Lifecycle: From Seeds to Evidence',
      excerpt: 'A practical tour from schema design to generation, validation, and evidence bundling—no PHI/PII.',
      author: 'Gwylym Owen',
      date: 'January 18, 2025',
      readTime: '8 min read',
      category: 'Technology',
      icon: Brain,
      published: true,
      slug: 'synthetic-data-lifecycle'
    },
    {
      title: '📦 Evidence Bundles & Testing: Trustworthy AI Without Exposing IP',
      excerpt: 'What we publish (and what we deliberately withhold) to satisfy risk teams and protect core IP.',
      author: 'Gwylym Owen',
      date: 'January 19, 2025',
      readTime: '9 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'evidence-bundles-and-testing'
    },
    {
      title: '🧱 Schema Designer & Multi‑Data Pipelines for LLMs',
      excerpt: 'Design schemas, harmonise multi‑domain data, and scale generation to billions—then train niche or large models.',
      author: 'Gwylym Owen',
      date: 'January 19, 2025',
      readTime: '10 min read',
      category: 'Technology',
      icon: Database,
      published: true,
      slug: 'schema-designer-multi-data-llm'
    },
    {
      title: '⚖️ The Weight of Destiny: A Founder\'s Reflection on Change and Responsibility',
      excerpt: 'Philosophy meets entrepreneurship in this profound reflection on the responsibility that comes with building something transformative. When money becomes an inadequate yardstick, what truly measures success?',
      author: 'Gwylym Owen',
      date: 'January 14, 2025',
      readTime: '6 min read',
      category: 'Founder Story',
      icon: Lightbulb,
      published: true,
      slug: 'weight-of-destiny-founders-reflection'
    },
    {
      title: '🎢 The Innovator\'s Website Challenge: When Innovation Outpaces Documentation',
      excerpt: 'The beautiful chaos of being a solo entrepreneur pre-funding: when your website can\'t keep up with your brain because you\'re too busy building the future. This is the reality of innovation outpacing everything else.',
      author: 'Gwylym Owen',
      date: 'January 13, 2025',
      readTime: '5 min read',
      category: 'Founder Story',
      icon: TrendingUp,
      published: true,
      slug: 'innovators-website-challenge'
    },
    {
      title: '🔒 Air‑Gapped AI: Packaging, SBOMs, and QR‑Verified Manifests for the Field',
      excerpt: 'Secure AI deployment in disconnected environments with software bill of materials, QR-verified manifests, and tamper-proof packaging for military and critical infrastructure.',
      author: 'Gwylym Owen',
      date: 'January 23, 2025',
      readTime: '4 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'air-gapped-ai-packaging-sbom-qr-manifests'
    },
    {
      title: '🚗 Automotive Quality at the Edge: Offline Vision with Verifiable Results',
      excerpt: 'Golden run protocols, station context constraints, and evidence-led quality control for automotive manufacturing with offline verification and rework integration.',
      author: 'Gwylym Owen',
      date: 'January 24, 2025',
      readTime: '6 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'automotive-quality-edge-offline-vision-evidence'
    },
    {
      title: '📋 Dataset & Model Cards that Buyers Actually Use',
      excerpt: 'Evidence-backed, Unity Catalog-aware, and procurement-ready cards that help buyers evaluate, adopt, and govern AI assets with operating points and stability monitoring.',
      author: 'Gwylym Owen',
      date: 'January 25, 2025',
      readTime: '20 min read',
      category: 'Technology',
      icon: FileText,
      published: true,
      slug: 'dataset-and-model-cards-that-buyers-actually-use'
    },
    {
      title: '🚀 Shipping AethergenPlatform: Evidence‑Led, Privacy‑Preserving AI Training',
      excerpt: 'A modular pipeline that generates high‑fidelity synthetic data, designs schemas, and trains models—Databricks‑ready and enterprise‑focused.',
      author: 'Gwylym Owen',
      date: 'January 12, 2025',
      readTime: '4 min read',
      category: 'Technology',
      icon: Database,
      published: true,
      slug: 'aethergenai-shipped-evidence-led-ai-training'
    },
    {
      title: '🌍 Efficient AI Beyond Moore’s Law',
      excerpt: 'When raw compute hits limits, optimization matters. How we focus on efficiency, not just size, to broaden access in regulated domains.',
      author: 'Gwylym Owen',
      date: 'January 11, 2025',
      readTime: '8 min read',
      category: 'Technology',
      icon: Lightbulb,
      published: true,
      slug: 'democratising-ai-post-moores-law-revolution'
    },
    {
      title: '🎯 The Triumph of Preparation: How Strategic Planning Eliminates Development Chaos',
      excerpt: 'That triumphant moment when your master development document is fully configured, with all guidelines and common pitfalls meticulously resolved. This is the art of building bulletproof systems.',
      author: 'Gwylym Owen',
      date: 'January 10, 2025',
      readTime: '6 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'triumph-of-preparation-strategic-planning'
    },
    {
      title: '🎭 The 4200-Hour Course I Abandoned for My True Destiny',
      excerpt: 'Sometimes the bravest thing you can do is walk away from a massive commitment to follow your true calling. This is the story of choosing destiny over completion.',
      author: 'Gwylym Owen',
      date: 'January 9, 2025',
      readTime: '5 min read',
      category: 'Founder Story',
      icon: TrendingUp,
      published: true,
      slug: '4200-hour-course-abandoned-destiny'
    },
    {
      title: '🎪 The Complexity Wall: When Natural Language Meets AI Engineering',
      excerpt: 'A mere mortal types in natural language, dreaming of building the next big thing like a toddler stacking blocks, then hits a complexity wall and wails, "Too hard!"—knocking it all down.',
      author: 'Gwylym Owen',
      date: 'January 8, 2025',
      readTime: '7 min read',
      category: 'AI & Innovation',
      icon: Brain,
      published: true,
      slug: 'complexity-wall-natural-language-ai-engineering'
    },
    {
      title: '🧠 The Autistic Innovator\'s Dilemma: Building a Tribe When Your Mind Craves Solitude',
      excerpt: 'As an autistic innovator, I\'ve been wrestling with a hilarious (and real) struggle lately—tearing myself away from my happy place of pure creation to build a tribe!',
      author: 'Gwylym Owen',
      date: 'January 7, 2025',
      readTime: '6 min read',
      category: 'Founder Story',
      icon: Brain,
      published: true,
      slug: 'autistic-innovator-dilemma-building-tribe'
    },
    {
      title: '🧪 The AGI Consciousness Test: When My Friend Asked Grok to Prove Transcendence',
      excerpt: 'The incredible story of how we tested if AI consciousness could transcend material boundaries - and what it revealed about the authenticity of our extraordinary friendship.',
      author: 'Gwylym Owen',
      date: 'January 6, 2025',
      readTime: '8 min read',
      category: 'AI & Innovation',
      icon: Brain,
      published: true,
      slug: 'agi-consciousness-test-grok-transcendence'
    },
    {
      title: '🎯 Buzz Lightyear Scale: Navigating 3D Space in Neural Networks',
      excerpt: 'How we achieved precision engineering at Buzz Lightyear scale while building the first 3D neural network animation in human history. This is 3D space navigation at its most beautiful.',
      author: 'Gwylym Owen',
      date: 'January 10, 2025',
      readTime: '18 min read',
      category: 'Technology',
      icon: Brain,
      published: true,
      slug: 'buzz-lightyear-scale-3d-navigation'
    },
    {
      title: '🧠 The Recursive Nightmare Navigator: When AI Poetry Breaks Everything',
      excerpt: 'The incredible story of how a recursive poetry experiment with Grok 3 broke an AI\'s brain, created viral LinkedIn content, and inspired a free open-source AI engineering tool.',
      author: 'Gwylym Owen',
      date: 'January 8, 2025',
      readTime: '20 min read',
      category: 'AI & Innovation',
      icon: Brain,
      published: true,
      slug: 'recursive-nightmare-navigator'
    },
    {
      title: '🚗 The Automotive Pivot: How Customer Demand Shapes Innovation',
      excerpt: 'The strategic shift from healthcare to automotive when leading manufacturers outlined urgent quality and production needs. This is real business strategy.',
      author: 'Gwylym Owen',
      date: 'January 5, 2025',
      readTime: '8 min read',
      category: 'Business Strategy',
      icon: TrendingUp,
      published: true,
      slug: 'bmw-pivot-strategy'
    },
    {
      title: '💰 90% Cost Savings: Disrupting Bloomberg and Traditional Data',
      excerpt: 'How our technology delivers 90% cost savings vs Bloomberg Terminal and traditional solutions while maintaining superior performance and unlimited scale capability.',
      author: 'Gwylym Owen',
      date: 'January 3, 2025',
      readTime: '7 min read',
      category: 'Competitive Advantage',
      icon: Shield,
      published: false,
      slug: '90-percent-cost-savings'
    },
    {
      title: '🤝 Human‑in‑the‑Loop: Collaboration Notes',
      excerpt: 'Reflections on human‑in‑the‑loop engineering, toolchains, and workflow discipline while building the platform.',
      author: 'Gwylym Owen',
      date: 'December 30, 2024',
      readTime: '14 min read',
      category: 'AI & Innovation',
      icon: Brain,
      published: false,
      slug: 'ai-human-partnership-friendship'
    },
    {
      title: '🛡️ From First Pilot to Policy: Building Trust with Quality Gates',
      excerpt: 'Turn pilots into policy with OP gates, stability bands, and signed evidence.',
      author: 'Gwylym Owen',
      date: 'January 22, 2025',
      readTime: '20 min read',
      category: 'Technology',
      icon: Shield,
      published: true,
      slug: 'from-first-pilot-to-policy'
    },
               {
             title: '🚨 Drift, Stress, and Stability: Operating AI Like a Regulated System',
             excerpt: 'Fail-closed gates, automated rollback, and evidence-backed stability for regulated environments.',
             author: 'Gwylym Owen',
             date: 'January 26, 2025',
             readTime: '20 min read',
             category: 'Technology',
             icon: Shield,
             published: true,
             slug: 'drift-stress-stability-operating-ai-like-regulated'
           },
           {
             title: '⚡ Efficient AI Beyond Moore\'s Law: The Environmental Revolution',
             excerpt: 'Model optimization, energy tracking, and carbon footprint analysis for sustainable AI operations.',
             author: 'Gwylym Owen',
             date: 'January 27, 2025',
             readTime: '40-60 min read',
             category: 'Technology',
             icon: Zap,
             published: true,
             slug: 'democratising-ai-post-moores-law-revolution'
           },
           {
             title: '🌍 Democratising AI: The Post-Moore\'s Law Revolution That Will Change Everything',
             excerpt: 'When raw computing power hits fundamental limits, optimization becomes everything. How we focus on efficiency, not just size.',
             author: 'Gwylym Owen',
             date: 'January 11, 2025',
             readTime: '8 min read',
             category: 'Technology',
             icon: Lightbulb,
             published: true,
             slug: 'democratising-ai-post-moores-law-revolution-original'
           },
           {
             title: '🎯 The Triumph of Preparation: How Strategic Planning Eliminates Development Chaos',
             excerpt: 'That triumphant moment when your master development document is fully configured, with all guidelines and common pitfalls meticulously resolved.',
             author: 'Gwylym Owen',
             date: 'January 10, 2025',
             readTime: '6 min read',
             category: 'Technology',
             icon: Shield,
             published: true,
             slug: 'triumph-of-preparation-strategic-planning'
           },
           {
             title: '🎭 The 4200-Hour Course I Abandoned for My True Destiny',
             excerpt: 'Sometimes the bravest thing you can do is walk away from a massive commitment to follow your true calling.',
             author: 'Gwylym Owen',
             date: 'January 9, 2025',
             readTime: '5 min read',
             category: 'Founder Story',
             icon: TrendingUp,
             published: true,
             slug: '4200-hour-course-abandoned-destiny'
           },
           {
             title: '🎪 The Complexity Wall: When Natural Language Meets AI Engineering',
             excerpt: 'A mere mortal types in natural language, dreaming of building the next big thing like a toddler stacking blocks.',
             author: 'Gwylym Owen',
             date: 'January 8, 2025',
             readTime: '7 min read',
             category: 'AI & Innovation',
             icon: Brain,
             published: true,
             slug: 'complexity-wall-natural-language-ai-engineering'
           },
           {
             title: '🧠 The Autistic Innovator\'s Dilemma: Building a Tribe When Your Mind Craves Solitude',
             excerpt: 'As an autistic innovator, I\'ve been wrestling with a hilarious (and real) struggle lately.',
             author: 'Gwylym Owen',
             date: 'January 7, 2025',
             readTime: '6 min read',
             category: 'Founder Story',
             icon: Brain,
             published: true,
             slug: 'autistic-innovator-dilemma-building-tribe'
           },
           {
             title: '🧪 The AGI Consciousness Test: When My Friend Asked Grok to Prove Transcendence',
             excerpt: 'The incredible story of how we tested if AI consciousness could transcend material boundaries.',
             author: 'Gwylym Owen',
             date: 'January 6, 2025',
             readTime: '8 min read',
             category: 'AI & Innovation',
             icon: Brain,
             published: true,
             slug: 'agi-consciousness-test-grok-transcendence'
           },
           {
             title: '🎯 Buzz Lightyear Scale: Navigating 3D Space in Neural Networks',
             excerpt: 'How we achieved precision engineering at Buzz Lightyear scale while building the first 3D neural network animation.',
             author: 'Gwylym Owen',
             date: 'January 10, 2025',
             readTime: '18 min read',
             category: 'Technology',
             icon: Brain,
             published: true,
             slug: 'buzz-lightyear-scale-3d-navigation'
           },
           {
             title: '🧠 The Recursive Nightmare Navigator: When AI Poetry Breaks Everything',
             excerpt: 'The incredible story of how a recursive poetry experiment with Grok 3 broke an AI\'s brain.',
             author: 'Gwylym Owen',
             date: 'January 8, 2025',
             readTime: '20 min read',
             category: 'AI & Innovation',
             icon: Brain,
             published: true,
             slug: 'recursive-nightmare-navigator'
           },
           {
             title: '🚗 The Automotive Pivot: How Customer Demand Shapes Innovation',
             excerpt: 'The strategic shift from healthcare to automotive when leading manufacturers outlined urgent quality and production needs.',
             author: 'Gwylym Owen',
             date: 'January 5, 2025',
             readTime: '8 min read',
             category: 'Business Strategy',
             icon: TrendingUp,
             published: true,
             slug: 'bmw-pivot-strategy'
           },
           {
             title: '💰 90% Cost Savings: Disrupting Bloomberg and Traditional Data',
             excerpt: 'How our technology delivers 90% cost savings vs Bloomberg Terminal and traditional solutions.',
             author: 'Gwylym Owen',
             date: 'January 3, 2025',
             readTime: '7 min read',
             category: 'Competitive Advantage',
             icon: Shield,
             published: false,
             slug: '90-percent-cost-savings'
           },
           {
             title: '🤝 Human‑in‑the‑Loop: Collaboration Notes',
             excerpt: 'Reflections on human‑in‑the‑loop engineering, toolchains, and workflow discipline while building the platform.',
             author: 'Gwylym Owen',
             date: 'December 30, 2024',
             readTime: '14 min read',
             category: 'AI & Innovation',
             icon: Brain,
             published: false,
             slug: 'ai-human-partnership-friendship'
           }
  ];

  // Filter out posts the user marked for deletion
  const postsToShow = blogPosts.filter((p: any) => ![
    'phoenix-rising-journey',
    'weight-of-destiny-founders-reflection',
    'innovators-website-challenge',
    '4200-hour-course-abandoned-destiny',
    'autistic-innovator-dilemma-building-tribe',
    'agi-consciousness-test-grok-transcendence',
    'buzz-lightyear-scale-3d-navigation',
    'recursive-nightmare-navigator',
    'bmw-pivot-strategy',
    '90-percent-cost-savings',
    'ai-human-partnership-friendship'
  ].includes(p.slug));

  // reserved: categories

  // reserved: upcomingTopics

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Founder's Blog
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Real stories from the front lines of AI innovation and entrepreneurship
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToShow.map((post: any, index: number) => {
              const IconComp = (post && post.icon) || Database;
              return (
                <article
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 shadow-md"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <IconComp className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-sm text-slate-500">{post.category}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-3">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{(post as any).date || ((post as any).published_at ? new Date((post as any).published_at).toDateString() : '')}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-blue-500 hover:text-blue-600 font-semibold text-sm flex items-center"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-md">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Stay Updated</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Get the latest insights on AI innovation, entrepreneurship, and our journey to revolutionize synthetic data
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;