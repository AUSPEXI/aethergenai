import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Bio */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Gwylym Pryce-Owen</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Creative technologist with 20 years of experience taming chaos into clarity 
              through innovative AI solutions and artistic expression.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Explore</h4>
            <div className="space-y-2 text-sm">
              <Link to="/cvs" className="text-blue-100 hover:text-white transition-colors block">
                Professional CVs
              </Link>
              <Link to="/projects" className="text-blue-100 hover:text-white transition-colors block">
                AI & Data Projects
              </Link>
              <Link to="/creative" className="text-blue-100 hover:text-white transition-colors block">
                Creative Works
              </Link>
              <Link to="/whitepapers" className="text-blue-100 hover:text-white transition-colors block">
                Technical Whitepapers
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="mailto:hopiumcalculator@gmail.com" 
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Email Gwylym Pryce-Owen"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/gwylym" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/gwylym" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-blue-200 text-xs">
              Specialized in synthetic data solutions targeting the $2-3B market
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-500 text-center">
          <p className="text-blue-200 text-sm">
            © 2025 Gwylym Pryce-Owen. Crafted with precision and creativity.
          </p>
        </div>
      </div>
    </footer>
  );
}