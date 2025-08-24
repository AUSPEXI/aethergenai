import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Activity, Target, Flame, Siren, RotateCcw, FileText, Lock, Database, Zap, Globe, CheckCircle, TrendingUp, Users, Brain, ExternalLink, Code, BarChart3, Award, Star, Eye, Sparkles, Cpu, Rocket } from 'lucide-react';
import AethergenHero from '../components/UI/AethergenHero';

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
      title: 'Revolutionary Scale',
      description: 'First to achieve high fidelity synthetic data at scale - 1 BILLION records with 100% quality compliance, scientifically proven',
      icon: Award,
      stat: '1B+',
      statLabel: 'Records Generated'
    },
    {
      title: '11 Proprietary Inventions',
      description: 'Revolutionary technologies including Elastic Collision Newton\'s Cradle and Radioactive Decay Universe Model',
      icon: Rocket,
      stat: '11',
      statLabel: 'Inventions'
    },
    {
      title: 'Global Leadership',
      description: 'Among the leading synthetic data platforms with revolutionary scale, quality, and innovation capabilities - scientifically validated',
      icon: Globe,
      stat: '100%',
      statLabel: 'Quality Compliance'
    },
    {
      title: 'Innovation Pipeline',
      description: 'Revolutionary innovations in development that will transform industries and open new worlds of exploration',
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
      <AethergenHero />
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
            <h2 className="text-3xl font-bold text-white mb-6">Revolutionary Scale & Innovation</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're honest enough to say we may not be the only ones when we aren't, but confident enough to say so when we are - after verifying through scientific rigor. 
              We're the first to achieve high fidelity synthetic data at scale, and we can prove it.
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <metric.icon className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-blue-200">{metric.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/about"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center font-semibold"
              >
                Learn Our Full Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/technology"
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              >
                Explore Technology
              </Link>
            </div>
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
              Revolutionary synthetic data generation with enterprise-grade security and compliance
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
              Cutting-edge AI and mathematical technologies powering unlimited-scale synthetic data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Elastic Collision Newton's Cradle</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Revolutionary energy transfer system enabling efficient data generation and processing 
                at unprecedented scales while maintaining perfect quality compliance.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <code className="text-sm text-slate-700">
                  Energy Transfer: 100% Efficiency
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
                  Scale: Unlimited with 100% Quality
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
              <div className="text-sm text-slate-600">Revolutionary technologies</div>
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