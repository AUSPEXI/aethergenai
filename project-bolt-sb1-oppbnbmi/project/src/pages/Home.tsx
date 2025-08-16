import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Briefcase, Mail, Zap, Target, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Fibonacci Spiral Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-white rounded-full animate-pulse delay-2000"></div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Gwylym Pryce-Owen</span>
              <span className="block text-xl sm:text-2xl font-normal text-blue-200 mt-4">
                Taming Chaos into Clarity
              </span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-blue-100 leading-relaxed mb-12">
              Two decades of transforming complexity into elegant solutions. From Auspexi's 8-suite SDSP 
              processing 1M records daily to Authentes 2.0's self-validating neural networks, I bridge 
              the gap between chaotic data and crystal-clear insights, weaving together artificial intelligence, 
              creative expression, and strategic innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/cvs"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Explore CVs
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <Link
                to="/projects"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1"
              >
                <Code className="h-5 w-5 mr-2" />
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Grid Overview Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Eight Dimensions of Innovation
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Inspired by Auspexi's 8-suite architecture, my work spans eight interconnected domains, 
              each contributing to the larger pattern of technological and creative evolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AI Solutions */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Architecture</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Neural networks, machine learning pipelines, and self-validating AI systems that learn and adapt.
              </p>
            </div>

            {/* Data Synthesis */}
            <div className="group p-8 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-700 transition-colors">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Synthetic Data</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                SDSP systems generating privacy-preserving data at scale for the $3B synthetic data market.
              </p>
            </div>

            {/* Marketing Automation */}
            <div className="group p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-700 transition-colors">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Marketing Tech</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Automated campaigns achieving 30% engagement uplifts through intelligent content optimization.
              </p>
            </div>

            {/* Creative Expression */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-700 transition-colors">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Works</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Poetry, essays, and artistic explorations connecting technology with human experience.
              </p>
            </div>

            {/* Four more sections to complete the 8-grid */}
            <div className="group p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-700 transition-colors">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">System Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Scalable architectures processing millions of records with Fibonacci-inspired efficiency patterns.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Security & Trust</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fraud detection systems achieving 90% scam reduction through advanced pattern recognition.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-700 transition-colors">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Strategy & Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                20-year perspective on technology evolution, from early web to AI transformation.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-700 transition-colors">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation Lab</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experimental projects exploring the intersection of chaos theory, art, and technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Chaos into Clarity?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Whether you're seeking an AI solution architect, creative technologist, or strategic partner 
            for your next breakthrough, let's explore how two decades of innovation can serve your vision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/cover-letter"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Mail className="h-5 w-5 mr-2" />
              View Cover Letter
            </Link>
            
            <Link
              to="/creative"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              <Palette className="h-5 w-5 mr-2" />
              Discover Creative Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}