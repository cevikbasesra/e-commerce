import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        {/* pt-16/pt-20 to account for fixed header height */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
