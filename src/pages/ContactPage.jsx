import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Address',
      details: ['16 Fulton Street', 'New York, NY 10010']
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: ['+1 (234) 567-89-00', '+1 (234) 567-89-01']
    },
    {
      icon: <Clock size={24} />,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 - 18:00', 'Sat - Sun: 11:00 - 17:00']
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: ['contact@example.com', 'support@example.com']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#F9F9F9] py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#252B42] text-center mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Get in touch with us for any questions about our products or services.
          </p>
        </div>
      </div>

      {/* Contact Information Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-[#F9F9F9] p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-[#23A6F0] mb-4 flex justify-center">
                {info.icon}
              </div>
              <h3 className="text-lg font-bold text-[#252B42] mb-2">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-[#F9F9F9] p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-[#252B42] text-center mb-8">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#23A6F0] focus:border-[#23A6F0]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#23A6F0] focus:border-[#23A6F0]"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#23A6F0] focus:border-[#23A6F0]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#23A6F0] focus:border-[#23A6F0]"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#23A6F0] text-white px-8 py-3 rounded-lg hover:bg-[#1a85c2] transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[400px] w-full bg-gray-200 mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2str!4v1672913457200!5m2!1sen!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
