import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Activity, Target, Flame, Siren, RotateCcw, FileText, Lock, Database, Zap, Globe, CheckCircle, TrendingUp, Users, Brain, ExternalLink, Code, BarChart3, Award, Star, Eye, Sparkles, Cpu, Rocket, Package, Car } from 'lucide-react';
import ReactLazy, { Suspense } from 'react';
const AethergenHero = React.lazy(() => import('../components/UI/AethergenHero'));

const Home = () => {
  const currentSuites = {
    healthcare: [
      { name: 'FRAUD DETECTION', description: 'Advanced healthcare fraud detection and prevention', icon: Shield, color: 'text-red-500' },
      { name: 'QUALITY ASSURANCE', description: 'Healthcare data quality and compliance assurance', icon: CheckCircle, color: 'text-green-500' },
      { name: 'PREDICTIVE CARE', description: 'AI-driven predictive healthcare analytics', icon: Brain, color: 'text-blue-500' },
      { name: 'PATIENT SAFETY', description: 'Patient safety and risk assessment systems', icon: Target, color: 'text-purple-500' }
    ],
    automotive: [
      { name: 'QUALITY MANAGEMENT', description: 'Automotive manufacturing quality control', icon: Target, color: 'text-blue-600' },
      { name: 'SUPPLY CHAIN', description: 'Supply chain optimization and risk management', icon: TrendingUp, color: 'text-green-600' },
      { name: 'SAFETY SYSTEMS', description: 'Advanced automotive safety and testing', icon: Shield, color: 'text-red-600' },
      { name: 'PERFORMANCE', description: 'Performance optimization and efficiency', icon: Zap, color: 'text-orange-600' }
    ]
  };

  const capabilities = [
    {
      title: 'High‑Scale Generation',
      description: 'Billion‑row synthetic data demonstration with validated quality metrics',
      icon: Award,
      stat: '1B+',
      statLabel: 'Records Generated'
    },
    {
      title: '11 Proprietary Inventions',
      description: 'Platform inventions including Elastic Collision Newton\'s Cradle and Radioactive Decay Universe Model',
      icon: Rocket,
      stat: '11',
      statLabel: 'Inventions'
    },
    {
      title: 'Global Leadership',
      description: 'Among the leading synthetic data platforms with revolutionary scale, quality, and innovation capabilities - scientifically validated',
      icon: Globe,
      stat: 'Evidence',
      statLabel: 'Quality Compliance'
    },
    {
      title: 'Innovation Pipeline',
      description: 'Ongoing R&D to extend scale, robustness, and usability',
      icon: Sparkles,
      stat: '∞',
      statLabel: 'Future Potential'
    }
  ];

  const metrics = [
    { value: '1B+', label: 'Records Generated', icon: Database },
    { value: '11', label: 'Proprietary Inventions', icon: Rocket },
    { value: '100%', label: 'Quality Compliance', icon: CheckCircle },
    { value: '50K+', label: 'Records/Second', icon: Zap }
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section with Neural Network Animation */}
      <Suspense fallback={<div className="w-full h-[70vh] md:h-[78vh] min-h-[400px] md:min-h-[520px] bg-[#0b1120] flex items-center justify-center text-white">Loading…</div>}>
        <AethergenHero />
      </Suspense>
      {/* IP-Safe Summary */}
      <section className="py-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 text-sm">
            The metrics below reflect verified results. Proprietary algorithms and implementation details are intentionally omitted; public evidence is available via Resources.
          </div>
        </div>
      </section>
      
      {/* Key Metrics Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Revolutionise Your AI Operations
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              The only platform built for regulated AI operations with fail-closed gates, automated rollback, and evidence-backed stability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/stability-demo"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <Shield className="w-5 h-5 mr-2" />
                See Stability Demo
              </Link>
              <Link
                to="/context-engineering"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
              >
                <Brain className="w-5 h-5 mr-2" />
                Context Engineering
              </Link>
              <Link
                to="/air-gapped-demo"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center"
              >
                <Package className="w-5 h-5 mr-2" />
                Air-Gapped Demo
              </Link>
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fail-Closed by Design</h3>
              <p className="text-gray-600">
                Every model promotion blocked until SLO gates pass with confidence intervals. No surprises, no incidents.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Shadow Evaluation</h3>
              <p className="text-gray-600">
                Test candidate models in parallel with live traffic before promotion. Zero-risk model deployment.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Evidence in CI</h3>
              <p className="text-gray-600">
                Every change regenerates signed evidence bundles. Complete audit trail for regulated environments.
              </p>
            </div>
          </div>

          {/* Operational Features Grid */}
          <div className="bg-white rounded-xl p-8 shadow-md mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Operational AI Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">SLO Management</h3>
                  <p className="text-sm text-gray-600">Utility, stability, latency, and privacy SLOs with automated breach detection</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Drift Monitoring</h3>
                  <p className="text-sm text-gray-600">PSI/KS metrics with time-window analysis and segment tracking</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Privacy Probes</h3>
                  <p className="text-sm text-gray-600">Membership inference and attribute disclosure monitoring</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Automated Rollback</h3>
                  <p className="text-sm text-gray-600">Breach of SLO → revert to last good artifact with evidence logged</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Air-Gapped Packaging</h3>
                  <p className="text-sm text-gray-600">Secure edge bundles with manifests, QR codes, and field verification</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dataset & Model Cards</h3>
                  <p className="text-sm text-gray-600">Comprehensive documentation that buyers actually use</p>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Designed for Regulated Industries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Healthcare</h3>
                <p className="text-gray-600">
                  HIPAA-compliant AI operations with privacy probes and evidence-backed model cards
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Services</h3>
                <p className="text-gray-600">
                  Model risk management with fail-closed gates and automated rollback capabilities
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Automotive</h3>
                <p className="text-gray-600">
                  Quality control with golden run systems and automotive-specific edge packaging
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Operate AI with Confidence?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join organizations that are transforming their AI operations with evidence-backed stability and fail-closed design principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/stability-demo"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Start with Stability Demo
              </Link>
              <Link
                to="/contact"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Where Art Meets Innovation */}
      {/* Latest from the Blog */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Latest from the blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/blog/model-starters-8-presets" className="block bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:bg-blue-50/30 transition">
              <div className="text-sm text-slate-600 mb-1">Model Starters</div>
              <div className="text-lg font-semibold text-slate-900">Build the Right Model: 8 Presets</div>
              <div className="text-slate-700 text-sm mt-1">LLM, SLM, LAM, MoE, VLM, MLM, LCM, SAM</div>
            </Link>
            <Link to="/blog/context-engineering-layer" className="block bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:bg-blue-50/30 transition">
              <div className="text-sm text-slate-600 mb-1">Context</div>
              <div className="text-lg font-semibold text-slate-900">Context Engineering: Retrieval, Signals, Packing</div>
              <div className="text-slate-700 text-sm mt-1">Hybrid retrieval + risk‑aware context</div>
            </Link>
            <Link to="/blog/hallucination-risk-guard-pre-generation" className="block bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:bg-blue-50/30 transition">
              <div className="text-sm text-slate-600 mb-1">Reliability</div>
              <div className="text-lg font-semibold text-slate-900">Hallucination Risk Guard (Pre‑Generation)</div>
              <div className="text-slate-700 text-sm mt-1">Risk signals → fetch/clarify/abstain</div>
            </Link>
          </div>
          <div className="text-center mt-4">
            <Link to="/blog" className="text-blue-600 font-semibold">Browse all posts →</Link>
          </div>
        </div>
      </section>

      
      {/* Where Art Meets Innovation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Where Art Meets Innovation
            </h2>
            <p className="text-xl text-slate-600">
              Ancient wisdom, mathematical beauty, and 20 years of synchronicity culminating in technological breakthroughs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
              <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">The Eye of Horus</h3>
              <p className="text-slate-600">Ancient Egyptian wisdom meets modern science. The mathematical marvel of 63/64 fractions representing the six senses and the missing divine spark.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Dürer's Mathematical Solids</h3>
              <p className="text-slate-600">Geometric perfection and harmonic resonance. The 8-faced polyhedron architecture inspiring our 8D Causal Manifold Simulator with advanced pattern recognition.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
              <Brain className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Cosmic Synchronicity</h3>
              <p className="text-slate-600">Radioactive decay and expanding universe patterns. 20 years of artistic exploration becoming technological reality through mathematical pattern recognition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Platform Capabilities
            </h2>
            <p className="text-xl text-slate-600">
              Evidence‑led synthetic data generation with enterprise‑grade security and compliance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white hover:bg-slate-100 transition-colors group shadow-md">
                <capability.icon className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-blue-600 mb-2">{capability.stat}</div>
                <div className="text-sm text-slate-500 mb-3">{capability.statLabel}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{capability.title}</h3>
                <p className="text-slate-600">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Industry Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Industry Solutions
            </h2>
            <p className="text-xl text-slate-600 mb-6">
              Ready for enterprise deployment across critical industries
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <Link
                to="/industries"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Healthcare Solutions
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/industries"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                Automotive Solutions
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Healthcare Suites */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Healthcare Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentSuites.healthcare.map((suite, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-slate-200 hover:border-blue-300 hover:scale-105 group">
                  <div className="inline-flex p-3 rounded-lg bg-blue-50 mb-4 group-hover:scale-110 transition-transform">
                    <suite.icon className={`h-6 w-6 ${suite.color}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{suite.name}</h4>
                  <p className="text-slate-600 text-sm mb-2">{suite.description}</p>
                  <div className="text-xs text-blue-600 font-medium">Enterprise Ready</div>
                </div>
              ))}
            </div>
          </div>

          {/* Automotive Suites */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Automotive Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentSuites.automotive.map((suite, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-slate-200 hover:border-green-300 hover:scale-105 group">
                  <div className="inline-flex p-3 rounded-lg bg-green-50 mb-4 group-hover:scale-110 transition-transform">
                    <suite.icon className={`h-6 w-6 ${suite.color}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{suite.name}</h4>
                  <p className="text-slate-600 text-sm mb-2">{suite.description}</p>
                  <div className="text-xs text-green-600 font-medium">Enterprise Ready</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-slate-600">
              Cutting‑edge AI and mathematical methods powering high‑scale synthetic data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Elastic Collision Newton's Cradle</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Energy transfer approach enabling efficient data generation and processing 
                at unprecedented scales while maintaining perfect quality compliance.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <code className="text-sm text-slate-700">
                  Energy Transfer: Efficient by design
                </code>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Radioactive Decay Universe Model</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Advanced pattern recognition system modeling cosmic processes including proton/photon decay 
                and universal expansion patterns for optimal synthetic data generation.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <code className="text-sm text-slate-700">
                  Pattern Recognition: Cosmic Scale
                </code>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Cpu className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">8D Causal Manifold Simulator</h3>
              </div>
              <p className="text-slate-600 mb-4">
                8-dimensional pattern recognition system with cosmic geometry for advanced synthetic data 
                generation and quality assurance at any scale.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <code className="text-sm text-slate-700">
                  Scale: Billion‑row demo; quality validated via evidence
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Databricks Partnership */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 mb-6">
              <Database className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Strategic Databricks Partnership
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              We're honest enough to say we may not be the only ones, but confident enough to say we're among the most advanced - 
              validated through our strategic partnership with the $6B+ leader in data platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="p-4 rounded-xl bg-blue-500/20 mb-6">
                <Database className="h-12 w-12 text-blue-400 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Enterprise Integration</h3>
              <p className="text-blue-100 leading-relaxed">
                Seamless Databricks marketplace integration with proven enterprise compliance and scalability.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="p-4 rounded-xl bg-green-500/20 mb-6">
                <Shield className="h-12 w-12 text-green-400 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Certified Administrator</h3>
              <p className="text-blue-100 leading-relaxed">
                Certified Databricks platform administrator providing expert technical support and integration guidance.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="p-4 rounded-xl bg-purple-500/20 mb-6">
                <Rocket className="h-12 w-12 text-purple-400 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">White-Label Ready</h3>
              <p className="text-blue-100 leading-relaxed">
                Custom Databricks integration for white-label customers with easy plug-and-play marketplace setup.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-blue-200 text-lg italic">
              "Our Databricks partnership proves we're enterprise-ready, while our technology proves we're revolutionary."
            </p>
          </div>
        </div>
      </section>

      {/* Market Position */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Among the Leading Synthetic Data Platforms
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            We're honest enough to say we may not be the only ones, but confident enough to say we're among the most advanced - 
            with revolutionary scale, proven technology, and enterprise-ready solutions validated through scientific rigor.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">1B+</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">Records Generated</div>
              <div className="text-sm text-slate-600">Unprecedented scale</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">11</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">Proprietary Inventions</div>
              <div className="text-sm text-slate-600">Platform inventions</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">Future Potential</div>
              <div className="text-sm text-slate-600">Innovation pipeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Data Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the synthetic data revolution with revolutionary scale, proven technology, and enterprise-ready solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all font-semibold inline-flex items-center justify-center"
            >
              Learn Our Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition-colors font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;