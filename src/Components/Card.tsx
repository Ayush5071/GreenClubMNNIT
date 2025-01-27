import React from "react";
import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

interface Member {
  drive?: string;
  name: string;
  team: string;
  linkedin: string;
  instagram?: string;
}

const Card = ({ member }: { member: Member }) => {
  return (
    <div className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden w-64 h-80 group">
      {member.drive && (
        <Image 
          src={member.drive} 
          alt={member.name} 
          layout="fill" 
          objectFit="cover" 
          className="transition-transform duration-300 group-hover:scale-110" 
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-semibold text-white">{member.name}</h3>
        <p className="text-gray-400">{member.team}</p>
        <div className="flex space-x-4 mt-2">
          <a href={member.linkedin} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          {member.instagram && (
            <a href={`https://instagram.com/${member.instagram}`} className="text-pink-500" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
