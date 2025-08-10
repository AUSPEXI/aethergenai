import React, { useEffect, useState } from 'react';
import { Shield, Lock, Brain } from 'lucide-react';

const Header: React.FC = () => {
  const [privacy, setPrivacy] = useState<{ epsilon?: number; synthetic_ratio?: number } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { epsilon?: number; synthetic_ratio?: number };
      setPrivacy(detail);
    };
    window.addEventListener('aethergen:apply-privacy', handler as EventListener);
    return () => window.removeEventListener('aethergen:apply-privacy', handler as EventListener);
  }, []);

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Shield className="h-8 w-8 text-yellow-400 mr-2" />
          <div>
            <h1 className="text-xl font-bold">AethergenAI</h1>
            <p className="text-xs text-blue-200 italic">The Edge of Chaos and Order: Modular AI Training Pipeline</p>
            <p className="text-xs text-blue-300">Powered by AUSPEXI</p>
          </div>
        </div>
        
        <nav className="flex space-x-2 items-center">
          <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-700">
            <Lock className="h-4 w-4" />
            <span className="text-sm">FCA/SEC Compliant</span>
          </div>
          {privacy && (
            <div className="px-3 py-2 rounded-md bg-blue-700 text-sm">
              ε {privacy.epsilon ?? '—'} • {privacy.synthetic_ratio ?? '—'}%
            </div>
          )}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-700">
            <Brain className="h-4 w-4" />
            <span className="text-sm">AI Enhanced</span>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'home' } }))}
            className="px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
          >Home</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'resources' } }))}
            className="px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
          >Resources</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'pricing' } }))}
            className="px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
          >Pricing</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'account' } }))}
            className="px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
          >Account</button>
          <a 
            href="https://github.com/AUSPEXI/aethergenai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 rounded-md bg-yellow-500 text-blue-800 hover:bg-yellow-400 transition-colors font-medium"
          >
            GitHub
          </a>
          <a 
            href="https://auspexi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 rounded-md bg-white text-blue-800 hover:bg-gray-100 transition-colors font-medium"
          >
            AUSPEXI
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;