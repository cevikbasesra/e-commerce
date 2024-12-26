import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/3 px-3 mb-6">
            {/* Social Media */}
            <h4 className="font-semibold mb-4">E-Commerce</h4>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, url: "#" },
                { icon: Twitter, url: "#" },
                { icon: Instagram, url: "#" },
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

          <div className="w-full md:w-1/3 px-3 mb-6">
            {/* Company Info */}
            <h4 className="font-semibold mb-4">Company Info</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Carrier", path: "/carrier" },
                { name: "We are hiring", path: "/careers" },
                { name: "Blog", path: "/blog" },
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
        </div>

        {/* Newsletter Section */}
        <div className="w-full rounded-lg p-6 md:p-8 mt-8">
          <div className="max-w-2xl mx-auto text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Get In Touch
            </h2>

            <div className="flex items-center max-w-md">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary border-r-0"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-r-lg hover:bg-primary-dark transition-colors border border-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 mt-8">
          {new Date().getFullYear()} E-Commerce. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
