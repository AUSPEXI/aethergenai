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
import Resources from './pages/Resources';
import HeroArt from './pages/HeroArt';
import Funding from './pages/Funding';
import AuthPage from './components/Auth/AuthPage';

import Footer from './components/Footer';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <ScrollToTop />
        <Navigation />
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
