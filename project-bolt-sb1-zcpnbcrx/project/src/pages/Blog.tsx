import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Shield, Database, Brain, Lock, Lightbulb, TrendingUp } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    title: 'The Missing Fraction: How Ancient Wisdom Guides Modern Data Science',
    excerpt: 'Exploring the connection between the Eye of Horus and synthetic data generation, where the missing 1/64th fraction represents the divine spark that transforms raw data into meaningful insights while preserving privacy.',
    author: 'Gwylym Owen',
    date: 'January 15, 2025',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Philosophy & Innovation',
    slug: 'missing-fraction-ancient-wisdom'
  };

  const blogPosts = [
    {
      title: 'Privacy-First AI: The Technical Architecture Behind Auspexi',
      excerpt: 'A deep dive into the differential privacy algorithms, homomorphic encryption, and zero-knowledge proof systems that power our synthetic data generation while ensuring absolute privacy protection.',
      author: 'Gwylym Owen',
      date: 'January 12, 2025',
      readTime: '8 min read',
      category: 'Technology',
      icon: Lock,
      published: true,
      slug: 'privacy-first-ai-architecture'
    },
    {
      title: 'CHANGES in Action: Revolutionizing Healthcare Research',
      excerpt: 'How our healthcare data suite enabled a major hospital system to conduct privacy-compliant epidemiological research, accelerating medical discoveries while protecting patient data.',
      author: 'Gwylym Owen',
      date: 'January 10, 2025',
      readTime: '6 min read',
      category: 'Healthcare',
      icon: Database,
      published: true,
      slug: 'changes-healthcare-revolution'
    },
    {
      title: 'The Ethics of Synthetic Data: Balancing Innovation and Responsibility',
      excerpt: 'Examining the ethical considerations in synthetic data generation and how Auspexi ensures responsible AI practices across all data suites while driving meaningful innovation.',
      author: 'Gwylym Owen',
      date: 'January 8, 2025',
      readTime: '9 min read',
      category: 'Ethics & AI',
      icon: Brain,
      published: false,
      slug: 'ethics-synthetic-data'
    },
    {
      title: 'From Ancient Auspices to Digital Diviners: The Evolution of Pattern Recognition',
      excerpt: 'Tracing the historical connection between ancient Roman bird-watching priests and modern AI algorithms, exploring how pattern recognition has evolved from mysticism to mathematics.',
      author: 'Gwylym Owen',
      date: 'January 5, 2025',
      readTime: '7 min read',
      category: 'Philosophy & Innovation',
      icon: Lightbulb,
      published: false,
      slug: 'ancient-auspices-digital-diviners'
    },
    {
      title: 'Cross-Industry Synthetic Data: The INSURE Advantage',
      excerpt: 'How synthetic data from multiple industries creates unprecedented insurance risk modeling capabilities while maintaining data sovereignty and privacy across all sectors.',
      author: 'Gwylym Owen',
      date: 'January 3, 2025',
      readTime: '5 min read',
      category: 'Insurance',
      icon: TrendingUp,
      published: false,
      slug: 'cross-industry-insure-advantage'
    },
    {
      title: 'Building Trust in AI: Transparency Without Compromise',
      excerpt: 'Exploring how synthetic data enables AI transparency and explainability while maintaining the privacy and security that modern organizations require.',
      author: 'Gwylym Owen',
      date: 'December 30, 2024',
      readTime: '6 min read',
      category: 'AI Transparency',
      icon: Shield,
      published: false,
      slug: 'building-trust-ai-transparency'
    }
  ];

  const categories = [
    'All Posts',
    'Philosophy & Innovation',
    'Technology',
    'Healthcare',
    'Ethics & AI',
    'Insurance',
    'AI Transparency'
  ];

  const upcomingTopics = [
    {
      title: 'Real-Time Synthetic Data Generation',
      description: 'Technical deep-dive into our streaming data processing pipelines',
      category: 'Technology'
    },
    {
      title: 'The Future of Emergency Services',
      description: 'How SIREN and HYDRA are transforming emergency response',
      category: 'Public Safety'
    },
    {
      title: 'Synthetic Data in Education',
      description: 'Preparing for our upcoming educational behavior datasets',
      category: 'Future Industries'
    },
    {
      title: 'Global Privacy Regulations',
      description: 'Navigating GDPR, HIPAA, and emerging privacy laws',
      category: 'Compliance'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Insights & Innovation
          </h1>
          <p className="text-xl text-blue-100">
            Exploring the future of synthetic data, AI ethics, and privacy-preserving 
            technologies across critical industries
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <div className="text-sm text-blue-600 font-medium mb-3">
                  Featured Post • {featuredPost.category}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-sm text-slate-500 mb-6">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="mr-4">{featuredPost.date}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="lg:h-full">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <post.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-3">{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  {post.published ? (
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center text-slate-400 font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Upcoming Topics
            </h2>
            <p className="text-xl text-slate-600">
              What we're exploring next in synthetic data and AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingTopics.map((topic, index) => (
              <div key={index} className="p-6 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {topic.category}
                  </span>
                </div>
                <p className="text-slate-600">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest insights on synthetic data, AI innovation, and privacy-preserving technologies
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-100 mt-3">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;