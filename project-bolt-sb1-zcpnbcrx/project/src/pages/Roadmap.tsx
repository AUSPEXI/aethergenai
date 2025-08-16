import React from 'react';
import { Calendar, CheckCircle, Clock, Target, TrendingUp, Users, Database, Shield, Globe, Zap, Brain, Lock, DollarSign, Rocket } from 'lucide-react';

const Roadmap = () => {
  const roadmapItems = [
    {
      version: 'SDSP v1.0',
      date: 'Q1 2025',
      status: 'completed',
      title: 'SDSP Platform Launch',
      description: 'Successfully launched SDSP Government and Finance platforms with 1M records/day processing and zk-SNARKs security.',
      achievements: [
        'SDSP Government: 8 suites (CHANGES, POISON, STRIVEAI, HYDRRA, SIRENEM, REFORM, INSUREAI, SHIELD)',
        'SDSP Finance: 8 suites (INSUREAI, SHIELD, CREDRISE, TRADEMARKET, CASHFLOW, CONSUME, TAXGUARD, RISKSHIELD)',
        '1M records/day processing capacity (43% real, 57% synthetic)',
        'zk-SNARKs implementation for blind uploads',
        '18-field schema with comprehensive metadata',
        'MoD JSP 440, FCA/SEC, UK GDPR compliance',
        'Feedback learning system for client-driven model refinement'
      ],
      metrics: {
        records: '1M/day',
        suites: '16 active',
        compliance: '8+ standards',
        clients: 'MoD, NHS, Banks'
      }
    },
    {
      version: 'Series A',
      date: 'Q2 2025',
      status: 'in-progress',
      title: 'Funding & Infrastructure Scaling',
      description: 'Secure $2-5M Series A funding for Authentes patenting, compute infrastructure, and market expansion.',
      achievements: [
        '$2-5M Series A funding round',
        'Authentes patent filing and IP protection',
        'Enhanced compute infrastructure for scaling',
        'Expanded team for R&D and business development',
        'Strategic partnerships with enterprise clients',
        'Enhanced zk-SNARKs implementation',
        'Advanced feedback learning algorithms'
      ],
      metrics: {
        funding: '$2-5M',
        patents: 'Authentes IP',
        team: 'Expanded R&D',
        partnerships: 'Enterprise'
      }
    },
    {
      version: 'SDSP v2.0',
      date: 'Q3 2025',
      status: 'planned',
      title: 'Food & Supply Chain Expansion',
      description: 'Launch SDSP Food and Supply Chain platforms with specialized suites for food safety, logistics, and supply chain optimization.',
      achievements: [
        'SDSP Food platform with 8 specialized suites',
        'SDSP Supply Chain platform with logistics optimization',
        'Enhanced feedback learning with TensorFlow meta-models',
        'Advanced statistical validation (KS test, KL divergence)',
        'Multi-industry cross-validation capabilities',
        'Expanded compliance frameworks',
        'Real-time processing improvements'
      ],
      metrics: {
        platforms: '4 total',
        suites: '32 active',
        industries: '4 verticals',
        processing: '2M/day target'
      }
    },
    {
      version: 'Authentes',
      date: 'Q3 2026',
      status: 'planned',
      title: 'Self-Validating Neural Network',
      description: 'Launch Authentes, our revolutionary self-validating neural network trained through client feedback learning.',
      achievements: [
        'Authentes self-validating neural network launch',
        'Advanced AI model trained on client feedback data',
        'Autonomous synthetic data quality validation',
        'Real-time model adaptation and improvement',
        'Cross-industry pattern recognition',
        'Next-generation privacy preservation',
        'Market-leading synthetic data accuracy'
      ],
      metrics: {
        ai: 'Authentes',
        validation: 'Self-validating',
        accuracy: 'Market-leading',
        automation: 'Autonomous'
      }
    }
  ];

  const milestones = [
    {
      quarter: 'Q2 2025',
      title: 'Series A Funding',
      description: 'Secure $2-5M for Authentes patenting and infrastructure scaling',
      icon: DollarSign,
      status: 'in-progress'
    },
    {
      quarter: 'Q3 2025',
      title: 'Food & Supply Chain',
      description: 'Launch SDSP Food and Supply Chain platforms with new suites',
      icon: Database,
      status: 'planned'
    },
    {
      quarter: 'Q4 2025',
      title: 'Enhanced Feedback Learning',
      description: 'Deploy advanced TensorFlow meta-models for client feedback',
      icon: Brain,
      status: 'planned'
    },
    {
      quarter: 'Q3 2026',
      title: 'Authentes Launch',
      description: 'Revolutionary self-validating neural network goes live',
      icon: Rocket,
      status: 'planned'
    }
  ];

  const marketProjections = [
    { year: '2025', market: '$500M', auspexi: 'Market Entry', growth: '+0%' },
    { year: '2026', market: '$750M', auspexi: 'Market Expansion', growth: '+50%' },
    { year: '2028', market: '$1.5B', auspexi: 'Market Leadership', growth: '+200%' },
    { year: '2030', market: '$2-3B', auspexi: 'Industry Standard', growth: '+400-500%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            SDSP Roadmap & Vision
          </h1>
          <p className="text-xl text-blue-100">
            Our journey from SDSP platform launch to Authentes self-validating AI, 
            targeting the $500M synthetic data market projected to reach $2-3B by 2030
          </p>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Current Status: SDSP Platform Success
            </h2>
            <p className="text-xl text-slate-600">
              Successfully launched Q1 2025 with 1M records/day processing and enterprise clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 p-6 rounded-xl text-center border border-green-200">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-600">1M</div>
              <div className="text-sm text-green-700">Records/Day</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-200">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-600">16</div>
              <div className="text-sm text-blue-700">SDSP Suites</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center border border-purple-200">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-600">8+</div>
              <div className="text-sm text-purple-700">Compliance Standards</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center border border-orange-200">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-orange-600">Zero</div>
              <div className="text-sm text-orange-700">Client Refinement Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Development Timeline
            </h2>
            <p className="text-xl text-slate-600">
              Major milestones from SDSP launch to Authentes self-validating AI
            </p>
          </div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline Line */}
                {index !== roadmapItems.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-full bg-slate-300"></div>
                )}

                <div className="flex items-start">
                  {/* Status Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-6 ${
                    item.status === 'completed' ? 'bg-green-500' : 
                    item.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-400'
                  }`}>
                    {item.status === 'completed' ? <CheckCircle className="h-6 w-6" /> :
                     item.status === 'in-progress' ? <Clock className="h-6 w-6" /> :
                     <Target className="h-6 w-6" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="bg-white border-2 border-slate-200 rounded-xl p-8 shadow-md">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Version Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-900">{item.version}</h3>
                              <p className="text-lg font-semibold text-blue-600">{item.title}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-slate-900">{item.date}</div>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-slate-100 text-slate-800'
                              }`}>
                                {item.status === 'completed' ? 'Completed' :
                                 item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                              </span>
                            </div>
                          </div>

                          <p className="text-slate-600 mb-6">{item.description}</p>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-3">Key Achievements</h4>
                            <ul className="space-y-2">
                              {item.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-600 text-sm">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Metrics</h4>
                          <div className="space-y-4">
                            {Object.entries(item.metrics).map(([key, value], metricIndex) => (
                              <div key={metricIndex} className="bg-slate-50 p-4 rounded-lg">
                                <div className="text-xl font-bold text-blue-600">{value}</div>
                                <div className="text-sm text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quarterly Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Quarterly Milestones
            </h2>
            <p className="text-xl text-slate-600">
              Key development and launch milestones through 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className={`p-6 rounded-xl text-center hover:shadow-md transition-shadow ${
                milestone.status === 'completed' ? 'bg-green-50 border border-green-200' :
                milestone.status === 'in-progress' ? 'bg-blue-50 border border-blue-200' :
                'bg-slate-50 border border-slate-200'
              }`}>
                <milestone.icon className={`h-12 w-12 mx-auto mb-4 ${
                  milestone.status === 'completed' ? 'text-green-600' :
                  milestone.status === 'in-progress' ? 'text-blue-600' :
                  'text-slate-600'
                }`} />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{milestone.quarter}</h3>
                <h4 className="text-md font-semibold text-blue-600 mb-3">{milestone.title}</h4>
                <p className="text-sm text-slate-600">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Projections */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Market Growth Projections
            </h2>
            <p className="text-xl text-slate-600">
              Synthetic data market evolution and Auspexi's position
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {marketProjections.map((projection, index) => (
                <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{projection.year}</div>
                  <div className="text-lg font-semibold text-slate-900 mb-1">{projection.market}</div>
                  <div className="text-sm text-slate-600 mb-2">Market Size</div>
                  <div className="text-sm font-medium text-green-600">{projection.growth}</div>
                  <div className="text-xs text-slate-500 mt-2">{projection.auspexi}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg text-slate-600">
                <strong>Target:</strong> Capture significant market share through SDSP platform innovation, 
                feedback learning, and Authentes self-validating AI technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Evolution */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Technology Evolution
            </h2>
            <p className="text-xl text-slate-600">
              From SDSP platforms to Authentes self-validating AI
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">SDSP v1.0</div>
                  <div className="text-lg font-semibold text-slate-900 mb-1">Current Platform</div>
                  <div className="text-sm text-slate-600">1M records/day, zk-SNARKs, feedback learning</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">SDSP v2.0</div>
                  <div className="text-lg font-semibold text-slate-900 mb-1">Q3 2025 Expansion</div>
                  <div className="text-sm text-slate-600">Food & Supply Chain, 2M records/day</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Authentes</div>
                  <div className="text-lg font-semibold text-slate-900 mb-1">Q3 2026 Revolution</div>
                  <div className="text-sm text-slate-600">Self-validating neural network</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Authentes Innovation</h3>
              <p className="text-slate-600 text-center mb-6">
                Our revolutionary self-validating neural network, trained through client feedback learning, 
                will autonomously validate synthetic data quality and adapt models in real-time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-slate-900">Self-Validating</div>
                  <div className="text-sm text-slate-600">Autonomous quality control</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold text-slate-900">Real-Time Adaptation</div>
                  <div className="text-sm text-slate-600">Dynamic model improvement</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-slate-900">Market Leading</div>
                  <div className="text-sm text-slate-600">Industry-first technology</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the synthetic data revolution from SDSP platforms to Authentes AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://databricks.com/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Access SDSP Platform
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;