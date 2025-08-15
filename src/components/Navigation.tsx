import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', tab: 'home' },
    { name: 'Press', tab: 'press' },
    { name: 'Resources', tab: 'resources' },
    { name: 'Pricing', tab: 'pricing' },
    { name: 'Account', tab: 'account' },
  ];

  const handleNavigation = (tab: string) => {
    window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab } }));
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <Logo className="h-12 w-12" />
              <span className="text-2xl font-bold text-slate-800">Auspexi</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.tab)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavigation('upload')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavigation(item.tab);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  handleNavigation('upload');
                  setIsOpen(false);
                }}
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
