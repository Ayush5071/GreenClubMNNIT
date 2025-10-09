"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const FloatingNav = ({ navItems, className }: { 
  navItems: { 
    name: string; 
    link: string; 
    icon?: JSX.Element; 
  }[]; 
  className?: string; 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemIcons = {
    "About": "",
    "Gallery": "",
    "Projects": "",
    "Team": "",
    "Login": "",
    "Contact": ""
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-gradient-to-r from-emerald-900/98 via-green-800/98 to-teal-900/98 backdrop-blur-sm shadow-2xl border-b border-green-400/20" 
          : "bg-gradient-to-r from-emerald-900/95 via-green-800/95 to-teal-900/95 backdrop-blur-sm",
        className
      )}
      style={{
        boxShadow: isScrolled 
          ? "0 8px 32px rgba(34, 197, 94, 0.3), 0 0 0 1px rgba(34, 197, 94, 0.1)" 
          : "0 4px 16px rgba(34, 197, 94, 0.2)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg"></div>
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center shadow-lg border border-green-400/40">
                <Image
                  src="/Images/logo.webp"
                  alt="Green Club MNNIT Logo"
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bebas text-xl md:text-2xl tracking-wide font-bold antialiased">
                GREEN CLUB
              </h1>
              <p className="text-green-300 text-xs md:text-sm font-Sfpro -mt-1 antialiased">
                MNNIT Allahabad
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.link}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-500/20"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {navItemIcons[item.name as keyof typeof navItemIcons]}
                  </span>
                  <span className="text-white/90 group-hover:text-green-300 font-Sfpro font-semibold text-sm lg:text-base transition-colors duration-300 antialiased">
                    {item.name}
                  </span>
                </div>
                
                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center transition-all duration-300 hover:bg-green-500/30"
              aria-label="Toggle mobile menu"
              title="Toggle mobile menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-green-800/98 to-emerald-900/98 backdrop-blur-sm border-t border-green-400/20"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-green-500/20 transition-all duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {navItemIcons[item.name as keyof typeof navItemIcons]}
                  </span>
                  <span className="text-white/90 group-hover:text-green-300 font-Sfpro font-semibold text-lg transition-colors duration-300 antialiased">
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

