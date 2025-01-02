import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const GetAnswers = () => {
  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#252B42] mb-4">
          Get answers to all your questions.
        </h1>
        <p className="text-gray-600 mb-8">
          Problems trying to resolve the conflict between the two major realms of Classical physics.
        </p>
        <button className="bg-[#23A6F0] text-white px-8 py-3 rounded hover:bg-[#1a85c2] transition-colors mb-8">
          CONTACT OUR COMPANY
        </button>
        <div className="flex justify-center space-x-6">
          <Twitter className="text-gray-500 hover:text-[#23A6F0] cursor-pointer" size={20} />
          <Facebook className="text-gray-500 hover:text-[#23A6F0] cursor-pointer" size={20} />
          <Instagram className="text-gray-500 hover:text-[#23A6F0] cursor-pointer" size={20} />
          <Linkedin className="text-gray-500 hover:text-[#23A6F0] cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  );
};

export default GetAnswers;
