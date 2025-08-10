import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div 
      className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100"
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
