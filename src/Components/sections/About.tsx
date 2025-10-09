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
      </div>
    </motion.section>
  );
}



export default About;

