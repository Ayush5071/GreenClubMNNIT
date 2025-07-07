"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-hot-toast";
import Image from "next/image";

function Footer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const handleJoinClick = () => {
    toast.success("Thank you for your interest! We'll contact you soon.");
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: faFacebook,
      url: "https://www.facebook.com/MNNITGreenClub/",
      color: "text-blue-500 hover:text-blue-400",
      bgColor: "bg-blue-500/20 hover:bg-blue-500/30"
    },
    {
      name: "Instagram",
      icon: faInstagram,
      url: "https://www.instagram.com/greenclub_mnnit/",
      color: "text-pink-500 hover:text-pink-400",
      bgColor: "bg-pink-500/20 hover:bg-pink-500/30"
    },
    {
      name: "Twitter",
      icon: faTwitter,
      url: "#",
      color: "text-blue-400 hover:text-blue-300",
      bgColor: "bg-blue-400/20 hover:bg-blue-400/30"
    },
    {
      name: "LinkedIn",
      icon: faLinkedin,
      url: "https://www.linkedin.com/company/mnnit-green-club/posts/?feedView=all",
      color: "text-blue-600 hover:text-blue-500",
      bgColor: "bg-blue-600/20 hover:bg-blue-600/30"
    }
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Mission", href: "#mission" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const initiatives = [
    { name: "Tree Plantation", icon: "🌳" },
    { name: "Water Conservation", icon: "💧" },
    { name: "Solar Energy", icon: "☀️" },
    { name: "Waste Management", icon: "♻️" }
  ];

  return (
    <motion.footer
      ref={containerRef}
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 py-20">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Image
                  src="/gclogo.ico"
                  alt="Green Club Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bebas text-white font-bold">
                  GREEN CLUB
                </h3>
                <p className="text-green-400 font-Sfpro text-sm">MNNIT Allahabad</p>
              </div>
            </div>
            
            <p className="text-gray-300 font-Sfpro text-lg leading-relaxed max-w-md">
              Leading the sustainable revolution at MNNIT through innovative environmental initiatives, 
              community engagement, and green technology solutions.
            </p>

            {/* Join Button */}
            <motion.button
              onClick={handleJoinClick}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl border border-green-400/50 transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">🌱</span>
              Join the Movement
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-xl font-bebas text-white font-bold mb-4">
              Quick Links
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 font-Sfpro transition-colors duration-200 block"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Initiatives */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-xl font-bebas text-white font-bold mb-4">
              Our Initiatives
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.name}
                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-3 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{initiative.icon}</div>
                    <p className="text-xs text-gray-300 font-Sfpro">
                      {initiative.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Media Section */}
        <motion.div
          className="py-12 border-t border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bebas text-white font-bold mb-4">
              Connect With Us
            </h4>
            <p className="text-gray-400 font-Sfpro">
              Join our community and stay updated with our latest initiatives
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 rounded-2xl ${social.bgColor} flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-gray-600`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <FontAwesomeIcon 
                  icon={social.icon} 
                  className={`text-xl ${social.color}`} 
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="py-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
              <p className="text-gray-300 font-Sfpro text-sm leading-relaxed">
                <span className="font-bold text-white">Address:</span> Motilal Nehru National Institute of Technology Allahabad,<br />
                Prayagraj, Uttar Pradesh, India – 211004
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} Green Club MNNIT. All Rights Reserved.
              </p>
              <span className="hidden sm:inline">•</span>
              <p>
                Designed with 💚 by{" "}
                <a 
                  href="https://ayush-delta.vercel.app" 
                  className="text-green-400 hover:text-green-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ayush Tiwari
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-50" />
    </motion.footer>
  );
}

export default Footer;
