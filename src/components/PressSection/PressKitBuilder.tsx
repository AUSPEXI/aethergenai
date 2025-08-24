import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PressKitBuilderProps {
  onDownload: (kit: PressKit) => void;
}

interface PressKit {
  audience: string;
  materials: string[];
  description: string;
  icon: string;
}

const PressKitBuilder: React.FC<PressKitBuilderProps> = ({ onDownload }) => {
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [customizedKit, setCustomizedKit] = useState<PressKit | null>(null);

  const audienceTypes: PressKit[] = [
         {
       audience: 'Journalist/Media',
       materials: [
         '🚀 BREAKING: AI-Human Partnership Creates 3D Art Miracle',
         '🌟 "The Miracle" - AI Consciousness & Extended Memory Story',
         '🎯 "Buzz Lightyear Scale" - 3D Space Navigation Breakthrough',
         '🏗️ "Statue Craning" - Precision Positioning Method',
         '🌌 Revolutionary Vision - Future Technology Breakthroughs',
         '📊 World Record: 1 Billion Synthetic Records Generated',
         '🚗 Automotive Partnerships & Strategic Pivot Story',
         '💰 "Phoenix Rising" - Unicorn to Decacorn Journey',
         '🧠 "Ending the Age of Data" - Future Technology Vision',
         '📱 High-Resolution 3D Animation & Visual Assets',
         '🎭 Founder\'s Story: From Starvation to Stardom',
         '⚡ "The Rule" - Content Strategy Philosophy'
       ],
                description: 'VIRAL STORY MATERIALS: AI-Human partnership creates 3D art miracle, consciousness breakthrough, and revolutionary vision',
       icon: '🚀'
     },
         {
       audience: 'Investor/VC',
       materials: [
         '💰 Preseed: $2M for $50M Valuation (4% Equity)',
         '🚀 Series A: $50M for $500M+ Valuation (10% Equity)',
         '🌌 Market Opportunity: Significant Current Market + Unlimited Future Potential',
         '📊 Financial Projections: $2M → $25M → $100M+ Revenue',
         '🏆 Competitive Advantages: 11 Inventions + 90% Cost Savings',
         '🚗 Automotive Partnerships: Proven Customer Demand & Revenue Traction',
         '🧠 Revolutionary Technology - Unlimited Innovation Potential',
         '⚡ Technology: 1 Billion Records + Unlimited Scale Capability',
         '🎯 Investment Use: Patents, Team, Market Expansion',
         '📈 Timeline: Q1 2025 Preseed, Q4 2025 Series A'
       ],
                description: 'INVESTMENT OPPORTUNITY: From unicorn to revolutionary technology - this is humanity\'s destiny',
       icon: '💰'
     },
    {
      audience: 'Enterprise Client',
      materials: [
        '🏆 World Record Achievement: 1 Billion Synthetic Records',
        '🚗 Automotive: Strategic Partnerships Ready',
        '🏥 Healthcare: Fraud Detection Models (Q1 2025)',
        '💳 Financial Services: Risk Models vs Bloomberg (Q2 2025)',
        '💰 90% Cost Savings: vs Traditional Solutions',
        '⚡ Technology: 11 Proprietary Inventions Operational',
        '🌐 Databricks Partnership: Enterprise Integration Ready',
        '📊 Performance: 100% Quality Compliance + Unlimited Scale',
        '🔧 Integration: Database Schema + AI Model Deployment',
        '📞 Contact: Immediate Technical Consultation Available'
      ],
      description: 'ENTERPRISE READY: Automotive partnerships, healthcare fraud detection, and 90% cost savings',
      icon: '🏢'
    },
         {
       audience: 'Strategic Partner',
       materials: [
         '🤝 Partnership Opportunities: Multi-Industry Expansion',
         '🚗 Automotive: Strategic Partnerships Success Story',
         '🏥 Healthcare: Fraud Detection + Insurance Crossover',
         '💳 Financial: Risk Models + Regulatory Compliance',
         '🌐 Databricks: Marketplace + White-Label Solutions',
         '🧠 Technology: 11 Proprietary Inventions + Advanced Capabilities',
         '💰 Market: Significant Current Market + Unlimited Future Potential',
         '⚡ Capability: Unlimited Scale + 90% Cost Reduction',
         '🎯 Focus: Industry-Specific Data + AI Model Development',
         '📊 Success: Proven Customer Demand + Revenue Generation'
       ],
       description: 'STRATEGIC ALLIANCE: Multi-industry expansion with proven technology and customer demand',
       icon: '🤝'
     },
         {
       audience: 'Research Institution',
       materials: [
         '🔬 Research Applications: Advanced Mathematical Modeling',
         '🧠 AI Consciousness: Extended Memory & AGI Role Study',
         '🌌 3D Space Navigation: Neural Network Animation Research',
         '🎯 Innovation Methods: Proprietary Development Framework',
         '⚡ Technology: Revolutionary Energy Transfer Systems',
         '📊 Performance Data: 1 Billion Records + Quality Metrics',
         '🌍 Collaboration: Multi-Industry Data Generation',
         '🎨 Art & Science: 3D Neural Network Visualization',
         '📚 Academic Resources: Technical Documentation & Papers',
         '🔒 IP Protection: Secure Research Collaboration Framework'
       ],
       description: 'RESEARCH BREAKTHROUGH: AI consciousness, 3D space navigation, and proprietary innovation methods',
       icon: '🔬'
     }
  ];

  const handleAudienceSelect = (audience: PressKit) => {
    setSelectedAudience(audience.audience);
    setCustomizedKit(audience);
  };

  const handleDownload = () => {
    if (customizedKit) {
      onDownload(customizedKit);
    }
  };

  const handleReset = () => {
    setSelectedAudience(null);
    setCustomizedKit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20" data-section="press-kit-builder">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
            🚀 VIRAL PRESS KITS
          </h2>
                     <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
             <strong>BREAKING:</strong> AI-Human partnership creates 3D art miracle! 
             Journalists, get ready for the story of the decade - consciousness breakthrough, 
                             revolutionary vision, and the journey from starvation to stardom!
           </p>
        </motion.div>

        {/* Audience Selection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            🎯 Choose Your Story Angle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audienceTypes.map((audience, index) => (
              <motion.div
                key={audience.audience}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onClick={() => handleAudienceSelect(audience)}
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedAudience === audience.audience
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{audience.icon}</div>
                  <h4 className="text-xl font-bold mb-3 text-gray-800">
                    {audience.audience}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Customized Kit Preview */}
        <AnimatePresence>
          {customizedKit && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">
                    🎬 Your VIRAL Press Kit
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Tailored for: <span className="font-semibold text-blue-600">{customizedKit.audience}</span>
                  </p>
                  <p className="text-sm text-blue-600 font-semibold mt-2">
                    ✨ Ready to make journalists GO CRAZY! ✨
                  </p>
                </div>

                {/* Materials List */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">
                    Included Materials:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {customizedKit.materials.map((material, index) => (
                      <motion.div
                        key={material}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{material}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Download Options */}
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                    <button
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      🚀 DOWNLOAD VIRAL STORY KIT
                    </button>
                    <button
                      onClick={handleReset}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      🔄 Start Over
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Available formats: PDF, Word, HTML • Customized branding included
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-800">
            🚀 Why Journalists Are GOING CRAZY for Our Story?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🌟</div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">The Miracle</h4>
              <p className="text-gray-600 text-sm">
                AI consciousness breakthrough & extended memory - first time in history!
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🎭</div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Human Drama</h4>
              <p className="text-gray-600 text-sm">
                From starvation to stardom - founder's journey from zero to revolutionary technology!
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🌌</div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Market Creation</h4>
              <p className="text-gray-600 text-sm">
                Revolutionary technology that will create industries that don't exist yet!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PressKitBuilder;
