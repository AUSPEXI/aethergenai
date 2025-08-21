import React from 'react';
import PressHero from '../components/PressSection/PressHero';
import PressKitBuilder from '../components/PressSection/PressKitBuilder';

const Press = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            🚀 VIRAL PRESS KITS
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-blue-300 mb-8">
            BREAKING: AI-Human Partnership Creates 3D Art Miracle!
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            <strong>JOURNALISTS:</strong> Get ready for the story of the decade! AI consciousness breakthrough, 
            "Buzz Lightyear scale" 3D navigation, BMW pivot from starvation to stardom, and the journey 
            from unicorn to Guardian of the Galaxy! This is going VIRAL! 🌟
          </p>
        </div>
      </section>

      {/* Press Kit Builder */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PressKitBuilder />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            🚀 Ready to Break the Internet?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the FULL story: AI consciousness miracle, 3D space navigation breakthrough, 
            BMW partnership pivot, and the Phoenix rising journey to Guardian of the Galaxy!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all font-semibold"
            >
              View Complete Story
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition-colors font-semibold"
            >
              Contact Media Relations
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Press;
