import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const TeamMember = ({ name, role, image, linkedin, github, email }) => {
  // Generate DiceBear Pixel Art avatar URL if no image is provided
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

const TeamPage = () => {
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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#252B42] mb-4">Meet Our Team</h1>
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
  );
};

export default TeamPage;
