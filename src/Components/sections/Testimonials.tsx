"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function Testimonials() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "I realized the need to protect the land, and there was only one way to protect the land - to plant trees. So, I started planting trees every day.",
      name: "Jadav Payeng",
      designation: "Forest Man of India",
      src: "/testimonials/jadav.jpg",
      bgColor: "from-green-500/20 to-emerald-500/20",
      accentColor: "border-green-500/30"
    },
    {
      quote: "It's the little things that citizens do. That's what will make the difference. My little thing is planting trees.",
      name: "Wangari Maathai",
      designation: "Environmental Activist, Nobel Peace Prize Winner",
      src: "/testimonials/wangari.jpg",
      bgColor: "from-emerald-500/20 to-teal-500/20",
      accentColor: "border-emerald-500/30"
    },
    {
      quote: "The best way to know God is to love many things. And to love many things, we must preserve nature's wonders, one of which is trees.",
      name: "John Muir",
      designation: "Naturalist & Founder of the Sierra Club",
      src: "/testimonials/muir.jpg",
      bgColor: "from-teal-500/20 to-cyan-500/20",
      accentColor: "border-teal-500/30"
    },
    {
      quote: "It is not the style of clothes one wears, neither the kind of automobile one drives, nor the amount of money one has in the bank, that counts. These mean nothing. It is simply service that measures success.",
      name: "George Washington Carver",
      designation: "Agricultural Scientist & Environmental Pioneer",
      src: "/testimonials/george.jpg",
      bgColor: "from-lime-500/20 to-green-500/20",
      accentColor: "border-lime-500/30"
    },
    {
      quote: "When the last tree is cut down, the last fish caught, and the last river poisoned, you will realize that you cannot eat money.",
      name: "Sunderlal Bahuguna",
      designation: "Environmentalist, Leader of the Chipko Movement",
      src: "/testimonials/sundar.jpg",
      bgColor: "from-green-500/20 to-emerald-500/20",
      accentColor: "border-green-500/30"
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-32 left-20 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-32 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-6xl sm:text-7xl lg:text-8xl font-bebas text-white mb-6 antialiased font-bold"
            style={{
              textShadow: '2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(34, 197, 94, 0.4)'
            }}
          >
            VOICES OF CHANGE
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-green-300 font-Sfpro max-w-4xl mx-auto leading-relaxed antialiased"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Inspiring words from environmental leaders who shaped our world
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Active Testimonial */}
          <motion.div
            key={activeIndex}
            className={`relative bg-gradient-to-br ${testimonials[activeIndex].bgColor} backdrop-blur-xl rounded-3xl p-8 border ${testimonials[activeIndex].accentColor} shadow-2xl`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-6xl text-green-400/30 font-serif">
              &ldquo;
            </div>
            
            {/* Quote Text */}
            <motion.blockquote
              className="text-xl md:text-2xl text-white font-Sfpro leading-relaxed mt-8 mb-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {testimonials[activeIndex].quote}
            </motion.blockquote>

            {/* Author Info */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-green-400/50">
                <Image
                  src={testimonials[activeIndex].src}
                  alt={testimonials[activeIndex].name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-bebas">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-green-300 font-Sfpro text-sm">
                  {testimonials[activeIndex].designation}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Testimonial Navigation */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`relative cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 shadow-lg'
                    : 'bg-zinc-800/50 border-zinc-700/50 hover:border-green-500/30'
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-400/30">
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bebas text-lg mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-green-300 font-Sfpro text-sm">
                      {testimonial.designation}
                    </p>
                  </div>
                  {index === activeIndex && (
                    <motion.div
                      className="w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <p className="text-xl md:text-2xl text-green-300 font-Sfpro italic">
            &ldquo;The Earth does not belong to us; we belong to the Earth&rdquo;
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
