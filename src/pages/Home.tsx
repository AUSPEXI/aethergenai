import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Activity, Target, Flame, Siren, RotateCcw, FileText, Lock, Database, Zap, Globe, CheckCircle, TrendingUp, Users, Brain, ExternalLink, Code, BarChart3, Award, Star } from 'lucide-react';

const Home = () => {
  const sdspSuites = {
    government: [
      { name: 'CHANGES', description: 'Healthcare epidemiological simulations', icon: Activity, color: 'text-red-500' },
      { name: 'POISON', description: 'Policing sentiment and optimization', icon: Shield, color: 'text-blue-500' },
      { name: 'STRIVE', description: 'Military strategic simulations', icon: Target, color: 'text-green-500' },
      { name: 'HYDRA', description: 'Fire service risk modeling', icon: Flame, color: 'text-orange-500' },
      { name: 'SIREN', description: 'EMS response optimization', icon: Siren, color: 'text-purple-500' },
      { name: 'REFORM', description: 'Prison rehabilitation metrics', icon: RotateCcw, color: 'text-indigo-500' },
      { name: 'INSURE', description: 'Cross-sector insurance risk', icon: FileText, color: 'text-teal-500' },
      { name: 'SHIELD', description: 'Cybersecurity threat modeling', icon: Lock, color: 'text-slate-500' }
    ],
    finance: [
      { name: 'CREDRISE', description: 'Credit scoring and risk assessment', icon: TrendingUp, color: 'text-green-600' },
      { name: 'TRADEMARKET', description: 'Trading and market analytics', icon: BarChart3, color: 'text-blue-600' },
      { name: 'CASHFLOW', description: 'Cash flow prediction and management', icon: Database, color: 'text-purple-600' },
      { name: 'CONSUME', description: 'Consumer behavior analytics', icon: Users, color: 'text-pink-600' },
      { name: 'TAXGUARD', description: 'Tax compliance and optimization', icon: Shield, color: 'text-yellow-600' },
      { name: 'RISKSHIELD', description: 'Financial risk management', icon: Target, color: 'text-red-600' },
      { name: 'INSURE', description: 'Insurance risk evaluation', icon: FileText, color: 'text-teal-500' },
      { name: 'SHIELD', description: 'Financial cybersecurity', icon: Lock, color: 'text-slate-500' }
    ]
  };

  const capabilities = [
    {
      title: 'SDSP Government & Finance',
      description: '2M records/day across 16 specialized suites with 43% real data from public sources and 57% synthetic AI generation',
      icon: Database,
      stat: '2M+',
      statLabel: 'Records/Day'
    },
    {
      title: 'zk-SNARKs Security',
      description: 'Blind uploads with zero-knowledge proofs ensuring MoD JSP 440, FCA/SEC, and GDPR compliance',
      icon: Lock,
      stat: '100%',
      statLabel: 'Privacy Guaranteed'
    },
    {
      title: 'Feedback Learning',
      description: 'Client-driven model refinement at zero cost, training our advanced AI system through iterative improvement',
      icon: Brain,
      stat: '36M+',
      statLabel: 'Datapoints/Day'
    },
    {
      title: 'Databricks Partnership',
      description: 'Proud data provider partner in Databricks $65B ecosystem, one of 5,000-6,000 global partnerships',
      icon: Award,
      stat: '5-6K',
      statLabel: 'Global Partners'
    }
  ];

  const metrics = [
    { value: '2M+', label: 'Records/Day', icon: Database },
    { value: '16', label: 'SDSP Suites', icon: Target },
    { value: '36M+', label: 'Datapoints/Day', icon: Code },
    { value: '18', label: 'Fields/Record', icon: BarChart3 }
  ];

  const databricksPartnership = {
    title: 'Databricks Data Provider Partnership',
    description: 'Proud partner in the Databricks ecosystem, valued at $65 billion, as one of 5,000-6,000 global partnerships',
    certifications: [
      {
        title: 'Databricks Fundamentals',
        description: 'Foundation certification in Databricks platform fundamentals and core concepts',
        note: 'Basic mandatory course - completed'
      },
      {
        title: 'Databricks Platform Administrator', 
        description: 'Advanced certification in platform administration and management',
        note: 'Advanced qualification - completed'
      }
    ],
    futureCertifications: [
      {
        title: 'Databricks Certified Data Engineer Associate',
        description: 'Advanced data engineering certification for enterprise-scale data pipelines'
      },
      {
        title: 'Databricks Certified Machine Learning Associate',
        description: 'Advanced machine learning certification for AI model development and deployment'
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Auspexi: Leading Ethical
              <span className="text-blue-300 block">Synthetic Data</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Powering Government and Finance with SDSP (Synthetic Data Service Platform) - 
              delivering 2M records/day with zk-SNARKs security and client-driven feedback learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://databricks.com/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center font-semibold"
              >
                Access SDSP on Databricks
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
              <Link
                to="/data-suites"
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              >
                Explore Suites
              </Link>
            </div>
            
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
          </div>
        </div>
      </section>

      {/* Databricks Partnership Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Databricks Partnership</h2>
            </div>
            <p className="text-xl text-slate-600 mb-6">
              {databricksPartnership.description}
            </p>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Partnership Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$65B</div>
                  <div className="text-slate-600">Databricks Valuation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5-6K</div>
                  <div className="text-slate-600">Global Partnerships</div>
                </div>
              </div>
              <p className="text-slate-600 mt-4">
                Our SDSP platforms automatically upload static data listings to Databricks Marketplace, 
                providing easy access to our synthetic data solutions for enterprise customers.
              </p>
            </div>
          </div>
          
          {/* Current Certifications */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Current Team Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {databricksPartnership.certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-green-200 text-center hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{cert.title}</h3>
                  <p className="text-slate-600 mb-4">{cert.description}</p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">{cert.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Advanced Certifications Roadmap</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {databricksPartnership.futureCertifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-blue-200 text-center hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{cert.title}</h3>
                  <p className="text-slate-600 mb-4">{cert.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">Premium enterprise certification</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDSP Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              SDSP Platform Capabilities
            </h2>
            <p className="text-xl text-slate-600">
              Advanced synthetic data generation with enterprise-grade security and compliance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
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

      {/* SDSP Suites */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              SDSP Government & Finance Suites
            </h2>
            <p className="text-xl text-slate-600 mb-6">
              16 specialized synthetic data suites across critical industries
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <a
                href="https://government.auspexi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                SDSP Government
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <a
                href="https://meek-stardust-2d15b1.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                SDSP Finance
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Government Suites */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Government Suites (1M records/day)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sdspSuites.government.map((suite, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-slate-200 hover:border-blue-300 hover:scale-105 group">
                  <div className="inline-flex p-3 rounded-lg bg-blue-50 mb-4 group-hover:scale-110 transition-transform">
                    <suite.icon className={`h-6 w-6 ${suite.color}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{suite.name}</h4>
                  <p className="text-slate-600 text-sm mb-2">{suite.description}</p>
                  <div className="text-xs text-blue-600 font-medium">125k records/day</div>
                </div>
              ))}
            </div>
          </div>

          {/* Finance Suites */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Finance Suites (1M records/day)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sdspSuites.finance.map((suite, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-slate-200 hover:border-green-300 hover:scale-105 group">
                  <div className="inline-flex p-3 rounded-lg bg-green-50 mb-4 group-hover:scale-110 transition-transform">
                    <suite.icon className={`h-6 w-6 ${suite.color}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{suite.name}</h4>
                  <p className="text-slate-600 text-sm mb-2">{suite.description}</p>
                  <div className="text-xs text-green-600 font-medium">125k records/day</div>
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
              Cutting-edge AI and cryptographic technologies powering ethical synthetic data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Lock className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">zk-SNARKs Security</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Zero-knowledge proofs enable blind uploads with complete privacy protection, 
                ensuring MoD JSP 440, FCA/SEC, and GDPR compliance without exposing sensitive data.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <code className="text-sm text-slate-700">
                  snarkjs.zkSNARK.prove(circuit, encrypted_data)
                </code>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Feedback Learning</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Clients refine models at zero cost (e.g., adjust CREDRISE credit scores), 
                with feedback training our advanced AI system through iterative improvement.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <code className="text-sm text-slate-700">
                  KS Test p-value: {'>'}0.05 ✓
                </code>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">High-Volume Processing</h3>
              </div>
              <p className="text-slate-600 mb-4">
                2M records/day with 18-field schema including credit_score, zk_proof, 
                and comprehensive metadata for enterprise-grade synthetic data generation.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <code className="text-sm text-slate-700">
                  43% real + 57% synthetic = 36M datapoints/day
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Position */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Leading the $500M Synthetic Data Market
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Targeting the rapidly growing synthetic data market, projected to reach $2-3B by 2030. 
            Our clients can refine our models at zero cost through our innovative feedback learning system, 
            processing 36M datapoints daily across Government and Finance platforms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">$500M</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">Current Market</div>
              <div className="text-sm text-slate-600">Synthetic data industry size</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">$2-3B</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">2030 Projection</div>
              <div className="text-sm text-slate-600">Expected market growth</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">36M+</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">Datapoints/Day</div>
              <div className="text-sm text-slate-600">Across both platforms</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Data Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the synthetic data revolution with SDSP's cutting-edge capabilities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://databricks.com/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center"
            >
              Access SDSP Platform
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
            <Link
              to="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
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