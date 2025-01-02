import React from 'react';
import { PlayCircle, Linkedin, Github, Mail } from 'lucide-react';
import WorkWithUs from '../components/contact/WorkWithUs';

const TeamMember = ({ name, role, image, linkedin, github, email }) => {
  const avatarUrl = image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(name)}`;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-48 h-48 md:w-56 md:h-56 mb-4 overflow-hidden">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-[#252B42] mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-3">{role}</p>
      <div className="flex space-x-4">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A66C2] hover:text-[#1a85c2] transition-colors"
          >
            <Linkedin size={20} />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#333] hover:text-[#23A6F0] transition-colors"
          >
            <Github size={20} />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-[#E77C40] hover:text-[#23A6F0] transition-colors"
          >
            <Mail size={20} />
          </a>
        )}
      </div>
    </div>
  );
};

const Logo = ({ company, name }) => {
  // Increased size parameter to 256px for higher resolution
  const logoUrl = `https://logo.clearbit.com/${company}.com?size=256`;
  
  return (
    <div className="w-48 h-24 flex items-center justify-center p-4"> {/* Increased container size */}
      <div className="opacity-60 hover:opacity-100 transition-opacity duration-300 w-full h-full">
        <img 
          src={logoUrl} 
          alt={name}
          className="w-full h-full object-contain" /* Changed to full width/height with object-contain */
          onError={(e) => {
            e.target.src = `https://logo.clearbit.com/${company}.io?size=256`;
          }}
        />
      </div>
    </div>
  );
};

const AboutPage = () => {
  const stats = [
    {
      number: '15K',
      label: 'Happy Customers'
    },
    {
      number: '150K',
      label: 'Monthly Visitors'
    },
    {
      number: '15',
      label: 'Countries Worldwide'
    },
    {
      number: '100+',
      label: 'Top Partners'
    }
  ];

  const teamMembers = [
    {
      name: "Erhan FIRAT",
      role: "Project Owner",
      linkedin: "https://www.linkedin.com/in/erhanfirat/",
      github: "https://github.com/erhanfirat",
      email: "erhanfirat@gmail.com"
    },
    {
      name: "Gökhan Özdemir",
      role: "Scrum Master",
      linkedin: "https://www.linkedin.com/in/gokhan-ozdemir/",
      github: "https://github.com/GokhanOzdemir",
      email: "gokhan.ozdemir@workintech.com.tr"
    },
    {
      name: "Esra Çevikbaş",
      role: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/esra-%C3%A7evikba%C5%9F-855a3a177/",
      github: "https://github.com/cevikbasesra",
      email: "cevikbasesra@gmail.com"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <span className="text-sm text-gray-600 mb-4 block">ABOUT COMPANY</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#252B42] mb-6">
              ABOUT US
            </h1>
            <p className="text-gray-600 mb-8">
              We know how large objects will act, but things on a small scale just do not act that way.
            </p>
            <button className="bg-[#23A6F0] text-white px-8 py-3 rounded hover:bg-[#1a85c2] transition-colors">
              Get Quote Now
            </button>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-[#FFE9EA] rounded-full -z-10"></div>
            <img 
              src="/about.png" 
              alt="About Us Shopping" 
              className="relative z-10 w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#E74040] text-sm font-medium mb-4 block">Problems trying</span>
          <h2 className="text-[#252B42] text-2xl font-bold mb-4">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
          <p className="text-gray-600">
            Problems trying to resolve the conflict between the two major realms of Classical physics
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold text-[#252B42] mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="relative rounded-2xl overflow-hidden">
          <img 
            src="/mountain.jpeg" 
            alt="Video Cover" 
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="text-white hover:text-[#23A6F0] transition-colors">
              <PlayCircle size={64} />
            </button>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#252B42] mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Problems trying to resolve the conflict between 
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col space-y-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* Company Logos Section */}
      <div className="container mx-auto px-4 py-16 border-t border-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-4">Big Companies Are Here</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies worldwide
          </p>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="md:hidden flex flex-col items-center space-y-16"> {/* Increased spacing */}
          <Logo company="stripe" name="Stripe" />
          <Logo company="aws" name="AWS" />
          <Logo company="microsoft" name="Microsoft" />
          <Logo company="google" name="Google" />
          <Logo company="apple" name="Apple" />
        </div>

        {/* Desktop Layout - Horizontal Row */}
        <div className="hidden md:flex justify-between items-center flex-wrap max-w-6xl mx-auto"> {/* Increased max width */}
          <Logo company="stripe" name="Stripe" />
          <Logo company="aws" name="AWS" />
          <Logo company="microsoft" name="Microsoft" />
          <Logo company="google" name="Google" />
          <Logo company="apple" name="Apple" />
        </div>
      </div>

      {/* Work With Us Section */}
      <WorkWithUs />
    </div>
  );
};

export default AboutPage;
