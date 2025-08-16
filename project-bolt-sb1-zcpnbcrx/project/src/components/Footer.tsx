import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-4">Auspexi</h3>
          <p className="text-blue-100 mb-4">
            Leading ethical synthetic data with SDSP platforms delivering 1M records/day 
            with zk-SNARKs security and client-driven feedback learning.
          </p>
          <div className="text-blue-200 text-sm">
            <p>123 Data Lane, London EC1A 1AA, UK</p>
            <p>+44 20 7946 0958</p>
            <p>info@auspexi.com</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-blue-200 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/data-suites" className="text-blue-200 hover:text-white transition-colors">
                Data Suites
              </Link>
            </li>
            <li>
              <Link to="/technology" className="text-blue-200 hover:text-white transition-colors">
                Technology
              </Link>
            </li>
            <li>
              <Link to="/roadmap" className="text-blue-200 hover:text-white transition-colors">
                Roadmap
              </Link>
            </li>
            <li>
              <Link to="/case-studies" className="text-blue-200 hover:text-white transition-colors">
                Case Studies
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal & Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-blue-200 hover:text-white transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <a 
                href="https://resources.auspexi.com/transparency-report.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Transparency Report
              </a>
            </li>
            <li>
              <a 
                href="https://resources.auspexi.com/api-documentation.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                API Documentation
              </a>
            </li>
            <li>
              <a 
                href="https://databricks.com/marketplace" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Databricks Marketplace
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-800 mt-8 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-blue-200 text-sm mb-4 md:mb-0">
            © 2025 Auspexi Ltd. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://government.auspexi.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors text-sm"
            >
              SDSP Government
            </a>
            <a 
              href="https://meek-stardust-2d15b1.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors text-sm"
            >
              SDSP Finance
            </a>
            <Link to="/contact" className="text-blue-200 hover:text-white transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;