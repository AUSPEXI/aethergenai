import React from 'react';
import PressHero from '../components/PressSection/PressHero';
import PressKitBuilder from '../components/PressSection/PressKitBuilder';
import MediaGallery from '../components/PressSection/MediaGallery';

const Press = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Press Materials
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-blue-300 mb-6">
            The AI‑Human Collaboration Story & Billion‑Scale Achievement
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-3">
            We're honest enough to say we may not be the only ones when we aren't, and confident enough to say so when we are—after verifying through scientific rigor.
          </p>
          <p className="text-lg text-blue-200 leading-relaxed">
            Materials here focus on verified achievements and human‑interest narrative. No proprietary algorithms, formulas, or implementation details are disclosed.
          </p>
        </div>
      </section>

      {/* Press Kit Builder */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PressKitBuilder />
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MediaGallery />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Request Interviews or Additional Materials
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore the world‑record milestone and the AI‑human collaboration narrative. We share verified results and keep intellectual property protected.
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
