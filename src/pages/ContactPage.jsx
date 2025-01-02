import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactPage = () => {
  const locations = [
    {
      city: 'Paris',
      address: '1901 Thorn ridge Cir.',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'Berlin',
      address: '4140 Parker Rd.',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'New York',
      address: '2715 Ash Dr. San Jose,',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'London',
      address: '3517 W. Gray St. Utica,',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Get Answers Section */}
      <div className="bg-white py-16 md:py-24">
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

      {/* Questions & Answers Section */}
      <div className="bg-[#FAFAFA] py-16 md:py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <img 
                src="/question.jpeg" 
                alt="Questions and Answers" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#252B42] mb-4">
                Questions & Answers
              </h2>
              <p className="text-gray-600 mb-6">
                Problems trying to resolve the conflict between the two major realms of Classical physics
              </p>
              <button className="text-[#23A6F0] font-bold hover:text-[#1a85c2]">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div 
        className="relative py-16 md:py-24 mt-16 text-white"
        style={{
          backgroundImage: 'url(/homepage-slider.optimized.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A7CC7]/90 to-[#1C3F6E]/90"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="md:flex md:justify-between">
            <div className="mb-12 md:mb-0 md:w-1/3">
              <h2 className="text-3xl font-bold mb-6">CONTACT US</h2>
              <p className="mb-6">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </p>
              <button className="bg-[#23A6F0] text-white px-6 py-2 rounded hover:bg-[#1a85c2] transition-colors">
                CONTACT US
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:w-2/3">
              {locations.map((location, index) => (
                <div key={index} className="mb-8 md:mb-0">
                  <h3 className="font-bold mb-4">{location.city}</h3>
                  <p className="mb-2">{location.address}</p>
                  <p className="mb-2">{location.zip}</p>
                  <p className="mb-2">Phone: {location.phone}</p>
                  <p>Fax: {location.fax}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Work With Us Section */}
      <div className="bg-[#2A7CC7] text-white py-16 md:py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-sm mb-4">WORK WITH US</h3>
              <h2 className="text-3xl font-bold mb-4">Now Let's grow Yours</h2>
              <p className="mb-4">
                The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
              </p>
              <button className="border-2 border-white text-white px-6 py-2 rounded hover:bg-white hover:text-[#2A7CC7] transition-colors">
                Button
              </button>
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <img 
                src="/grow.jpeg" 
                alt="Grow with us" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
