import React from 'react';
import { Activity, Shield, Target, Flame, Siren, RotateCcw, FileText, Lock, Truck, GraduationCap, Building, Factory, MapPin, Users, TrendingUp, Scissors, Brain, Database, Globe } from 'lucide-react';

const Industries = () => {
  const targetIndustries = [
    {
      name: 'Healthcare',
      suite: 'CHANGES',
      icon: Activity,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      applications: [
        'Epidemiological research and modeling',
        'Clinical trial optimization',
        'Patient outcome prediction',
        'Healthcare policy analysis',
        'Medical device testing'
      ],
      potential: 'Transform medical research',
      impact: 'Accelerate discoveries'
    },
    {
      name: 'Law Enforcement',
      suite: 'POISON',
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      applications: [
        'Community policing optimization',
        'Crime pattern analysis',
        'Resource deployment planning',
        'Public safety strategy',
        'Emergency response coordination'
      ],
      potential: 'Optimize public safety',
      impact: 'Improve community relations'
    },
    {
      name: 'Defense & Military',
      suite: 'STRIVE',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      applications: [
        'Strategic planning and simulation',
        'Tactical decision support',
        'Intelligence analysis',
        'Risk assessment modeling',
        'Mission planning optimization'
      ],
      potential: 'Enhance strategic capabilities',
      impact: 'Improve decision making'
    },
    {
      name: 'Fire & Rescue',
      suite: 'HYDRA',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      applications: [
        'Fire risk assessment and modeling',
        'Emergency response optimization',
        'Resource allocation planning',
        'Hazard prediction and mitigation',
        'Training and simulation'
      ],
      potential: 'Revolutionize fire safety',
      impact: 'Prevent disasters'
    },
    {
      name: 'Emergency Medical Services',
      suite: 'SIREN',
      icon: Siren,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      applications: [
        'Response time optimization',
        'Patient outcome prediction',
        'Ambulance fleet management',
        'Call priority classification',
        'Medical equipment planning'
      ],
      potential: 'Save more lives',
      impact: 'Faster emergency response'
    },
    {
      name: 'Corrections & Rehabilitation',
      suite: 'REFORM',
      icon: RotateCcw,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      applications: [
        'Recidivism prediction and prevention',
        'Rehabilitation program optimization',
        'Facility management analytics',
        'Behavioral pattern analysis',
        'Resource allocation planning'
      ],
      potential: 'Transform rehabilitation',
      impact: 'Reduce recidivism'
    },
    {
      name: 'Insurance',
      suite: 'INSURE',
      icon: FileText,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50',
      applications: [
        'Risk assessment and modeling',
        'Claims prediction and optimization',
        'Premium calculation analytics',
        'Fraud detection and prevention',
        'Portfolio risk management'
      ],
      potential: 'Revolutionize risk modeling',
      impact: 'Reduce costs and fraud'
    },
    {
      name: 'Cybersecurity',
      suite: 'SHIELD',
      icon: Lock,
      color: 'text-slate-500',
      bgColor: 'bg-slate-50',
      applications: [
        'Threat modeling and prediction',
        'Security vulnerability assessment',
        'Incident response planning',
        'Compliance monitoring',
        'Loss prevention analytics'
      ],
      potential: 'Strengthen cyber defenses',
      impact: 'Prevent security breaches'
    },
    {
      name: 'Finance & Banking',
      suite: 'CREDRISE',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      applications: [
        'Credit scoring and risk assessment',
        'Trading algorithm optimization',
        'Market prediction and analysis',
        'Regulatory compliance monitoring',
        'Fraud detection and prevention'
      ],
      potential: 'Transform financial services',
      impact: 'Improve risk management'
    }
  ];

  const futureIndustries = [
    {
      name: 'Transportation',
      icon: Truck,
      description: 'Traffic risk modeling, infrastructure optimization, and autonomous vehicle testing',
      timeline: 'Q2 2025',
      potential: 'Smart city integration'
    },
    {
      name: 'Education',
      icon: GraduationCap,
      description: 'Student behavior datasets, learning outcome prediction, and educational policy analysis',
      timeline: 'Q3 2025',
      potential: 'Personalized learning'
    },
    {
      name: 'Construction',
      icon: Building,
      description: 'Safety risk modeling, project optimization, and infrastructure planning',
      timeline: 'Q4 2025',
      potential: 'Predictive maintenance'
    },
    {
      name: 'Manufacturing',
      icon: Factory,
      description: 'Quality control optimization, supply chain modeling, and predictive maintenance',
      timeline: '2026',
      potential: 'Industry 4.0 integration'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Industries We Serve
          </h1>
          <p className="text-xl text-blue-100">
            Transforming critical industries with synthetic data solutions that drive innovation 
            while preserving privacy and security
          </p>
        </div>
      </section>

      {/* Industry Sector Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Industry Sector Overview
            </h2>
            <p className="text-xl text-slate-600">
              Visual representation of our platform's industry coverage and transformative potential
            </p>
          </div>
          
          {/* Sector Map Visualization */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {targetIndustries.map((industry, index) => (
                <div key={index} className="text-center group">
                  <div className={`inline-flex p-4 rounded-xl ${industry.bgColor} mb-3 group-hover:scale-110 transition-transform`}>
                    <industry.icon className={`h-8 w-8 ${industry.color}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{industry.name}</h3>
                  <p className="text-sm text-slate-600 mb-1">{industry.suite}</p>
                  <p className="text-xs text-blue-600 font-medium">{industry.potential}</p>
                </div>
              ))}
            </div>
            
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-6 shadow-lg border-4 border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1M+</div>
                <div className="text-sm text-slate-600">Records/Day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Industries */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Industries Ready for Transformation
            </h2>
            <p className="text-xl text-slate-600">
              Nine critical industries positioned to benefit from our synthetic data solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {targetIndustries.map((industry, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className={`inline-flex p-3 rounded-lg ${industry.bgColor} mb-4`}>
                  <industry.icon className={`h-6 w-6 ${industry.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-4">Powered by {industry.suite}</p>
                
                {/* Key Potential */}
                <div className="bg-slate-50 p-3 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Potential:</span>
                    <span className="font-semibold text-slate-900">{industry.potential}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Impact:</span>
                    <span className="font-semibold text-green-600">{industry.impact}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-slate-900 mb-2">Key Applications</h4>
                <ul className="space-y-2">
                  {industry.applications.slice(0, 3).map((app, appIndex) => (
                    <li key={appIndex} className="text-sm text-slate-600">
                      • {app}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Industry Synergy */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Cross-Industry Innovation
            </h2>
            <p className="text-xl text-slate-600">
              Our unique advantage lies in leveraging shared AI infrastructure and methodologies 
              across industries, creating unprecedented insights and optimization opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Shared Intelligence</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Pattern recognition and optimization techniques developed for one industry 
                can enhance capabilities across all sectors.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Example Potential:</p>
                <p className="text-sm text-slate-600">Sentiment analysis from POISON could enhance STRIVE's geopolitical modeling</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Unified Infrastructure</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Common AI frameworks and data processing pipelines reduce costs while 
                increasing reliability and performance across all suites.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Technical Advantage:</p>
                <p className="text-sm text-slate-600">Shared models serve both CHANGES and SIREN applications efficiently</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Comprehensive Risk Modeling</h3>
              </div>
              <p className="text-slate-600 mb-4">
                INSURE suite can integrate risk data from all industries, providing 
                unprecedented cross-sector insurance analytics capabilities.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Future Possibility:</p>
                <p className="text-sm text-slate-600">Healthcare + Fire + EMS data could create comprehensive emergency response insurance models</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Expansions */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Future Industry Expansions
            </h2>
            <p className="text-xl text-slate-600">
              Planned expansions into new industries, leveraging our proven AI infrastructure 
              and cross-industry methodologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futureIndustries.map((industry, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <industry.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{industry.name}</h3>
                    <span className="text-sm text-blue-600 font-medium">Planned: {industry.timeline}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{industry.description}</p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-900">Potential Impact:</span> {industry.potential}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Demonstration */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              See Our Technology in Action
            </h2>
            <p className="text-xl text-slate-600">
              Experience how our synthetic data platforms could transform your industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-xl shadow-md">
              <Activity className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Healthcare Innovation Potential</h3>
              <p className="text-slate-600 mb-4">
                CHANGES could enable privacy-compliant epidemiological research, 
                potentially accelerating medical discoveries while maintaining 
                absolute patient privacy protection.
              </p>
              <div className="flex justify-between items-center">
                <a href="https://government.auspexi.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-medium">
                  Explore Healthcare Suite →
                </a>
                <div className="text-2xl font-bold text-red-600">CHANGES</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
              <Shield className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Public Safety Transformation</h3>
              <p className="text-slate-600 mb-4">
                POISON's community sentiment modeling could help police departments 
                optimize patrol routes and improve community relations through 
                data-driven insights while respecting citizen privacy.
              </p>
              <div className="flex justify-between items-center">
                <a href="https://government.auspexi.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore Public Safety Suite →
                </a>
                <div className="text-2xl font-bold text-blue-600">POISON</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Discover how synthetic data could revolutionize your sector. 
            Let's discuss the possibilities for your specific industry needs.
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
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;