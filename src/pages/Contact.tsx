import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Calendar, Users, Clock, CheckCircle, ExternalLink, FileText, Database } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'info@auspexi.com',
      description: 'General inquiries and SDSP platform support',
      action: 'mailto:info@auspexi.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+44 20 7946 0958',
      description: 'Business hours: 9 AM - 6 PM GMT',
      action: 'tel:+442079460958'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: '123 Data Lane, London EC1A 1AA, UK',
      description: 'Serving clients globally via SDSP platform',
      action: null
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sdsp-government', label: 'SDSP Government Platform' },
    { value: 'sdsp-finance', label: 'SDSP Finance Platform' },
    { value: 'feedback-learning', label: 'Feedback Learning System' },
    { value: 'zk-snarks', label: 'zk-SNARKs Security' },
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'advanced-ai', label: 'Advanced AI System' },
    { value: 'compliance', label: 'Compliance & Regulatory' },
    { value: 'technical', label: 'Technical Support' }
  ];

  const resources = [
    {
      title: 'Transparency Report',
      description: 'Comprehensive overview of our data sources, processing methods, and compliance standards',
      icon: FileText,
      link: 'https://resources.auspexi.com/transparency-report.pdf'
    },
    {
      title: 'API Documentation',
      description: 'Complete technical documentation for SDSP Government and Finance platforms',
      icon: Database,
      link: 'https://resources.auspexi.com/api-documentation.pdf'
    },
    {
      title: 'Databricks Marketplace',
      description: 'Access SDSP platforms directly through Databricks Marketplace',
      icon: ExternalLink,
      link: 'https://databricks.com/marketplace'
    }
  ];

  const services = [
    {
      icon: MessageSquare,
      title: 'SDSP Platform Consultation',
      description: 'Discuss your synthetic data needs with our SDSP experts',
      duration: '30-60 minutes'
    },
    {
      icon: Calendar,
      title: 'Demo Scheduling',
      description: 'Schedule a personalized demo of SDSP Government or Finance platforms',
      duration: '45 minutes'
    },
    {
      icon: Users,
      title: 'Enterprise Partnership',
      description: 'Explore collaboration opportunities and feedback learning integration',
      duration: 'Custom timeline'
    }
  ];

  const responseGuarantees = [
    { icon: Clock, text: 'Response within 24 hours', subtext: 'During business days' },
    { icon: CheckCircle, text: 'Dedicated SDSP specialist', subtext: 'For platform inquiries' },
    { icon: MessageSquare, text: 'Follow-up consultation', subtext: 'If needed' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100">
            Ready to transform your data strategy with SDSP platforms? Let's discuss how 
            Auspexi's synthetic data solutions can meet your specific needs
          </p>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              SDSP Platform Performance
            </h2>
            <p className="text-xl text-slate-600">
              Current processing capabilities across Government and Finance platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">2M+</div>
              <div className="text-sm text-slate-600">Records/Day Total</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-green-600">36M+</div>
              <div className="text-sm text-slate-600">Datapoints/Day</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-purple-600">16</div>
              <div className="text-sm text-slate-600">Active Suites</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-orange-600">18</div>
              <div className="text-sm text-slate-600">Fields/Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Resources & Documentation
            </h2>
            <p className="text-xl text-slate-600">
              Access comprehensive documentation and platform resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <resource.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{resource.title}</h3>
                </div>
                <p className="text-slate-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Access Resource
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your organization"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Tell us about your SDSP platform needs, feedback learning requirements, or any questions about our synthetic data solutions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                        <info.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">{info.title}</h3>
                        {info.action ? (
                          <a 
                            href={info.action}
                            target={info.action.startsWith('mailto:') || info.action.startsWith('tel:') ? '_self' : '_blank'}
                            rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-slate-700 font-medium hover:text-blue-600 transition-colors"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-slate-700 font-medium">{info.details}</p>
                        )}
                        <p className="text-slate-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Guarantees */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Our Commitment to You
                </h3>
                <div className="space-y-3">
                  {responseGuarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center">
                      <guarantee.icon className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <span className="font-medium text-slate-900">{guarantee.text}</span>
                        <span className="text-slate-600 text-sm ml-2">({guarantee.subtext})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  How We Can Help
                </h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start p-4 bg-white rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                      <service.icon className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{service.title}</h4>
                        <p className="text-slate-600 text-sm mb-1">{service.description}</p>
                        <span className="text-xs text-blue-600 font-medium">{service.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDSP Platform Access */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Access SDSP Platforms
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Get started with our Synthetic Data Service Platform through Databricks Marketplace
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">SDSP Government</h3>
              <p className="text-slate-600 mb-6">
                8 specialized suites for healthcare, defense, emergency services, and public safety. 
                1M records/day with zk-SNARKs security and MoD JSP 440 compliance.
              </p>
              <a
                href="https://government.auspexi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Access Government Platform
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">SDSP Finance</h3>
              <p className="text-slate-600 mb-6">
                8 specialized suites for banking, trading, risk management, and compliance. 
                1M records/day with FCA/SEC compliance and advanced feedback learning.
              </p>
              <a
                href="https://meek-stardust-2d15b1.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Access Finance Platform
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the synthetic data revolution and transform your data strategy with SDSP platforms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://databricks.com/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center"
            >
              Access Databricks Marketplace
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;