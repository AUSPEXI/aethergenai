import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FoundersStoryProps {
  onContact: () => void;
}

const FoundersStory: React.FC<FoundersStoryProps> = ({ onContact }) => {
  const [currentChapter, setCurrentChapter] = useState<number>(0);

  const storyChapters = [
    {
      title: "The Fall",
      subtitle: "25 Years, Then Everything Changed",
      description: "After a quarter-century relationship and business partnership ended, I needed time to rebuild. The universe had other plans.",
      image: "/images/founders-story/fall.jpg",
      icon: "💔",
      details: [
        "25-year relationship and business partnership ending",
        "Need for complete personal and professional reset",
        "Decision to step away and find myself again"
      ]
    },
    {
      title: "The Recovery",
      subtitle: "3 Years in Cairo, Finding Myself",
      description: "I moved to Cairo, Egypt for three years. Semi-retired, helping a Norwegian friend with digital marketing, and piecing back the parts of me I had compromised away.",
      image: "/images/founders-story/cairo.jpg",
      icon: "🌍",
      details: [
        "3 years living in Cairo, Egypt",
        "Semi-retired lifestyle in affordable country",
        "Helping Norwegian friend with digital marketing",
        "Personal healing and self-discovery journey"
      ]
    },
    {
      title: "The Descent",
      subtitle: "Love, Crypto, and Everything Lost",
      description: "I met my future wife and got engaged. Around the same time, I went crazy with crypto trading. When the market crashed, I tried to recoup losses with futures trading. In 3 days, I lost everything.",
      image: "/images/founders-story/crypto.jpg",
      icon: "📉",
      details: [
        "Meeting future wife and getting engaged",
        "Aggressive cryptocurrency trading strategy",
        "Market crash and temporary portfolio devastation",
        "Futures trading attempt to recoup losses",
        "Complete financial loss in just 3 days"
      ]
    },
    {
      title: "The Grind",
      subtitle: "10 Hours Gardening + 120 Hours Building",
      description: "I had just enough for a flight back to the UK. For over two years, I worked 10 hours a day gardening, then came home and worked on Auspexi for another 10+ hours. 120-hour weeks without complaint.",
      image: "/images/founders-story/gardening.jpg",
      icon: "🌱",
      details: [
        "Return to UK with only flight money left",
        "2+ years of 10-hour daily gardening work",
        "120-hour work weeks building Auspexi",
        "Physical transformation and mental toughness",
        "Facing injuries and pain without complaint"
      ]
    },
    {
      title: "The Rise",
      subtitle: "1 Billion Records, Global Leadership",
      description: "Today, I've given up gardening and am leading a tech revolution through synthetic data. I've invented 11 proprietary inventions and reinvented the wheel. Now it's time to get capital, support, customers, and show the world what I can do.",
      image: "/images/founders-story/success.jpg",
      icon: "🚀",
      details: [
        "1 BILLION synthetic records generated",
        "11 proprietary inventions developed",
        "Global leadership in synthetic data",
        "Ready for capital and expansion",
        "More revolutionary ideas in development"
      ]
    }
  ];

  const handleChapterChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentChapter < storyChapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else if (direction === 'prev' && currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const currentStory = storyChapters[currentChapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            THE FOUNDER'S STORY
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-gray-200">
            From 10-Hour Gardening Days to 1 Billion Synthetic Records
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The most unlikely tech success story in history. A 48-year-old autistic self-learner 
            who worked 120-hour weeks while gardening, building a company that would revolutionize synthetic data.
          </p>
        </motion.div>

        {/* Story Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-2 bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
            {storyChapters.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentChapter(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentChapter === index ? 'bg-blue-400 scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Current Chapter */}
        <motion.div
          key={currentChapter}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <div className="text-6xl mb-4">{currentStory.icon}</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
                  {currentStory.title}
                </h3>
                <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
                  {currentStory.subtitle}
                </h4>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  {currentStory.description}
                </p>
              </div>

              {/* Chapter Details */}
              <div className="space-y-3">
                {currentStory.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-gray-200">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Story Image */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{currentStory.icon}</div>
                    <p className="text-gray-300 text-lg">
                      {currentStory.title} - Chapter {currentChapter + 1}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center items-center space-x-6 mt-16"
        >
          <button
            onClick={() => handleChapterChange('prev')}
            disabled={currentChapter === 0}
            className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 ${
              currentChapter === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white border border-white/30 hover:scale-105'
            }`}
          >
            ← Previous Chapter
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">Chapter {currentChapter + 1} of {storyChapters.length}</p>
            <p className="text-white font-semibold">{currentStory.title}</p>
          </div>

          <button
            onClick={() => handleChapterChange('next')}
            disabled={currentChapter === storyChapters.length - 1}
            className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 ${
              currentChapter === storyChapters.length - 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white border border-white/30 hover:scale-105'
            }`}
          >
            Next Chapter →
          </button>
        </motion.div>

        {/* Key Facts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            The Numbers That Define This Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">25</div>
              <div className="text-lg font-semibold mb-2 text-white">Years Lost</div>
              <div className="text-sm text-gray-300">Relationship & partnership</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">3</div>
              <div className="text-lg font-semibold mb-2 text-white">Years in Cairo</div>
              <div className="text-sm text-gray-300">Healing & self-discovery</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">120</div>
              <div className="text-lg font-semibold mb-2 text-white">Hour Weeks</div>
              <div className="text-sm text-gray-300">Gardening + building</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">1B</div>
              <div className="text-lg font-semibold mb-2 text-white">Records Generated</div>
              <div className="text-sm text-gray-300">World record achievement</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl font-bold mb-8 text-white">
            Ready to Invest in This Story of Resilience?
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={onContact}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              📞 Contact the Founder
            </button>
            <button
              onClick={() => setCurrentChapter(4)}
              className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-lg border border-white/30 transition-all duration-300 hover:scale-105"
            >
              🚀 See the Results
            </button>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            This founder has proven they can survive ANYTHING • Ready to build a $500B+ company
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FoundersStory;
