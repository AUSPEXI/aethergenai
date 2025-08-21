import React from 'react';
import { Cpu, Database, Shield, Zap, Globe, Code, Brain, Lock, GitBranch, Calendar, TrendingUp, CheckCircle, Clock, Target, AlertTriangle, Rss, Download, Users } from 'lucide-react';

const Technology = () => {
  const technologies = [
    {
      category: 'AI & Machine Learning',
      icon: Brain,
      items: [
        'DistilBERT for sentiment analysis and text processing',
        'GPT-2 for natural language generation',
        'CTGAN for tabular synthetic data generation',
        'Prophet for time-series forecasting',
        'PyTorch for deep learning model development',
        'PyG (PyTorch Geometric) for graph neural networks',
        'Scikit-learn for classical machine learning',
        'Self-improving AI system through client feedback learning',
        'Autonomous quality validation and model refinement'
      ]
    },
    {
      category: 'Data Sources & Processing',
      icon: Database,
      items: [
        'Public RSS feeds (WHO, CDC, Johns Hopkins, SEC, FCA)',
        'Publicly available CSV datasets and government APIs',
        'Local processing of diverse public data sources',
        'Hybrid dataset processing (43% real/enhanced, 57% synthetic)',
        'Privacy-preserving local data transformation',
        'Advanced statistical modeling techniques',
        'Time-series analysis and forecasting',
        'Client data validation and outlier detection',
        '2M records/day processing capacity across platforms'
      ]
    },
    {
      category: 'Security & Privacy',
      icon: Shield,
      items: [
        'Full zk-SNARKs implementation using circom library',
        'Zero-knowledge proofs for blind data uploads',
        'Client data upload/download with complete encryption',
        'Differential privacy with mathematical guarantees',
        'Local data processing (no external API exposure)',
        'GDPR, HIPAA, FCA/SEC, and MoD JSP 440 compliant',
        'SHA-256 hashing with privacy-preserving transformations',
        'Enterprise-grade cryptographic protocols',
        'Gold-standard privacy protection'
      ]
    },
    {
      category: 'Infrastructure',
      icon: Globe,
      items: [
        'Enterprise deployment on Netlify',
        'Supabase for data storage and real-time capabilities',
        'Edge computing for reduced latency',
        'Auto-scaling for demand flexibility',
        'Real-time pipeline processing',
        'High-availability architecture',
        'Global deployment infrastructure'
      ]
    }
  ];

  const features = [
    {
      title: 'Hybrid Dataset Architecture',
      description: 'Combines 43% diverse public data with 57% AI-generated synthetic data for optimal realism',
      icon: Zap
    },
    {
      title: 'High-Volume Processing',
      description: 'Currently processing 2M records/day with 18-field schema across Government and Finance platforms',
      icon: Cpu
    },
    {
      title: 'Full zk-SNARKs Implementation',
      description: 'Complete zero-knowledge proof system enabling secure client data uploads and downloads',
      icon: Lock
    },
    {
      title: 'Client Data Integration',
      description: 'Customers can securely upload and download their own data for realism validation using encrypted zk-SNARKs',
      icon: Download
    },
    {
      title: 'Self-Improving AI System',
      description: 'Advanced AI that learns from client feedback and autonomously improves synthetic data quality',
      icon: Brain
    },
    {
      title: 'API-Driven',
      description: 'RESTful APIs enable seamless integration with existing systems and workflows',
      icon: Code
    }
  ];

  const versions = [
    {
      version: 'v2.0',
      date: 'Current - 2025',
      status: 'current',
      title: 'Full zk-SNARKs SDSP Platform with Self-Improving AI',
      description: 'Production system with complete zero-knowledge proof implementation, client data capabilities, and autonomous AI improvement',
      features: [
        'Full zk-SNARKs implementation using circom library',
        'Client data upload/download with complete encryption',
        'Self-improving AI system through client feedback learning',
        'Autonomous quality validation and model refinement',
        'Differential privacy with mathematical guarantees',
        '2M records/day processing capacity across Government and Finance',
        'Domain expert validation through feedback learning interface',
        'Real-time model adaptation and improvement',
        '43% diverse public data + 57% synthetic AI generation',
        '4 core add-ons bundled + 4 premium add-ons optional per suite',
        'Enterprise infrastructure with high availability',
        'Government and Finance suites fully operational',
        'Cross-industry pattern recognition capabilities'
      ],
      addons: {
        core: ['sentimentDynamics', 'behaviorPrediction', 'environmentalImpact', 'resourceOptimization'],
        premium: ['networkAnalysis', 'advancedOptimization', 'patternClustering', 'predictiveForecasting']
      },
      privacyNote: 'Gold-standard zero-knowledge proof implementation with mathematical privacy guarantees, client data integration, and self-improving AI capabilities'
    },
    {
      version: 'v2.1',
      date: 'Q3 2025',
      status: 'planned',
      title: 'Food & Supply Chain Expansion',
      description: 'Platform expansion with new industry verticals and enhanced AI capabilities',
      features: [
        'SDSP Food and Supply Chain platforms launch',
        'Enhanced feedback learning with advanced statistical validation',
        'Improved client data integration workflows',
        '3M records/day target capacity',
        'Cross-industry pattern recognition',
        'Advanced outlier detection and validation',
        'Enhanced domain expert interfaces',
        'Multi-modal data synthesis capabilities'
      ],
      privacyNote: 'Continued zero-knowledge proof excellence with expanded industry coverage and enhanced AI capabilities'
    },
    {
      version: 'v3.0',
      date: 'Q2 2026',
      status: 'planned',
      title: 'Enterprise-Scale Platform',
      description: 'Enterprise-scale platform with advanced AI capabilities and global deployment',
      features: [
        'Scale to multiple industry categories',
        '5M records/day processing capacity',
        'Advanced simulation and modeling engines',
        'Multi-modal data synthesis capabilities',
        'Real-time analytics and insights platform',
        'Global deployment infrastructure',
        'Enterprise-grade SLA guarantees',
        'Advanced cross-industry AI learning'
      ]
    }
  ];

  const currentMetrics = [
    { label: 'Records/Day', value: '2M', target: '3M' },
    { label: 'Active Suites', value: '16', target: '24' },
    { label: 'Real Data %', value: '43%', target: 'Optimized' },
    { label: 'Synthetic Data %', value: '57%', target: 'Enhanced' },
    { label: 'Core Add-ons/Suite', value: '4', target: '4' },
    { label: 'Premium Add-ons/Suite', value: '4', target: '4' },
    { label: 'Categories', value: '2', target: '4' }
  ];

  const zkpTimeline = [
    {
      phase: 'v2.0 Current',
      date: '2025',
      status: 'active',
      title: 'Full zk-SNARKs + Self-Improving AI',
      description: 'Complete zero-knowledge proof system with client data integration and autonomous AI improvement capabilities',
      icon: Shield,
      color: 'green'
    },
    {
      phase: 'v2.1 Enhanced',
      date: 'Q3 2025',
      status: 'development',
      title: 'Advanced Multi-Industry AI',
      description: 'Enhanced cross-industry pattern recognition with advanced statistical validation and multi-modal capabilities',
      icon: Users,
      color: 'blue'
    },
    {
      phase: 'v3.0 Future',
      date: 'Q2 2026',
      status: 'future',
      title: 'Global Enterprise AI Platform',
      description: 'Enterprise-scale deployment with advanced AI capabilities and global infrastructure',
      icon: Brain,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technology Overview
          </h1>
          <p className="text-xl text-blue-100">
            Robust artificial intelligence with self-improving capabilities, gold-standard zk-SNARKs encryption, 
            and secure client data integration powering 2M records/day across enterprise platforms
          </p>
        </div>
      </section>

      {/* Current Implementation Notice */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8">
            <div className="flex items-start">
              <div className="flex items-center mr-4">
                <Lock className="h-8 w-8 text-green-600 mr-2" />
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Robust AI with Gold-Standard Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Current Implementation (v2.0)</h4>
                    <ul className="space-y-2 text-blue-100">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span><strong>Full zk-SNARKs:</strong> Complete zero-knowledge proof system using circom</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span><strong>Self-improving AI:</strong> Autonomous quality validation and model refinement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span><strong>Client data integration:</strong> Secure upload/download with full encryption</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span><strong>Blind uploads:</strong> Clients can safely upload classified data without exposure</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span><strong>2M records/day:</strong> High-volume processing across Government and Finance</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">AI System Capabilities</h4>
                    <ul className="space-y-2 text-blue-100">
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                        <span><strong>Autonomous learning:</strong> AI continuously improves without human intervention</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                        <span><strong>Quality validation:</strong> Self-validates synthetic data quality and realism</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                        <span><strong>Pattern recognition:</strong> Cross-industry learning and optimization</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                        <span><strong>Real-time adaptation:</strong> Models adapt and improve in real-time</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-blue-100">
                    <strong>Key Innovation:</strong> We've built a robust artificial intelligence system with self-improving capabilities 
                    and gold-standard zk-SNARKs encryption. Clients can safely upload their classified data through blind uploads - 
                    we will never be able to know or see that data, yet our models can still do their job to generate realistic synthetic datasets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI & Privacy Evolution Timeline */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">AI & Privacy Evolution</h2>
            </div>
            <p className="text-xl text-blue-100">
              Our progression from basic synthetic data to self-improving AI with gold-standard privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {zkpTimeline.map((phase, index) => (
              <div key={index} className="relative">
                <div className={`bg-white border-2 rounded-xl p-6 shadow-md ${
                  phase.color === 'green' ? 'border-green-200' :
                  phase.color === 'blue' ? 'border-blue-200' : 'border-purple-200'
                }`}>
                  <div className="text-center mb-4">
                    <div className={`inline-flex p-3 rounded-full mb-3 ${
                      phase.color === 'green' ? 'bg-green-100' :
                      phase.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      <phase.icon className={`h-8 w-8 ${
                        phase.color === 'green' ? 'text-green-600' :
                        phase.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{phase.phase}</h3>
                    <p className="text-sm text-slate-500">{phase.date}</p>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{phase.title}</h4>
                  <p className="text-slate-600 text-sm">{phase.description}</p>
                  
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      phase.status === 'active' ? 'bg-green-100 text-green-800' :
                      phase.status === 'development' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {phase.status === 'active' ? 'Currently Active' :
                       phase.status === 'development' ? 'In Development' : 'Future Planning'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Evolution Section */}
      <section id="versioning" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <GitBranch className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Platform Evolution</h2>
            </div>
            <p className="text-xl text-slate-600">
              From SDSP platforms to advanced self-improving AI with enterprise-scale capabilities
            </p>
          </div>

          {/* Current Metrics */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Current Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {currentMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-blue-600">{metric.value}</div>
                  <div className="text-xs text-slate-600 mb-1">{metric.label}</div>
                  <div className="text-xs text-slate-500">Target: {metric.target}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Version Timeline */}
          <div className="space-y-12">
            {versions.map((version, index) => (
              <div key={index} className={`relative ${index !== versions.length - 1 ? 'pb-12' : ''}`}>
                {/* Timeline Line */}
                {index !== versions.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-slate-200"></div>
                )}
                
                <div className="flex items-start">
                  {/* Version Badge */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-6 ${
                    version.status === 'current' ? 'bg-green-500' : 
                    version.status === 'planned' ? 'bg-blue-500' : 'bg-slate-400'
                  }`}>
                    {version.status === 'current' ? <CheckCircle className="h-6 w-6" /> :
                     version.status === 'planned' ? <Clock className="h-6 w-6" /> :
                     <Target className="h-6 w-6" />}
                  </div>

                  {/* Version Content */}
                  <div className="flex-1">
                    <div className="bg-white border-2 border-slate-200 rounded-xl p-8 shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{version.version}</h3>
                          <p className="text-lg font-semibold text-blue-600">{version.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-500 mb-1">Release Date</div>
                          <div className="text-lg font-semibold text-slate-900">{version.date}</div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            version.status === 'current' ? 'bg-green-100 text-green-800' :
                            version.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {version.status.charAt(0).toUpperCase() + version.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-6">{version.description}</p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {version.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-600 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {version.addons && (
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">Add-on System (4+4 per suite)</h4>
                            <div className="space-y-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h5 className="font-medium text-green-800 mb-2">Core Add-ons (4 Bundled)</h5>
                                <div className="text-sm text-green-700 space-y-1">
                                  {version.addons.core.map((addon, i) => (
                                    <div key={i}>• {addon}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <h5 className="font-medium text-purple-800 mb-2">Premium Add-ons (4 Optional)</h5>
                                <div className="text-sm text-purple-700 space-y-1">
                                  {version.addons.premium.map((addon, i) => (
                                    <div key={i}>• {addon}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h5 className="font-medium text-blue-800 mb-1">Total Available</h5>
                                <div className="text-sm text-blue-700">
                                  16 suites × (4 core + 4 premium) = 128 total add-ons across both platforms
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Privacy Notice */}
                      {version.privacyNote && (
                        <div className={`mt-6 p-4 rounded-lg ${
                          version.status === 'current' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <div className="flex items-start">
                            {version.status === 'current' ? (
                              <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                            ) : (
                              <Lock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                            )}
                            <p className={`text-sm ${
                              version.status === 'current' ? 'text-green-800' : 'text-blue-800'
                            }`}>
                              <strong>AI & Privacy Status:</strong> {version.privacyNote}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Technology Stack
            </h2>
            <p className="text-xl text-slate-600">
              Industry-leading tools and frameworks that enable our self-improving AI and synthetic data capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <tech.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{tech.category}</h3>
                </div>
                <ul className="space-y-3">
                  {tech.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Technical Advantages
            </h2>
            <p className="text-xl text-slate-600">
              What sets our self-improving AI and privacy technology apart in the synthetic data landscape
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Our Technology
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to see how our self-improving AI and gold-standard privacy technologies can 
            transform your data strategy?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/data-suites"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Explore Data Suites
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;