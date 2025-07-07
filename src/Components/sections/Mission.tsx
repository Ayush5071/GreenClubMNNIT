"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const missionData = [
  {
    id: 1,
    title: "Environmental Conservation",
    description: "Leading the charge in protecting our planet's natural ecosystems through innovative conservation strategies and sustainable practices.",
    image: "/Images/img8.webp",
    stats: "500+ Trees Protected",
    icon: "🌱"
  },
  {
    id: 2,
    title: "Green Campus Initiative",
    description: "Transforming our campus into a model of sustainability through renewable energy, waste reduction, and eco-friendly infrastructure.",
    image: "/Images/img1.webp",
    stats: "1000+ Trees Planted",
    icon: "🌳"
  },
  {
    id: 3,
    title: "Community Engagement",
    description: "Empowering students and communities with knowledge and tools to make environmentally conscious decisions for a sustainable future.",
    image: "/Images/img3.webp",
    stats: "50+ Workshops Conducted",
    icon: "🌍"
  },
  {
    id: 4,
    title: "Research & Innovation",
    description: "Pioneering cutting-edge research in environmental science and developing innovative solutions for global sustainability challenges.",
    image: "/Images/img4.webp",
    stats: "15+ Research Projects",
    icon: "🔬"
  },
];

export function Mission() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-gradient-to-b from-zinc-950 via-forest-900 to-zinc-950 py-32 overflow-hidden"
    >
      {/* Animated Background Forest Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-7xl sm:text-8xl lg:text-9xl font-bebas text-white mb-6 antialiased font-bold"
            style={{
              textShadow: '2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(34, 197, 94, 0.4)'
            }}
          >
            OUR MISSION
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-green-300 font-Sfpro max-w-4xl mx-auto leading-relaxed antialiased"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Leading the green revolution through innovation, education, and sustainable action
          </motion.p>
        </motion.div>

        {/* Mission Panels - Sleek Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {missionData.map((mission, index) => (
            <motion.div
              key={mission.id}
              className="group relative"
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
            >
              {/* Sleek Panel Container */}
              <motion.div
                className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl rounded-2xl border border-green-500/20 p-8 h-full overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: 2,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Content Layout */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
                  {/* Image Section */}
                  <motion.div
                    className="flex-shrink-0 relative w-32 h-32 lg:w-40 lg:h-40"
                    whileHover={{
                      rotateY: 10,
                      scale: 1.1,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-green-500/30">
                      <Image
                        src={mission.image}
                        alt={mission.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 128px, 160px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    
                    {/* Floating Icon */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-12 h-12 bg-green-500/20 backdrop-blur-xl rounded-full flex items-center justify-center text-2xl border border-green-500/30"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {mission.icon}
                    </motion.div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left">
                    <motion.h3
                      className="text-2xl lg:text-3xl font-bebas text-white mb-4 antialiased"
                      whileHover={{ 
                        x: 5,
                        color: "#22c55e" 
                      }}
                    >
                      {mission.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-gray-300 font-Sfpro text-base lg:text-lg leading-relaxed mb-6"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {mission.description}
                    </motion.p>

                    {/* Stats Badge */}
                    <motion.div
                      className="inline-flex items-center px-6 py-3 bg-green-500/20 backdrop-blur-xl rounded-full text-green-300 font-medium border border-green-500/30"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(34, 197, 94, 0.3)"
                      }}
                    >
                      <span className="text-lg font-bold">{mission.stats}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-green-500/30 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-green-500/30 rounded-br-lg" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl border border-green-400/50"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)",
              borderColor: "rgba(34, 197, 94, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Green Movement
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
