import React from 'react';

const WorkWithUs = () => {
  return (
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
              src="grow.jpeg" 
              alt="Grow with us" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
