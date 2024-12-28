import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const Layout = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow transition-all duration-300 ${isMenuOpen ? 'mt-[500px]' : 'mt-16'} md:mt-20`}>
        <div className="container mx-auto px-4 py-6 md:py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
