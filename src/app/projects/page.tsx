"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCode, FiUsers, FiTarget } from "react-icons/fi";
import CustomFooter from "@/Components/sections/CustomFooter";

const ProjectsPage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const projects = [
    {
      id: 1,
      title: "EcoConnect",
      subtitle: "Campus Sustainability Tracker",
      description: "A comprehensive web app that tracks and displays MNNIT's eco-initiatives like tree plantation drives, waste reduction, and clean campus campaigns.",
      features: [
        "Dashboard showing data: no. of trees planted, events held, plastic saved",
        "Map view of planted trees (using Leaflet.js or Google Maps API)",
        "Volunteer signup and leaderboard",
        "Real-time updates (using Firebase)"
      ],
      techStack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Chart.js", "Leaflet.js"],
      roles: ["Frontend", "Backend", "Database", "Data Visualization"],
      image: "/projects/p1.png",
      status: "Planning",
      impact: "Track campus sustainability metrics"
    },
    {
      id: 2,
      title: "Greenpedia",
      subtitle: "Learn & Act for Nature",
      description: "An educational web platform where students learn about eco-topics and take pledges for small green actions.",
      features: [
        "Daily eco-fact or quiz",
        "Pledge wall ('I'll avoid plastic bottles this week')",
        "Gamified badges system",
        "AI-based 'Eco Habit Suggestor' (using Gemini or GPT API)"
      ],
      techStack: ["Next.js", "TailwindCSS", "Firebase", "Gemini API", "Framer Motion"],
      roles: ["Frontend", "Backend", "AI Integration", "Content Creation"],
      image: "/projects/p2.png",
      status: "Planning",
      impact: "Educate and engage students in eco-friendly habits"
    },
    {
      id: 3,
      title: "CarbonCalc MNNIT",
      subtitle: "Personal Carbon Footprint Calculator",
      description: "Students enter daily habits (travel, electricity, food choices) → get carbon footprint results and eco-tips.",
      features: [
        "Simple form + results dashboard",
        "'Compare with MNNIT average' graph",
        "Shareable badges like 'Low Carbon Hero'",
        "Weekly eco-tips newsletter"
      ],
      techStack: ["React", "Chart.js", "Express", "MongoDB", "Email API"],
      roles: ["Frontend", "Backend", "Data Analysis", "Email Integration"],
      image: "/projects/p3.png",
      status: "Planning",
      impact: "Help students reduce their carbon footprint"
    },
    {
      id: 4,
      title: "EcoEvents",
      subtitle: "Nature Events & Volunteering Platform",
      description: "Central portal for all Green Club events — tree drives, cleanup, workshops, competitions.",
      features: [
        "Event listing & registration",
        "Volunteer points and certificates",
        "Photo gallery & recap blogs",
        "Admin dashboard for event creation"
      ],
      techStack: ["Next.js", "TailwindCSS", "MongoDB", "Firebase Storage", "PDF Generation"],
      roles: ["Frontend", "Backend", "Admin Panel", "Media Management"],
      image: "/projects/p4.png",
      status: "Planning",
      impact: "Centralize and streamline green events"
    },
    {
      id: 5,
      title: "Plantify",
      subtitle: "Virtual Tree Plantation Tracker",
      description: "Every time someone plants a real tree, they upload it → appears as a virtual tree on a digital campus map.",
      features: [
        "Upload image + location",
        "Interactive map with growing trees",
        "Tree growth timeline (day 0 → 30 → 60)",
        "API for real tree data (collaboration with forest dept)"
      ],
      techStack: ["React", "Leaflet.js", "Node.js", "MongoDB", "Image Processing", "Geolocation API"],
      roles: ["Frontend", "Backend", "GIS Integration", "Image Processing"],
      image: "/projects/p5.png",
      status: "Planning",
      impact: "Visualize real tree plantation progress"
    },
    {
      id: 6,
      title: "Waste Wizard",
      subtitle: "Smart Waste Segregation Guide",
      description: "A fun AI-powered app where users upload a photo of an item → it tells them which bin it belongs to.",
      features: [
        "Image recognition (using TensorFlow.js or Gemini Vision API)",
        "Tips for recycling and reusing",
        "'Waste facts' leaderboard",
        "Quiz mode for awareness sessions"
      ],
      techStack: ["React", "TensorFlow.js", "Gemini Vision API", "Firebase", "Image Recognition"],
      roles: ["Frontend", "AI/ML", "Image Processing", "Mobile Development"],
      image: "/projects/p6.png",
      status: "Planning",
      impact: "Improve waste segregation awareness"
    }
  ];

  const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      whileHover={{ y: -10 }}
      className="group bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-green-500/20 shadow-xl hover:shadow-green-500/20 transition-all duration-500"
    >
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
            {project.status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
          <p className="text-green-300 text-sm font-medium">{project.subtitle}</p>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Impact */}
        <div className="flex items-center space-x-2 mb-4">
          <FiTarget className="text-green-400 w-4 h-4" />
          <span className="text-green-400 text-sm font-semibold">Impact:</span>
          <span className="text-gray-300 text-sm">{project.impact}</span>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-white font-semibold text-sm mb-2 flex items-center">
            <FiCode className="w-4 h-4 mr-2 text-green-400" />
            Key Features
          </h4>
          <ul className="space-y-1">
            {project.features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="text-gray-400 text-xs flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="text-white font-semibold text-sm mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-md border border-green-500/30">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-md">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Team Roles */}
        <div className="mb-4">
          <h4 className="text-white font-semibold text-sm mb-2 flex items-center">
            <FiUsers className="w-4 h-4 mr-2 text-green-400" />
            Team Roles
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.roles.map((role, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-500/30">
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center pt-4 border-t border-gray-700/50">
          <button className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 text-sm font-semibold rounded-lg border border-green-500/30 transition-all duration-300">
            Coming Soon
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-green-950">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-20 left-4 z-20">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-green-300 rounded-xl border border-green-500/30 hover:bg-green-500/30 transition-all duration-300 text-sm font-medium"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 mt-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 mr-4">
              <FiCode className="text-3xl text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Upcoming Projects
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover our <span className="text-green-400 font-semibold">upcoming sustainability projects</span> designed to help 
            create a greener campus and promote environmental awareness through technology.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Tech Stack Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recommended Tech Stack</h2>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <h3 className="text-green-400 font-semibold mb-2">Frontend</h3>
                <p className="text-gray-300 text-sm">Next.js + TailwindCSS</p>
              </div>
              <div className="text-center">
                <h3 className="text-blue-400 font-semibold mb-2">Backend</h3>
                <p className="text-gray-300 text-sm">Express / Firebase</p>
              </div>
              <div className="text-center">
                <h3 className="text-purple-400 font-semibold mb-2">Database</h3>
                <p className="text-gray-300 text-sm">MongoDB / Firestore</p>
              </div>
              <div className="text-center">
                <h3 className="text-orange-400 font-semibold mb-2">Hosting</h3>
                <p className="text-gray-300 text-sm">Vercel / Netlify</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <p className="text-gray-400 text-sm">
                <span className="text-green-400 font-semibold">Extras:</span> Chart.js, Leaflet.js, Framer Motion, TensorFlow.js
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Development Team</h3>
            <p className="text-gray-300 mb-6">
              Interested in contributing to these sustainability projects? Join our development team and help us build 
              technology for a greener future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/team"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Meet the Team
              </Link>
              <Link 
                href="/#contact"
                className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 font-semibold rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <CustomFooter />
    </div>
  );
};

export default ProjectsPage;