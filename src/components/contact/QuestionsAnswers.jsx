import React from 'react';

const QuestionsAnswers = () => {
  return (
    <div className="bg-[#FAFAFA] py-16 md:py-24 mt-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img 
              src="question.jpeg" 
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
  );
};

export default QuestionsAnswers;
