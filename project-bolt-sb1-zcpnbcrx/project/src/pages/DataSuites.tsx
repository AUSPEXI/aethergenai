import React, { useState } from 'react';
import { Activity, Shield, Target, Flame, Siren, RotateCcw, FileText, Lock, Plus, ArrowRight, CheckCircle, ExternalLink, Scissors, Search, ChevronDown, Calendar, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubscriptionForm from '../components/SubscriptionForm';
import { getAllCategories, getCategoryConfig } from '../services/subscriptionManager';

const DataSuites = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);

  const suiteIcons = {
    CHANGES: Activity,
    POISON: Shield,
    STRIVE: Target,
    HYDRA: Flame,
    SIREN: Siren,
    REFORM: RotateCcw,
    INSURE: FileText,
    SHIELD: Lock,
    THREAD: Scissors,
    // Finance suites
    CREDRISE: TrendingUp,
    TRADEMARKET: ArrowRight,
    CASHFLOW: FileText,
    CONSUME: Users,
    TAXGUARD: Shield,
    RISKSHIELD: Target,
    // Manufacturing suites (future)
    FORGE: Flame,
    ASSEMBLY: Plus,
    QUALITY: CheckCircle,
    SUPPLY: ArrowRight,
    MAINTAIN: RotateCcw,
    ENERGY: Flame,
    SAFETY: Shield
  };

  const suiteDescriptions = {
    CHANGES: 'Healthcare epidemiological simulations with AI narratives',
    POISON: 'Policing sentiment and optimization data',
    STRIVE: 'Military strategic simulations and intelligence',
    HYDRA: 'Fire service risk modeling and response',
    SIREN: 'EMS response optimization and outcomes',
    REFORM: 'Prison rehabilitation metrics and analytics',
    INSURE: 'Cross-sector insurance risk evaluation',
    SHIELD: 'Cybersecurity insurance threat modeling',
    THREAD: 'Fashion manufacturing and sustainability analytics',
    // Finance suites
    CREDRISE: 'Credit scoring and risk assessment analytics',
    TRADEMARKET: 'Trading algorithms and market prediction',
    CASHFLOW: 'Cash flow prediction and management',
    CONSUME: 'Consumer behavior and spending analytics',
    TAXGUARD: 'Tax compliance and optimization',
    RISKSHIELD: 'Financial risk assessment and modeling',
    // Manufacturing suites (future)
    FORGE: 'Production line optimization and control',
    ASSEMBLY: 'Assembly line efficiency and quality',
    QUALITY: 'Quality control and defect prediction',
    SUPPLY: 'Supply chain optimization and logistics',
    MAINTAIN: 'Predictive maintenance and equipment lifecycle',
    ENERGY: 'Energy consumption and efficiency optimization',
    SAFETY: 'Industrial safety and risk management'
  };

  const categories = getAllCategories().map(categoryName => {
    const config = getCategoryConfig(categoryName);
    if (!config) return null;

    return {
      id: categoryName.toLowerCase(),
      name: categoryName,
      price: config.premium,
      icon: categoryName === 'Government' ? Shield : 
            categoryName === 'Finance' ? TrendingUp : 
            categoryName === 'Manufacturing' ? Plus : Shield,
      description: config.description,
      keywords: categoryName.toLowerCase().split(' '),
      available: config.available,
      suites: config.suites.map(suiteName => ({
        name: suiteName,
        fullName: suiteName,
        icon: suiteIcons[suiteName as keyof typeof suiteIcons] || Shield,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        description: suiteDescriptions[suiteName as keyof typeof suiteDescriptions] || 'Advanced synthetic data suite'
      })),
      timeline: config.available ? 'Available Now' : 
                categoryName === 'Finance' ? 'Available Now' : 
                categoryName === 'Manufacturing' ? '2026' : 'Coming Soon',
      addons: {
        core: config.addons.core.length,
        premium: config.addons.premium.length,
        total: config.addons.core.length + config.addons.premium.length
      },
      appUrl: categoryName === 'Government' ? 'https://government.auspexi.com' :
               categoryName === 'Finance' ? 'https://meek-stardust-2d15b1.netlify.app/' : null,
      recordsPerDay: categoryName === 'Government' || categoryName === 'Finance' ? '1M' : 'to be announced',
      recordsPerSuite: categoryName === 'Government' || categoryName === 'Finance' ? '125k' : 'to be announced'
    };
  }).filter(Boolean);

  const filteredCategories = categories.filter(category =>
    category && (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const metrics = [
    { value: '2M+', label: 'Records/Day Total', icon: Users },
    { value: '99%', label: 'Privacy Compliance', icon: Shield },
    { value: '36M+', label: 'Datapoints/Day', icon: TrendingUp },
    { value: '18', label: 'Fields/Record', icon: CheckCircle }
  ];

  if (showSubscriptionForm) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setShowSubscriptionForm(false)}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Categories
            </button>
          </div>
        </div>

        <SubscriptionForm selectedCategory={selectedCategory} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Data Suites & Subscriptions
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Specialized synthetic datasets organized by industry category, 
            each designed with precision and powered by advanced AI algorithms
          </p>
          <p className="text-lg text-blue-200">
            Select a category below to explore suites and subscription options
          </p>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <metric.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Choose Your Industry Category
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Our suites are organized by industry for maximum synergy and value
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories (e.g., healthcare, finance...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-white border-2 rounded-xl p-8 transition-all duration-300 ${
                  category.available 
                    ? 'border-slate-200 hover:shadow-lg hover:border-blue-300 cursor-pointer' 
                    : 'border-slate-100 opacity-75'
                }`}
              >
                <div className="flex items-center mb-6">
                  <category.icon className={`h-10 w-10 mr-4 ${category.available ? 'text-blue-600' : 'text-slate-400'}`} />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{category.name}</h3>
                    <p className={`font-medium ${category.available ? 'text-blue-600' : 'text-slate-500'}`}>
                      {category.available ? `From $${category.price}/month` : category.timeline}
                    </p>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-6">{category.description}</p>
                
                {/* Processing Stats */}
                {category.available && (
                  <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">Processing Volume</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{category.recordsPerDay}</div>
                        <div className="text-slate-600">Records/Day</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{category.recordsPerSuite}</div>
                        <div className="text-slate-600">Per Suite/Day</div>
                      </div>
                    </div>
                    <div className="text-center mt-2 pt-2 border-t border-blue-200">
                      <div className="text-sm text-slate-500">
                        18M datapoints/day ({category.recordsPerDay} × 18 fields)
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Included Suites ({category.suites.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.suites.slice(0, 6).map((suite, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-600">
                        <suite.icon className={`h-4 w-4 mr-2 ${category.available ? suite.color : 'text-slate-400'}`} />
                        {suite.name}
                      </div>
                    ))}
                    {category.suites.length > 6 && (
                      <div className="text-sm text-slate-500 col-span-2">
                        +{category.suites.length - 6} more suites
                      </div>
                    )}
                  </div>
                </div>

                {/* Add-on Summary */}
                <div className="mb-6 bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-2">Add-on System</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{category.addons.core}</div>
                      <div className="text-slate-600">Core (Bundled)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{category.addons.premium}</div>
                      <div className="text-slate-600">Premium (Optional)</div>
                    </div>
                  </div>
                  <div className="text-center mt-2 pt-2 border-t border-slate-200">
                    <div className="text-sm text-slate-500">
                      Total: {category.addons.total} add-ons per suite
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {category.available ? (
                    <>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setShowSubscriptionForm(true);
                        }}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
                      >
                        Subscribe to {category.name}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                      {category.appUrl && (
                        <a
                          href={category.appUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center text-sm"
                        >
                          View Live App
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </>
                  ) : (
                    <div className="w-full bg-slate-200 text-slate-500 py-3 px-6 rounded-lg font-semibold text-center flex items-center justify-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      {category.timeline}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Option */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Enterprise Cross-Category</h3>
              <p className="text-purple-600 font-medium text-xl mb-4">$1,500/month</p>
              <p className="text-slate-600 mb-6">
                Complete access to all available categories and future expansions with all add-ons included. 
                Perfect for large organizations needing comprehensive synthetic data across multiple industries.
              </p>
              <div className="bg-white p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">Enterprise Includes:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-lg font-bold text-green-600">32</div>
                    <div className="text-slate-600">Core Add-ons (8 suites × 4)</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">32</div>
                    <div className="text-slate-600">Premium Add-ons (8 suites × 4)</div>
                  </div>
                </div>
                <div className="text-center mt-2 pt-2 border-t border-slate-200">
                  <div className="text-sm text-slate-500">
                    Total: 128 add-ons across Government & Finance categories
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('Enterprise');
                  setShowSubscriptionForm(true);
                }}
                className="inline-flex items-center bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Subscribe to Enterprise
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demos Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Experience Our Technology
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            See our synthetic data generation in action with live demonstrations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 shadow-md">
              <div className="flex items-center justify-center mb-6">
                <Activity className="h-12 w-12 text-red-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">SDSP Government</h3>
                  <p className="text-slate-600">Healthcare, defense, and public safety</p>
                </div>
              </div>
              <a
                href="https://government.auspexi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                View Government Suite
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 shadow-md">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="h-12 w-12 text-green-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">SDSP Finance</h3>
                  <p className="text-slate-600">Banking, trading, and risk management</p>
                </div>
              </div>
              <a
                href="https://meek-stardust-2d15b1.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                View Finance Suite
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 mt-6">
            Experience the full pipeline with 2M+ synthetic records generated daily
          </p>
        </div>
      </section>

      {/* Why Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Why Category-Based Organization?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Our suites work together like an orchestra within each industry category
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-blue-50">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Industry Synergy</h3>
              <p className="text-slate-600">Suites within each category complement each other for maximum value</p>
            </div>
            <div className="p-6 rounded-xl bg-green-50">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Focused Solutions</h3>
              <p className="text-slate-600">Choose the category that matches your industry needs</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Scalable Growth</h3>
              <p className="text-slate-600">Add new categories as your organization expands</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your industry category and explore our subscription options
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Browse Categories
            </button>
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

export default DataSuites;