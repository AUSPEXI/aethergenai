import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Database, Brain, Lightbulb, TrendingUp } from 'lucide-react';
import React from 'react';

const Blog = () => {
  // reserved: featuredPost (not used currently)

  const [remotePosts, setRemotePosts] = React.useState<any[] | null>(null);
  const [libraryPosts, setLibraryPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/.netlify/functions/blog-list');
        if (res.ok) setRemotePosts(await res.json());
      } catch {}
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const mres = await fetch('/blog-library/manifest.json');
        if (!mres.ok) return;
        const js = await mres.json();
        const posts = Array.isArray(js) ? js : (js.posts || []);
        const mapped = posts.map((p: any) => ({
          title: p.title,
          excerpt: p.summary || '',
          author: 'Auspexi',
          readTime: '',
          category: 'Library',
          icon: Database,
          slug: p.slug,
          date: ''
        }));
        setLibraryPosts(mapped);
      } catch {}
    })();
  }, []);

  const blogPosts = [
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
    }
  ];

  // Merge sources: ALWAYS include local seeds + remote (Supabase) + library; dedupe by slug
  const merged = React.useMemo(() => {
    const all = [...blogPosts, ...(remotePosts || []), ...libraryPosts];
    const bySlug = new Map<string, any>();
    for (const p of all) {
      if (p && p.slug) {
        if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
      }
    }
    return Array.from(bySlug.values());
  }, [remotePosts, libraryPosts]);

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
            {merged.map((post, index) => {
              const Icon = (post as any).icon || Database;
              const category = (post as any).category || 'Blog';
              const author = (post as any).author || 'Auspexi';
              const readTime = (post as any).readTime || '';
              const dateText = (post as any).date || ((post as any).published_at ? new Date((post as any).published_at).toDateString() : '');
              return (
                <article
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 shadow-md"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Icon className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-sm text-slate-500">{category}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-3">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {(post as any).excerpt || ''}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span>{author}</span>
                      <span>{readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{dateText}</span>
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