import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

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
    <header className="bg-gradient-to-r from-slate-900 to-blue-950 text-slate-100 shadow-md/30 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Shield className="h-8 w-8 text-yellow-400 mr-2" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">AethergenAI</h1>
            <p className="text-xs text-blue-200/90 italic">The Edge of Chaos and Order: Modular AI Training Pipeline</p>
            <p className="text-xs text-blue-300/90">Powered by AUSPEXI</p>
          </div>
        </div>
        
        <nav className="flex space-x-2 items-center">
          {privacy && (
            <div className="px-3 py-1.5 rounded-md bg-blue-800/60 text-sm border border-blue-700/40">
              ε {privacy.epsilon ?? '—'} • {privacy.synthetic_ratio ?? '—'}%
            </div>
          )}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'home' } }))}
            className="px-3 py-1.5 rounded-md bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 transition-colors"
          >Home</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'resources' } }))}
            className="px-3 py-1.5 rounded-md bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 transition-colors"
          >Resources</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'pricing' } }))}
            className="px-3 py-1.5 rounded-md bg-emerald-700/70 hover:bg-emerald-600/70 border border-emerald-600/50 transition-colors"
          >Pricing</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab: 'account' } }))}
            className="px-3 py-1.5 rounded-md bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 transition-colors"
          >Account</button>
          <a 
            href="https://auspexi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1.5 rounded-md bg-white/90 text-blue-900 hover:bg-white transition-colors font-medium"
          >
            AUSPEXI
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;