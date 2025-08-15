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
        'Press Release',
        'Company Fact Sheet',
        'Executive Bio',
        'Technical Overview',
        'Media Q&A',
        'High-Resolution Assets'
      ],
      description: 'Complete materials for journalists covering the world record achievement',
      icon: '📰'
    },
    {
      audience: 'Investor/VC',
      materials: [
        'Company Fact Sheet',
        'Executive Bio',
        'Technical Overview',
        'Market Analysis',
        'Financial Projections',
        'Investment Summary'
      ],
      description: 'Business-focused materials for investors and venture capitalists',
      icon: '💰'
    },
    {
      audience: 'Enterprise Client',
      materials: [
        'Technical Overview',
        'Company Fact Sheet',
        'Case Studies',
        'Integration Guide',
        'Performance Benchmarks',
        'Contact Information'
      ],
      description: 'Technical and business materials for enterprise prospects',
      icon: '🏢'
    },
    {
      audience: 'Strategic Partner',
      materials: [
        'Company Fact Sheet',
        'Technical Overview',
        'Partnership Opportunities',
        'Market Position',
        'Collaboration Framework',
        'Contact Information'
      ],
      description: 'Partnership-focused materials for potential collaborators',
      icon: '🤝'
    },
    {
      audience: 'Research Institution',
      materials: [
        'Technical Overview',
        'Research Applications',
        'Performance Data',
        'Collaboration Opportunities',
        'Academic Resources',
        'Contact Information'
      ],
      description: 'Research and academic materials for institutions and universities',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
            Press Kit Builder
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Customize your press materials by selecting your audience type. 
            Get tailored content designed specifically for your needs.
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
            Select Your Audience Type
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
                    Your Customized Press Kit
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Tailored for: <span className="font-semibold text-blue-600">{customizedKit.audience}</span>
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
                      📥 Download Complete Kit
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
            Why Use Our Press Kit Builder?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Audience-Specific</h4>
              <p className="text-gray-600 text-sm">
                Materials tailored specifically for your role and needs
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Instant Access</h4>
              <p className="text-gray-600 text-sm">
                Download complete press kits in multiple formats
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🏆</div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Professional Quality</h4>
              <p className="text-gray-600 text-sm">
                Enterprise-grade materials befitting our global leadership
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PressKitBuilder;
