import React from 'react';
import { Building2, Users2, Award, Rocket } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#252B42]">About Us</h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          We're dedicated to providing the best shopping experience with quality products and exceptional service.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 bg-[#F9F9F9] rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Building2 className="w-12 h-12 text-[#23A6F0] mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[#252B42]">Our Story</h3>
          <p className="text-gray-600">
            Founded in 2023, we've grown from a small startup to a trusted e-commerce platform,
            serving customers worldwide with a commitment to excellence.
          </p>
        </div>

        <div className="p-6 bg-[#F9F9F9] rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Users2 className="w-12 h-12 text-[#23856D] mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[#252B42]">Our Team</h3>
          <p className="text-gray-600">
            Our diverse team of experts works tirelessly to curate the best products
            and create an exceptional shopping experience for our customers.
          </p>
        </div>

        <div className="p-6 bg-[#F9F9F9] rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Award className="w-12 h-12 text-[#E77C40] mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[#252B42]">Quality First</h3>
          <p className="text-gray-600">
            We partner with trusted brands and suppliers to ensure every product
            meets our high standards of quality and value.
          </p>
        </div>

        <div className="p-6 bg-[#F9F9F9] rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Rocket className="w-12 h-12 text-[#23A6F0] mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[#252B42]">Innovation</h3>
          <p className="text-gray-600">
            We continuously improve our platform and services to provide
            a seamless and modern shopping experience.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-[#252B42]">Our Mission</h2>
        <p className="text-gray-600 text-lg">
          To provide our customers with an unparalleled shopping experience through
          quality products, competitive prices, and exceptional customer service.
          We strive to make online shopping accessible, enjoyable, and reliable for everyone.
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-[#F9F9F9] p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#252B42]">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <a
          href="mailto:contact@example.com"
          className="inline-block bg-[#23A6F0] text-white px-6 py-3 rounded-lg hover:bg-[#1a85c2] transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default AboutUsPage;
