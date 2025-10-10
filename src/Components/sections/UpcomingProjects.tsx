"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCode } from "react-icons/fi";

const UpcomingProjects = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const projects = [
    {
      id: 1,
      title: "EcoConnect",
      subtitle: "Campus Sustainability Tracker",
      image: "/projects/p1.png",
      description: "Track and display MNNIT's eco-initiatives with real-time dashboards and interactive maps."
    },
    {
      id: 2,
      title: "Greenpedia",
      subtitle: "Learn & Act for Nature",
      image: "/projects/p2.png",
      description: "Educational platform with daily eco-facts, pledges, and gamified environmental learning."
    },
    {
      id: 3,
      title: "CarbonCalc MNNIT",
      subtitle: "Carbon Footprint Calculator",
      image: "/projects/p3.png",
      description: "Calculate personal carbon footprint and get personalized eco-tips for a greener lifestyle."
    }
  ];

  const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => window.location.href = '/projects'}
    >
      <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-green-500/20 shadow-xl hover:shadow-green-500/20 transition-all duration-500">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-500/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
            <p className="text-green-300 text-sm font-medium">{project.subtitle}</p>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <p className="text-gray-300 text-sm leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
            <span className="text-green-400 text-sm font-semibold">Learn More</span>
            <FiArrowRight className="text-green-400 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-20 overflow-hidden"
      id="upcoming-projects"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 mr-4">
              <FiCode className="text-3xl text-green-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Explore Our Upcoming Projects
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the <span className="text-green-400 font-semibold">innovative sustainability projects</span> we&apos;re 
            developing to create a greener campus and promote environmental awareness through technology.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Explore More Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link 
            href="/projects"
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl border border-green-400/50 transition-all duration-300 hover:scale-105"
          >
            <span>Explore More Projects</span>
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default UpcomingProjects;