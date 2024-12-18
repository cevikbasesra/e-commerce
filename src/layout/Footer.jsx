import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 text-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">E-Commerce</h3>
          <p className="text-sm text-gray-600">
            Your one-stop shop for the latest fashion and trends.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/products' },
              { name: 'About Us', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <li key={link.path}>
                <a 
                  href={link.path} 
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            {[
              { icon: Facebook, url: '#' },
              { icon: Twitter, url: '#' },
              { icon: Instagram, url: '#' },
              { icon: Linkedin, url: '#' }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-colors"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-600 mt-8">
        {new Date().getFullYear()} E-Commerce. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
