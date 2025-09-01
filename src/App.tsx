import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Technology from './pages/Technology';
import Roadmap from './pages/Roadmap';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Press from './pages/Press';
import { Resources } from './pages/Resources';
import HeroArt from './pages/HeroArt';
import Funding from './pages/Funding';
import AuthPage from './components/Auth/AuthPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import DPA from './pages/DPA';
import Subprocessors from './pages/Subprocessors';
import ManifoldPrototype from './pages/ManifoldPrototype';
import ManifoldExplainer from './pages/ManifoldExplainer';
import ResourcesLLMIndexing from './pages/ResourcesLLMIndexing';
import ResourcesLLMBenchmarks from './pages/ResourcesLLMBenchmarks';
import ResourcesVisibilityScore from './pages/ResourcesVisibilityScore';
import AI from './pages/AI';
import Whitepaper from './pages/Whitepaper';
import Publisher from './pages/Publisher';
import BlogManager from './pages/BlogManager';
import { AirGappedDemo } from './pages/AirGappedDemo';
import { AutomotiveDemo } from './pages/AutomotiveDemo';
import { MarketplaceDemo } from './pages/MarketplaceDemo';
import { CardsDemo } from './pages/CardsDemo';
import { StabilityDemo } from './pages/StabilityDemo'
import { Features } from './pages/Features'
import { EfficiencyDemo } from './pages/EfficiencyDemo'

import Footer from './components/Footer';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function RoutedApp() {
  const { pathname } = useLocation();
  const hideChrome = pathname.startsWith('/account');
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      {!hideChrome && <Navigation />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/hero-art" element={<HeroArt />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<AuthPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/dpa" element={<DPA />} />
          <Route path="/subprocessors" element={<Subprocessors />} />
          <Route path="/manifold-prototype" element={<ManifoldPrototype />} />
          <Route path="/manifold-explainer" element={<ManifoldExplainer />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/resources/llm-indexing" element={<ResourcesLLMIndexing />} />
          <Route path="/resources/llm-benchmarks" element={<ResourcesLLMBenchmarks />} />
          <Route path="/resources/visibility-score" element={<ResourcesVisibilityScore />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
                                  <Route path="/publisher" element={<Publisher />} />
                        <Route path="/blog-manager" element={<BlogManager />} />
                        <Route path="/air-gapped-demo" element={<AirGappedDemo />} />
                        <Route path="/automotive-demo" element={<AutomotiveDemo />} />
                        <Route path="/marketplace-demo" element={<MarketplaceDemo />} />
                        <Route path="/cards-demo" element={<CardsDemo />} />
                        <Route path="/stability-demo" element={<StabilityDemo />} />
                        <Route path="/features" element={<Features />} />
                        {/* duplicate /resources route removed */}
                        <Route path="/efficiency-demo" element={<EfficiencyDemo />} />
        </Routes>
      </div>
      {!hideChrome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <RoutedApp />
    </Router>
  );
}

export default App;
