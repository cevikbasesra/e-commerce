import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const TeamMember = ({ name, role, image, linkedin, github, email }) => {
  // Generate DiceBear Pixel Art avatar URL if no image is provided
  const avatarUrl = image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(name)}&backgroundColor=23A6F0`;

  return (
    <div className="flex flex-col items-center p-6 bg-[#F9F9F9] rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-48 h-48 rounded-full mb-4 border-4 border-[#23A6F0] overflow-hidden bg-white flex items-center justify-center">
        <img
          src={avatarUrl}
          alt={name}
          className="w-40 h-40"
        />
      </div>
      <h3 className="text-xl font-bold text-[#252B42] mb-2">{name}</h3>
      <p className="text-[#23856D] font-medium mb-4">{role}</p>
      <div className="flex space-x-4">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#23A6F0] hover:text-[#1a85c2] transition-colors"
          >
            <Linkedin size={24} />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#252B42] hover:text-[#23A6F0] transition-colors"
          >
            <Github size={24} />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-[#E77C40] hover:text-[#23A6F0] transition-colors"
          >
            <Mail size={24} />
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
    },
    {
      name: "Team Member 1",
      role: "Frontend Developer",
      github: "https://github.com",
      email: "frontend@example.com"
    },
    {
      name: "Team Member 2",
      role: "Backend Developer",
      github: "https://github.com",
      email: "backend@example.com"
    },
    {
      name: "Team Member 3",
      role: "UI/UX Designer",
      linkedin: "https://linkedin.com",
      email: "design@example.com"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#252B42]">Our Team</h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Meet the talented individuals who make our e-commerce platform possible.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>

      {/* Join Team Section */}
      <div className="bg-[#F9F9F9] p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#252B42]">Join Our Team</h2>
        <p className="text-gray-600 mb-6">
          We're always looking for talented individuals to join our team.
        </p>
        <a
          href="mailto:careers@example.com"
          className="inline-block bg-[#23A6F0] text-white px-6 py-3 rounded-lg hover:bg-[#1a85c2] transition-colors"
        >
          View Open Positions
        </a>
      </div>
    </div>
  );
};

export default TeamPage;
