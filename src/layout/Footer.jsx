import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-8 text-gray-800">
      {/* Brand and Social with Background */}
      <div className="bg-[#F9F9F9] mb-12">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 py-10 md:border-b md:border-gray-200">
            <h3 className="text-2xl font-bold">E-commerce</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-[#23A6F0] hover:opacity-80">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-[#23A6F0] hover:opacity-80">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-[#23A6F0] hover:opacity-80">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Company Info</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/carrier"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Carrier
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-600 hover:text-gray-900"
                >
                  We are hiring
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/carrier"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Carrier
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-600 hover:text-gray-900"
                >
                  We are hiring
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Features</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/marketing"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Business Marketing
                </a>
              </li>
              <li>
                <a
                  href="/analytics"
                  className="text-gray-600 hover:text-gray-900"
                >
                  User Analytic
                </a>
              </li>
              <li>
                <a href="/chat" className="text-gray-600 hover:text-gray-900">
                  Live Chat
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Unlimited Support
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="/ios" className="text-gray-600 hover:text-gray-900">
                  IOS & Android
                </a>
              </li>
              <li>
                <a href="/demo" className="text-gray-600 hover:text-gray-900">
                  Watch a Demo
                </a>
              </li>
              <li>
                <a
                  href="/customers"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Customers
                </a>
              </li>
              <li>
                <a href="/api" className="text-gray-600 hover:text-gray-900">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-grow min-w-0 px-4 py-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-[#F9F9F9] placeholder-gray-500 border-r-0"
                />
                <button className="bg-[#23A6F0] text-white px-4 py-4 rounded-r-lg hover:opacity-90 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-500 text-sm">Lore imp sum dolor Amit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section with Full Width Background */}
      <div className="bg-[#F9F9F9] mt-20 py-8">
        <div className="container mx-auto px-8">
          <div className="text-sm text-gray-500 text-center space-y-2">
            Made With Love By Finland<br />
            All Right Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
