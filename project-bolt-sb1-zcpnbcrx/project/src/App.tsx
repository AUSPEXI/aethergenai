import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import MissingFraction from './pages/MissingFraction';
import DataSuites from './pages/DataSuites';
import Technology from './pages/Technology';
import Industries from './pages/Industries';
import CategorySubscription from './pages/CategorySubscription';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SubscriptionCancel from './pages/SubscriptionCancel';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Roadmap from './pages/Roadmap';
import PrivacyPolicy from './pages/PrivacyPolicy'; // New import
import TermsOfUse from './pages/TermsOfUse'; // New import
import Footer from './components/Footer'; // New import

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
            <Route path="/about/missing-fraction" element={<MissingFraction />} />
            <Route path="/data-suites" element={<DataSuites />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/subscriptions" element={<DataSuites />} />
            <Route path="/subscriptions/:categoryId" element={<CategorySubscription />} />
            <Route path="/subscriptions/success" element={<SubscriptionSuccess />} />
            <Route path="/subscriptions/cancel" element={<SubscriptionCancel />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} /> {/* New route */}
            <Route path="/terms" element={<TermsOfUse />} /> {/* New route */}
          </Routes>
        </div>
        <Footer /> {/* New Footer component */}
      </div>
    </Router>
  );
}

export default App;
