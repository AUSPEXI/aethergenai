import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

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
    readTime: '9 min read',
    category: 'Technology',
    content: `
      <h2>Why Evidence Matters More Than Ever</h2>
      <p>In regulated environments—finance, healthcare, government, critical services—innovation only sticks when it stands on evidence.</p>
      <h2>Proof Over Promises</h2>
      <p>Every dataset and model can ship with an evidence bundle: lineage, metrics, ablation traces, and model cards.</p>
    `
  },
  'databricks-marketplace-lab-to-revenue': {
    title: '🧪➡️💸 Databricks Marketplace: From Lab to Revenue in Days',
    excerpt: 'Turn synthetic datasets and niche models into marketplace listings with bundled evidence and enterprise‑ready packaging.',
    author: 'Gwylym Owen',
    date: 'January 17, 2025',
    readTime: '8 min read',
    category: 'Business Strategy',
    content: `
      <h2>Why Marketplace First?</h2>
      <p>Data and model marketplaces compress distribution cycles for buyers and sellers.</p>
    `
  },
  'pricing-and-entitlements-explained': {
    title: '💡 Pricing & Entitlements Explained: Self‑Service vs Full‑Service',
    excerpt: 'How our tiers map to real‑world needs, prevent cannibalisation, and clarify who runs compute.',
    author: 'Gwylym Owen',
    date: 'January 18, 2025',
    readTime: '7 min read',
    category: 'Business Strategy',
    content: `
      <h2>Two Clear Paths</h2>
      <p>Self‑Service: you run compute. Full‑Service: we run and manage in your cloud.</p>
    `
  },
  'synthetic-data-lifecycle': {
    title: '🔁 The Synthetic Data Lifecycle: From Seeds to Evidence',
    excerpt: 'A practical tour of how synthetic data flows through design, generation, validation, and evidence bundling—without exposing PHI/PII.',
    author: 'Gwylym Owen',
    date: 'January 18, 2025',
    readTime: '8 min read',
    category: 'Technology',
    content: `
      <h2>Design → Generate → Validate → Evidence → Ship</h2>
      <p>Evidence‑led from the start. No PHI/PII.</p>
    `
  },
  'evidence-bundles-and-testing': {
    title: '📦 Evidence Bundles & Testing: Trustworthy AI Without Exposing IP',
    excerpt: 'What we publish (and what we deliberately withhold). Evidence that convinces risk teams while protecting core IP.',
    author: 'Gwylym Owen',
    date: 'January 19, 2025',
    readTime: '9 min read',
    category: 'Technology',
    content: `
      <h2>Evidence That Stands Up</h2>
      <p>Lineage, metrics, ablations, and model cards—without exposing trade secrets.</p>
    `
  },
  'schema-designer-multi-data-llm': {
    title: '🧱 Schema Designer & Multi‑Data Pipelines for LLMs',
    excerpt: 'Design schemas, harmonise multi‑domain data, and scale synthetic generation to billions—then train niche or large models.',
    author: 'Gwylym Owen',
    date: 'January 19, 2025',
    readTime: '10 min read',
    category: 'Technology',
    content: `
      <h2>From Schema to Scale</h2>
      <p>Harmonise domains and scale generation; train niche or larger models with clear entitlements.</p>
    `
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPostsData[slug];

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
            <span className="mr-4">{post.date}</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <style>{`
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
              color: #1e293b !important;
            }
            .prose strong { 
              color: #0f172a !important; 
              font-weight: 700 !important;
            }
          `}</style>
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
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
            }}
          />
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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