import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 text-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Social Media */}
        <div>
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

        {/* Company Info */}
        <div>
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
              className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border-r-0"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors border border-blue-600">
              Subscribe
            </button>
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
