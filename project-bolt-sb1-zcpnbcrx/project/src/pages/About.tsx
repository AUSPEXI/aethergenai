import React from 'react';
import { User, Target, Globe, Lightbulb, ArrowRight, Eye, Calendar, MapPin, Award, Brain, Lock, Database, TrendingUp, Building, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Architects of Ethical Synthetic Data
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Based in London, UK, Auspexi leads the ethical AI-driven synthetic data revolution, 
            delivering 2M records/day through our SDSP platform. We're targeting the $500M 
            synthetic data market, projected to reach $2-3B by 2030.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Logo className="h-20 w-20" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Origin Story: Finding the Missing Fraction
            </h2>
            <p className="text-xl text-slate-600">
              How ancient wisdom guided the creation of modern synthetic data
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-200">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-amber-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-900">The Ancient Vision</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  Long before the first computer hummed to life, the ancient Egyptians told of 
                  the Eye of Horus—a symbol of protection and wholeness that was shattered in 
                  cosmic battle. Each fragment represented a fraction of completeness: 1/2, 1/4, 
                  1/8, 1/16, 1/32, and 1/64.
                </p>
                <p className="text-slate-700 mb-4">
                  But when reassembled, these fractions totaled only 63/64ths. The missing 1/64th 
                  was said to be the magic that made the eye whole—the divine spark that transformed 
                  mere sight into true vision.
                </p>
                <p className="text-slate-700">
                  This ancient mystery would echo through millennia, waiting for a digital age 
                  when data itself would face the same fractured fate.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">The Digital Discovery</h3>
              <p className="text-lg text-slate-600 mb-6">
                Gwylym Owen first noticed it during a late-night session with a particularly 
                stubborn healthcare dataset. The numbers were there—patient records, treatment 
                outcomes, demographic patterns—but something essential was missing. Not the data 
                itself, but the <em>soul</em> of the data.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                As he stared at his screen, the pulsing cursor seemed to echo the rhythm of 
                the ancient Eye of Horus—that eternal symbol watching over his work. "There 
                must be a way," he whispered to the glowing screens, "to capture the essence 
                without capturing the individual."
              </p>
              <p className="text-lg text-slate-600">
                In that moment, he understood: he was searching for the missing 1/64th—not 
                in ancient mythology, but in modern data science. The divine fraction that 
                would make datasets whole without compromising human privacy.
              </p>
            </div>
          </div>

          {/* The Synthetic Revelation */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-16">
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">The Synthetic Revelation</h3>
            </div>
            <p className="text-lg text-slate-600 mb-6">
              As dawn approached, the answer came not as a thunderbolt, but as a gentle 
              realization—like watching morning mist transform into dew. The missing fraction 
              wasn't lost; it was waiting to be <em>created</em>. Synthetic data: artificial 
              yet authentic, fabricated yet faithful to the underlying truths.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              This was digital alchemy of the highest order—transmuting raw data into golden 
              insights while leaving no trace of the original source. The patterns would live 
              on, but the people would remain forever protected.
            </p>
            <p className="text-lg text-slate-600">
              The missing 1/64th had been found at last—not as a fraction to be calculated, 
              but as magic to be conjured. The divine spark that transforms mere information 
              into true understanding.
            </p>
          </div>

          {/* Logo Design Philosophy */}
          <div className="bg-slate-50 p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <Logo className="h-12 w-12 mr-4" />
              <h3 className="text-2xl font-bold text-slate-900">The Logo: Eye of Horus Reborn</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Design Philosophy</h4>
                <p className="text-slate-600 mb-4">
                  Our logo is an abstracted Eye of Horus, reimagined for the digital age. 
                  Each element represents both the ancient fractions and modern data concepts:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• <strong>Main Eye Body (1/2):</strong> The foundation of all data</li>
                  <li>• <strong>Eyebrow (1/4):</strong> Vision and insight</li>
                  <li>• <strong>Vertical Mark (1/8):</strong> Cognitive processing</li>
                  <li>• <strong>Right Curve (1/16):</strong> Pattern recognition</li>
                  <li>• <strong>Left Curve (1/32):</strong> Data refinement</li>
                  <li>• <strong>Bottom Flourish (1/64):</strong> The human touch</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">The Pulsing Animation</h4>
                <p className="text-slate-600 mb-4">
                  The gentle pulse of our logo represents the heartbeat of synthetic data—
                  alive with possibility yet bound by protective enchantments. Each pulse 
                  symbolizes the continuous cycle of data generation, validation, and refinement.
                </p>
                <p className="text-slate-600">
                  The background circle's subtle animation represents the protective aura 
                  of privacy that surrounds all our synthetic data, ensuring that while 
                  insights flow freely, individual privacy remains inviolate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Building className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-slate-900">Our Mission Today</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                Auspexi delivers ethical AI-driven synthetic data for government and finance sectors, 
                processing 2M records/day through our revolutionary SDSP (Synthetic Data Service Platform). 
                Our client-driven feedback system enables model refinement at zero cost, empowering 
                organizations like MoD, NHS, and major banks.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                With advanced zk-SNARKs encryption and comprehensive compliance (UK GDPR, FCA/SEC, 
                ISO 27001, MoD JSP 440), we're positioned to capture significant market share in 
                the rapidly growing synthetic data industry.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">2M+</div>
                  <div className="text-sm text-slate-600">Records/Day</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">16</div>
                  <div className="text-sm text-slate-600">SDSP Suites</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">$500M</div>
                  <div className="text-sm text-slate-600">Market Size</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">Zero</div>
                  <div className="text-sm text-slate-600">Client Refinement Cost</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <blockquote className="text-lg text-slate-700 italic">
                "We're not just generating synthetic data—we're creating a new paradigm where 
                clients actively improve our models through feedback learning, training our 
                revolutionary self-improving AI system that continuously evolves and adapts."
              </blockquote>
              <footer className="mt-4 text-slate-600">
                — Gwylym Owen, Founder & CEO
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* SDSP Platform Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              SDSP Platform Innovation
            </h2>
            <p className="text-xl text-slate-600">
              Our Synthetic Data Service Platform revolutionizes how organizations access and refine synthetic data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">High-Volume Processing</h3>
              </div>
              <p className="text-slate-600 mb-4">
                SDSP Government and SDSP Finance each deliver 1M records/day with 18-field schemas 
                including credit_score, zk_proof, and comprehensive metadata.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Data Composition:</p>
                <p className="text-sm text-slate-600">43% real data + 57% synthetic AI generation</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Lock className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">zk-SNARKs Security</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Zero-knowledge proofs enable blind uploads with complete privacy protection, 
                ensuring compliance with MoD JSP 440, FCA/SEC, UK GDPR, and ISO 27001.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Compliance Standards:</p>
                <p className="text-sm text-slate-600">8+ regulatory frameworks supported</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Self-Improving AI</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Clients validate realism and refine models at zero cost, training our 
                advanced AI system that continuously learns and adapts.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-500 font-medium">Quality Metrics:</p>
                <p className="text-sm text-slate-600">Statistical validation & continuous improvement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Position & Growth */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Market Leadership & Growth
            </h2>
            <p className="text-xl text-slate-600">
              Positioned at the forefront of the synthetic data revolution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Current Market Position</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Market Size (2025):</span>
                  <span className="font-bold text-blue-600">$500M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Projected Growth (2030):</span>
                  <span className="font-bold text-green-600">$2-3B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">SDSP Processing:</span>
                  <span className="font-bold text-purple-600">2M records/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Client Refinement Cost:</span>
                  <span className="font-bold text-orange-600">Zero</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Differentiators</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-slate-600">Zero-cost client feedback learning system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-slate-600">zk-SNARKs for enterprise-grade privacy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-slate-600">Comprehensive regulatory compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-slate-600">High-volume processing (2M records/day)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-slate-600">Self-improving AI with autonomous learning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-xl text-slate-600">From vision to market leadership in synthetic data</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {/* 2025 - Foundation */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">SDSP Launch</h3>
                    <p className="text-slate-600 mb-2">Launched SDSP Government and Finance platforms with 2M records/day processing</p>
                    <div className="flex items-center justify-end text-sm text-blue-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>2025</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              {/* Q3 2025 - Expansion */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">SDSP Food & Supply Chain</h3>
                    <p className="text-slate-600 mb-2">Launch new vertical with specialized suites for food safety and supply chain optimization</p>
                    <div className="flex items-center text-sm text-purple-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Q3 2025</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Q2 2026 - Enterprise Scale */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Scale Platform</h3>
                    <p className="text-slate-600 mb-2">Advanced AI capabilities with global deployment and enterprise-grade SLA guarantees</p>
                    <div className="flex items-center justify-end text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>Q2 2026</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ethical AI Leadership</h3>
              <p className="text-slate-600">
                Every synthetic dataset is built with ethics as the fundamental principle, 
                ensuring comprehensive compliance while delivering transformative insights 
                through our innovative feedback learning system.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Client-Driven Innovation</h3>
              <p className="text-slate-600">
                Our zero-cost feedback system empowers clients to refine models, creating 
                a collaborative ecosystem that continuously improves synthetic data quality 
                while training our self-improving AI system.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Enterprise-Grade Security</h3>
              <p className="text-slate-600">
                zk-SNARKs encryption and comprehensive regulatory compliance ensure that 
                our synthetic data solutions meet the highest security standards across 
                government and finance sectors.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Market Transformation</h3>
              <p className="text-slate-600">
                Positioned to capture significant share of the $500M synthetic data market, 
                we're driving the industry toward a $2-3B future through technological 
                innovation and ethical practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Synthetic Data Revolution
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Partner with Auspexi to transform your data strategy with ethical, 
            high-quality synthetic data solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/data-suites"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Explore SDSP Platform
            </Link>
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

export default About;