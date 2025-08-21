import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Award, Rocket, Brain, Eye, User } from 'lucide-react';
import Logo from './Logo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Account', href: '/account', current: location.pathname === '/account' },
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Technology', href: '/technology', current: location.pathname === '/technology' },
    { name: 'Roadmap', href: '/roadmap', current: location.pathname === '/roadmap' },
    { name: 'Pricing', href: '/pricing', current: location.pathname === '/pricing' },
    { name: 'Funding', href: '/funding', current: location.pathname === '/funding' },
    { name: 'Blog', href: '/blog', current: location.pathname === '/blog' },
    { name: 'Resources', href: '/resources', current: location.pathname === '/resources' },
    { name: 'Press', href: '/press', current: location.pathname === '/press' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' }
  ];

  // Technology dropdown removed - now single page with sections

  // About dropdown removed - now single page with tabs

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-8" />
              <span className={`ml-2 text-xl font-bold ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}>
                Auspexi
              </span>
            </Link>
          </div>

          {/* Hamburger Menu - Moved to right side */}
          <div className="hidden md:block relative">
            <button
              onMouseEnter={() => setIsOpen(true)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                isScrolled
                  ? 'text-slate-700 hover:text-blue-600'
                  : 'text-white hover:text-blue-300'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Dropdown Menu - Positioned directly under hamburger button */}
            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 transition-all duration-200 ${
              isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
              <div className="py-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors ${
                      isActive(item.href) ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onMouseEnter={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                isScrolled
                  ? 'text-slate-700 hover:text-blue-600'
                  : 'text-white hover:text-blue-300'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only for mobile devices */}
      <div className={`md:hidden transition-all duration-300 ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="bg-white shadow-lg border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;