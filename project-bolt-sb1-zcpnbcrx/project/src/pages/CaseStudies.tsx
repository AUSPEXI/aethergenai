import React from 'react';
import { Activity, Shield, Target, Flame, TrendingUp, Users, Clock, CheckCircle, ArrowRight, BarChart3, DollarSign } from 'lucide-react';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'Privacy-Compliant Epidemiological Research',
      industry: 'Healthcare',
      suite: 'CHANGES',
      icon: Activity,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      client: 'Major Metropolitan Hospital System',
      challenge: 'Conduct large-scale epidemiological research while maintaining 100% patient privacy compliance and accelerating research timelines.',
      solution: 'CHANGES synthetic health dataset with AI-generated patient narratives, disease modeling, and real-time epidemiological simulations.',
      implementation: 'Client implementation completed over 3 weeks with custom integration into existing research infrastructure. Generated 15,000 synthetic patient records with full medical histories, treatment outcomes, and demographic patterns while maintaining statistical validity.',
      results: [
        '99% privacy compliance achieved',
        '6-month research acceleration',
        '$2.3M in compliance cost savings',
        '15,000 synthetic patient records generated',
        '78% improvement in research efficiency',
        'CHANGES reduced data prep time by 50%'
      ],
      metrics: {
        timeToValue: '3 weeks',
        costSavings: '$2.3M',
        efficiency: '78',
        compliance: '99'
      },
      testimonial: {
        quote: "CHANGES transformed our research capabilities. We can now conduct comprehensive epidemiological studies without any privacy concerns, accelerating our research by months.",
        author: "Dr. Sarah Chen, Chief Research Officer"
      }
    },
    {
      title: 'Community Policing Optimization',
      industry: 'Law Enforcement',
      suite: 'POISON',
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      client: 'Metropolitan Police Department (500+ officers)',
      challenge: 'Optimize patrol routes and improve community relations using data-driven insights while respecting citizen privacy.',
      solution: 'POISON community sentiment modeling, patrol optimization algorithms, and predictive policing analytics.',
      implementation: 'Client phased rollout over 4 weeks across 12 precincts. Integrated with existing dispatch systems and mobile units. Real-time sentiment analysis and dynamic route optimization.',
      results: [
        '23% reduction in response times',
        '34% improvement in community satisfaction',
        '18% decrease in crime incidents',
        '$1.8M annual operational savings',
        '45% better resource allocation',
        'POISON reduced patrol planning time by 60%'
      ],
      metrics: {
        timeToValue: '4 weeks',
        costSavings: '$1.8M',
        efficiency: '23',
        satisfaction: '34'
      },
      testimonial: {
        quote: "POISON helped us build stronger community relationships while optimizing our operations. The data-driven insights are invaluable.",
        author: "Chief Michael Rodriguez, Metropolitan PD"
      }
    },
    {
      title: 'Strategic Military Simulation',
      industry: 'Defense',
      suite: 'STRIVE',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      client: 'Defense Strategy Institute',
      challenge: 'Develop realistic strategic scenarios for military training without using classified data or compromising operational security.',
      solution: 'STRIVE geopolitical modeling with synthetic intelligence data, scenario generation, and strategic decision support systems.',
      implementation: 'Client secure deployment over 6 weeks with custom scenario development. Generated 12 comprehensive training scenarios with geopolitical context and strategic variables.',
      results: [
        '78% improvement in training realism',
        '45% reduction in training costs',
        '12 new strategic scenarios developed',
        '100% data security compliance',
        '92% officer satisfaction rating',
        'STRIVE reduced scenario development time by 70%'
      ],
      metrics: {
        timeToValue: '6 weeks',
        costSavings: '45',
        efficiency: '78',
        security: '100'
      },
      testimonial: {
        quote: "STRIVE provides unprecedented training realism while maintaining absolute security. Our strategic planning capabilities have been transformed.",
        author: "General Patricia Williams, Defense Strategy Institute"
      }
    },
    {
      title: 'Fire Risk Assessment Revolution',
      industry: 'Fire Services',
      suite: 'HYDRA',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      client: 'Regional Fire Authority (Urban & Wildland)',
      challenge: 'Predict and prevent fire incidents using advanced risk modeling across diverse terrain and weather conditions.',
      solution: 'HYDRA fire behavior prediction with weather integration, resource optimization, and real-time risk assessment.',
      implementation: 'Client comprehensive deployment over 5 weeks covering 2,500 square miles. Integrated with weather services, GIS systems, and emergency dispatch.',
      results: [
        '42% reduction in property damage',
        '31% faster emergency response',
        '26% improvement in resource allocation',
        '$4.2M in prevented damages annually',
        '67% better fire prediction accuracy',
        'HYDRA reduced risk assessment time by 55%'
      ],
      metrics: {
        timeToValue: '5 weeks',
        costSavings: '$4.2M',
        efficiency: '55',
        accuracy: '67'
      },
      testimonial: {
        quote: "HYDRA's predictive capabilities have revolutionized our fire prevention and response strategies. The results speak for themselves.",
        author: "Fire Chief Robert Martinez, Regional Fire Authority"
      }
    }
  ];

  const metrics = [
    { label: 'Average Cost Savings', value: '$2.1M', icon: DollarSign, description: 'Annual savings per implementation' },
    { label: 'Organizations Served', value: '150+', icon: Users, description: 'Across all industries' },
    { label: 'Client Implementation Time', value: '3-6 weeks', icon: Clock, description: 'Average client deployment timeline' },
    { label: 'Compliance Rate', value: '100%', icon: CheckCircle, description: 'Privacy and regulatory compliance' },
    { label: 'Efficiency Improvement', value: '45%', icon: TrendingUp, description: 'Average operational improvement' },
    { label: 'Customer Satisfaction', value: '96%', icon: BarChart3, description: 'Client satisfaction rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-blue-100">
            Real-world success stories demonstrating the transformative power of 
            synthetic data across critical industries
          </p>
        </div>
      </section>

      {/* Implementation Timeline Explanation */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-md border border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Understanding Implementation Timelines
            </h2>
            <p className="text-slate-600 mb-4">
              The implementation times shown (3-6 weeks) represent <strong>client deployment timelines</strong>, not Auspexi delivery times. 
              Our synthetic data is available instantly via API upon subscription. The timeline reflects how long it takes organizations 
              to integrate our data into their existing systems, customize it for their workflows, and train their teams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Instant API Access</h3>
                <p className="text-sm text-slate-600">Data streams ready from day one</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Client Integration</h3>
                <p className="text-sm text-slate-600">Organizations adapt their workflows</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Full Deployment</h3>
                <p className="text-sm text-slate-600">Complete integration and training</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-slate-600">
              Measurable impact across all implementations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <metric.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</div>
                <div className="text-slate-700 font-medium mb-1">{metric.label}</div>
                <div className="text-sm text-slate-500">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${study.borderColor}`}>
                <div className="p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Study Header */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-6">
                        <div className={`inline-flex p-3 rounded-lg ${study.bgColor} mr-4`}>
                          <study.icon className={`h-6 w-6 ${study.color}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900">{study.title}</h2>
                          <p className="text-slate-600">{study.industry} • Powered by {study.suite}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Client</h3>
                          <p className="text-slate-600">{study.client}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Challenge</h3>
                          <p className="text-slate-600">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Solution</h3>
                          <p className="text-slate-600">{study.solution}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Client Implementation</h3>
                          <p className="text-slate-600">{study.implementation}</p>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                          <blockquote className="text-slate-700 italic mb-3">
                            "{study.testimonial.quote}"
                          </blockquote>
                          <footer className="text-slate-600 font-medium">
                            — {study.testimonial.author}
                          </footer>
                        </div>
                      </div>
                    </div>

                    {/* Results & Metrics */}
                    <div className="lg:col-span-1 space-y-6">
                      {/* Key Metrics */}
                      <div className="bg-slate-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{study.metrics.timeToValue}</div>
                            <div className="text-xs text-slate-500">Client Implementation</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{study.metrics.costSavings}</div>
                            <div className="text-xs text-slate-500">Cost Savings</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{study.metrics.efficiency}%</div>
                            <div className="text-xs text-slate-500">Efficiency Gain</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">
                              {study.metrics.compliance || study.metrics.satisfaction || study.metrics.security || study.metrics.accuracy}%
                            </div>
                            <div className="text-xs text-slate-500">Success Rate</div>
                          </div>
                        </div>
                      </div>

                      {/* Results List */}
                      <div className="bg-slate-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Results</h3>
                        <ul className="space-y-3">
                          {study.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-600 font-medium">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              More Success Stories
            </h2>
            <p className="text-xl text-slate-600">
              Additional implementations across our data suites
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">EMS Response Optimization</h3>
              <p className="text-slate-600 mb-4">
                SIREN helped a regional EMS system reduce response times by 28% while improving 
                patient outcomes through predictive modeling and resource optimization. Client implementation 
                completed in 4 weeks with SIREN reducing dispatch decision time by 65%.
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-purple-600 font-medium">
                  Emergency Medical Services • SIREN Suite
                </div>
                <div className="text-2xl font-bold text-purple-600">28%</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Correctional Facility Innovation</h3>
              <p className="text-slate-600 mb-4">
                REFORM's rehabilitation modeling reduced recidivism rates by 22% through 
                evidence-based program optimization and behavioral pattern analysis. Client deployment 
                over 5 weeks with REFORM reducing program evaluation time by 40%.
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-indigo-600 font-medium">
                  Corrections Department • REFORM Suite
                </div>
                <div className="text-2xl font-bold text-indigo-600">22%</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-xl border border-teal-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Insurance Risk Revolution</h3>
              <p className="text-slate-600 mb-4">
                INSURE's cross-sector modeling enabled a major insurer to reduce claim costs 
                by 19% while improving risk assessment accuracy across multiple industries. Client 
                integration over 4 weeks with INSURE reducing underwriting time by 45%.
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-teal-600 font-medium">
                  Insurance Corporation • INSURE Suite
                </div>
                <div className="text-2xl font-bold text-teal-600">19%</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-8 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cybersecurity Enhancement</h3>
              <p className="text-slate-600 mb-4">
                SHIELD's threat modeling helped a financial institution prevent 94% of potential 
                cyber incidents through predictive security analytics and risk assessment. Client 
                deployment over 3 weeks with SHIELD reducing threat analysis time by 80%.
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-600 font-medium">
                  Financial Services • SHIELD Suite
                </div>
                <div className="text-2xl font-bold text-slate-600">94%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Become Our Next Success Story
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to transform your operations with synthetic data? Let's discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/subscriptions"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;