import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div 
      className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100"
      style={{ margin: 0, padding: 0 }}
    >
      <Header />
      <main 
        className="flex-grow container mx-auto px-4 py-8"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
