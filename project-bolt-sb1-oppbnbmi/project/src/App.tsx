import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import CVs from './pages/CVs';
import CoverLetter from './pages/CoverLetter';
import Projects from './pages/Projects';
import Creative from './pages/Creative';
import Whitepapers from './pages/Whitepapers';
import Contact from './pages/Contact';

// Component to handle scroll restoration and navigation fixes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // Clear any stored navigation state that might cause issues
    sessionStorage.removeItem('lastLocation');
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cvs" element={<CVs />} />
          <Route path="cover-letter" element={<CoverLetter />} />
          <Route path="projects" element={<Projects />} />
          <Route path="creative" element={<Creative />} />
          <Route path="whitepapers" element={<Whitepapers />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;