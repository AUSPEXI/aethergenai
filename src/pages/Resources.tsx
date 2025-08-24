import React from 'react';
import ResourcesHub from '../components/Resources/ResourcesHub';
import { BookOpen, FileText, Shield, Zap, Users, Globe } from 'lucide-react';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/20 rounded-full mb-6">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Resources & Documentation
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-blue-300 mb-8">
            Everything You Need to Get Started
          </h2>
          <p className="text-xl text-white leading-relaxed max-w-3xl mx-auto">
            Access comprehensive documentation, guides, and resources for the Aethergen platform. 
            From getting started to advanced technical specifications, we've got you covered.
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Guides</h3>
              <p className="text-blue-200 text-sm">Step-by-step tutorials and best practices</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Compliance Ready</h3>
              <p className="text-green-200 text-sm">HIPAA, GDPR, SOX compliance guides</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Technical Specs</h3>
              <p className="text-purple-200 text-sm">API references and technical documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Content */}
      <section className="py-20">
        <ResourcesHub />
      </section>

      {/* IP-Safe Note */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 text-sm text-left">
            Evidence bundles, datasheets, and guides are provided for public verification. Internal code, formulas, and parameterizations are not published.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our comprehensive resources cover everything from basic setup to advanced features. 
            Can't find what you're looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Support
            </a>
            <a
              href="/about"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Learn About Our Story
            </a>
          </div>
          
          {/* Additional Resources */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-blue-200" />
                <h3 className="text-lg font-semibold text-white">Community Support</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Join our user community for peer support, best practices sharing, and the latest updates.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-blue-200" />
                <h3 className="text-lg font-semibold text-white">Video Tutorials</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Step-by-step video guides for all platform features and common use cases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
