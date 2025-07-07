"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-zinc-950 via-emerald-950/30 to-zinc-950 py-16 overflow-hidden"
      style={{ y }}
    >
      {/* Floating Nature Elements - Increased */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: [0.2, 0.4, 0.2],
              scale: [0.5, 1, 0.5],
              rotate: [0, 360],
              x: [0, Math.sin(i) * 20, 0],
              y: [0, Math.cos(i) * 15, 0]
            } : {}}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.3
            }}
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              fontSize: `${1.5 + (i % 3) * 0.5}rem`
            }}
          >
            {['🌿', '🌱', '🌳', '🐾', '🦋', '🍃', '💧', '🌸'][i]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Bigger */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bebas text-white mb-6 antialiased font-bold"
            style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(34, 197, 94, 0.3)'
            }}
          >
            OUR GREEN MISSION
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-green-300 font-Sfpro max-w-3xl mx-auto leading-relaxed antialiased"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Transforming MNNIT into a sustainable ecosystem where nature and education thrive together
          </motion.p>
        </motion.div>

        {/* Mission 3D Interactive Display - Modern Design */}
        <div className="relative mb-12">
          {/* 3D Mission Spheres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
            {missionCards.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, z: -100, rotateX: 45 }}
                animate={isInView ? { 
                  opacity: 1, 
                  z: 0, 
                  rotateX: 0,
                  y: [0, -10, 0]
                } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.2,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 15,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                className="relative group cursor-pointer transform-style-preserve-3d"
              >
                {/* 3D Floating Orb */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Main Orb */}
                  <motion.div
                    className="absolute inset-4 rounded-full bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-teal-500/30 backdrop-blur-xl border border-green-400/30 translate-z-20 mission-orb-shadow"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Inner Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-6xl"
                        animate={{
                          rotateY: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        {mission.icon}
                      </motion.div>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-green-400 rounded-full"
                          animate={{
                            x: [0, Math.sin(i) * 40, 0],
                            y: [0, Math.cos(i) * 40, 0],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'center'
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Mission Info Panel */}
                <motion.div
                  className="text-center relative translate-z-10"
                >
                  <motion.h3
                    className="text-2xl font-bebas text-white mb-3 antialiased"
                    whileHover={{ scale: 1.05 }}
                  >
                    {mission.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-gray-300 font-Sfpro text-sm leading-relaxed mb-4 px-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {mission.description}
                  </motion.p>

                  {/* Interactive Stats */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {mission.keyPoints.slice(0, 2).map((point, pointIndex) => (
                      <motion.div
                        key={pointIndex}
                        className="flex items-center justify-center space-x-2 text-xs text-green-300"
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="font-Sfpro">{point}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-green-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-z-5"
                />
              </motion.div>
            ))}
          </div>

          {/* Connecting Lines Animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none translate-z-neg-10">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.3)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 100 200 Q 400 100 700 200 T 1300 200"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Impact Statistics - Smaller */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-green-900/20 via-emerald-900/30 to-teal-900/20 backdrop-blur-xl rounded-xl p-6 border border-green-400/20"
        >
          <h3 className="text-2xl font-bebas text-white text-center mb-6 antialiased">
            OUR IMPACT ON CAMPUS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300 font-Sfpro">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Data - Enhanced for 3D Mission Display
const missionCards = [
  {
    id: 1,
    title: "Forest Restoration",
    icon: "🌳",
    image: "/Images/img5.webp",
    description: "Creating sustainable green corridors and expanding forest cover through strategic tree plantation and native species cultivation.",
    keyPoints: [
      "500+ trees planted annually",
      "Native species preservation",
      "Carbon footprint reduction",
      "Biodiversity enhancement"
    ]
  },
  {
    id: 2,
    title: "Wildlife Conservation",
    icon: "🐾",
    image: "/Images/img8.webp",
    description: "Protecting campus wildlife through habitat creation, water sources, and animal-friendly infrastructure development.",
    keyPoints: [
      "Water stations for animals",
      "Bird nesting initiatives",
      "Butterfly garden maintenance",
      "Wildlife corridor creation"
    ]
  },
  {
    id: 3,
    title: "Sustainable Practices",
    icon: "♻️",
    image: "/Images/img3.webp",
    description: "Implementing comprehensive eco-friendly solutions for waste management, water conservation, and renewable energy adoption.",
    keyPoints: [
      "Zero-waste initiatives",
      "Plastic reduction campaigns",
      "Water harvesting systems",
      "Solar energy promotion"
    ]
  },
  {
    id: 4,
    title: "Environmental Education",
    icon: "📚",
    image: "/Images/img9.webp",
    description: "Spreading environmental awareness through interactive workshops, research programs, and community engagement initiatives.",
    keyPoints: [
      "Monthly awareness workshops",
      "Eco-club activities",
      "Community outreach programs",
      "Sustainability research"
    ]
  }
];

const impactStats = [
  { icon: "🌳", number: "500+", label: "Trees Planted" },
  { icon: "🐾", number: "50+", label: "Species Protected" },
  { icon: "♻️", number: "75%", label: "Waste Reduced" },
  { icon: "💧", number: "30%", label: "Water Saved" }
];

export default About;

