"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Context = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="relative w-full min-h-screen bg-gradient-to-b from-zinc-950 via-emerald-950/20 to-zinc-950 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 transform-3d-grid"
        style={{
          backgroundImage: `url('/Elements/grid.png')`,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/30 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isInView ? [0.3, 0.6, 0.3] : 0,
              scale: isInView ? [1, 1.2, 1] : 0,
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              transform: `perspective(1000px) rotateX(${i * 15}deg) rotateY(${i * 20}deg)`
            }}
          >
            {['🌿', '🌱', '🌳', '💧', '🌍', '♻️', '🌸', '🍃'][i]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header Section with 3D Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bebas text-white mb-4 relative antialiased font-bold">
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 blur-lg opacity-20"></span>
              <span className="relative text-shadow-green">
                INAUGURATED BY
              </span>
            </h1>
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bebas text-white mb-2 text-shadow-default antialiased font-bold"
              whileHover={{ scale: 1.02 }}
            >
              RAM NATH KOVIND
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-green-300 font-Sfpro font-semibold antialiased"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              Ex-President of India
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content with 3D Cards */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Mission Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: "🌱",
                  title: "Sustainable Campus",
                  description: "Transforming MNNIT into an eco-friendly institution through innovative green practices.",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  icon: "🐾",
                  title: "Wildlife Care",
                  description: "Providing water and care for stray animals, creating a compassionate campus environment.",
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  icon: "♻️",
                  title: "Waste Reduction",
                  description: "Educating our community on plastic alternatives and promoting recycling initiatives.",
                  color: "from-yellow-500 to-orange-600"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5,
                    z: 50
                  }}
                  className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-300 box-shadow-3d transform-3d"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-start space-x-4">
                    <motion.div
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {card.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bebas text-white mb-2 group-hover:text-green-300 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors font-Sfpro leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section with 3D Effects */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="relative group transform-3d"
              whileHover={{ 
                scale: 1.02,
                rotateY: -5,
                z: 100
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Floating frame effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              
              <div className="relative w-full h-80 md:h-96 lg:h-[32rem] rounded-2xl overflow-hidden border-2 border-green-400/30 group-hover:border-green-400/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                
                <Image
                  src="/Images/About.webp"
                  alt="Green Club Initiatives - Sustainable Campus Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  onLoad={() => setIsLoaded(true)}
                />

              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Context;
