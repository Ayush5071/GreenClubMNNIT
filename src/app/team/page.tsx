'use client';

import React, { useState, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiFilter, FiSearch, FiChevronDown, FiLinkedin, FiInstagram, FiArrowLeft, FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { finalYears, freshers, secondYears, thirdYears, headCoordinators, yearMapping } from "@/lib/team";

// Define interfaces for type safety
interface TeamMember {
  name: string;
  linkedin?: string;
  instagram?: string;
  team: string;
  drive?: string;
}

interface TeamData {
  alumni: TeamMember[];
  finalYears: TeamMember[];
  thirdYears: TeamMember[];
  secondYears: TeamMember[];
  headCoordinators: TeamMember[];
}

// Optimized Image Component with lazy loading
const OptimizedImage = React.memo(({ src, alt, className }: { src: string; alt: string; className: string }) => (
  <div className="relative overflow-hidden">
    <Image
      src={src}
      alt={alt}
      width={200}
      height={200}
      className={className}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/profile/boy.webp'; // Fallback image
      }}
    />
  </div>
));

OptimizedImage.displayName = 'OptimizedImage';

// Team Member Card Component with 3D Animation
const TeamMemberCard = React.memo(({ member, year }: { member: TeamMember; year: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ 
      y: -8,
      rotateY: 3,
      rotateX: 3,
      scale: 1.02
    }}
    transition={{ 
      type: "spring", 
      stiffness: 300,
      damping: 20
    }}
    className="relative group h-full perspective-1000"
    style={{ transformStyle: "preserve-3d" }}
  >
    <div className={`relative h-full ${year === 'Second Year' ? 'min-h-[200px]' : 'min-h-[320px]'} bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl group-hover:shadow-green-500/20 transition-all duration-500`}>
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-green-400/0 group-hover:border-green-400/20 transition-all duration-500" />
      
      {/* 3D Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[url('/Elements/grid.png')] bg-[length:30px_30px] bg-center transform-3d-grid" />
      </div>
      
      {/* Profile Image Section - Only show for non-second year members */}
      {year !== 'Second Year' && (
        <div className="relative p-6 pb-3">
          <motion.div 
            className="relative mx-auto w-24 h-24 md:w-28 md:h-28"
            whileHover={{ 
              scale: 1.1,
              rotateY: 10,
              rotateX: 5
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Glow Effect */}
            <motion.div 
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gray-600/40 group-hover:border-green-400/50 transition-all duration-500 shadow-xl">
              <OptimizedImage
                src={member.drive || (member.name.toLowerCase().includes('female') ? '/profile/girl.webp' : '/profile/boy.webp')}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-60"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [0, 1, 0],
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.7
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Year Badge */}
            <motion.div 
              className="absolute -bottom-2 -right-2 z-10"
              whileHover={{ scale: 1.1 }}
            >
              <div className="px-2 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg border border-green-400/30 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                {year.split(' ')[0]}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Content Section */}
      <div className={`relative z-10 ${year === 'Second Year' ? 'px-4 py-6 h-full flex flex-col justify-center items-center text-center space-y-3' : 'px-6 pb-6 space-y-3'}`}>
        {/* Professional Icon for Second Year Cards */}
        {year === 'Second Year' && (
          <motion.div
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              y: -2
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FiUser className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
          </motion.div>
        )}

        {/* Name */}
        <motion.div 
          className={`${year === 'Second Year' ? 'space-y-2' : 'text-center space-y-2'}`}
          whileHover={{ y: -1 }}
        >
          <h3 className={`font-bold text-white group-hover:text-green-300 transition-colors duration-300 leading-tight ${year === 'Second Year' ? 'text-sm md:text-base' : 'text-lg md:text-xl'}`}>
            {member.name}
          </h3>
          {member.team && (
            <motion.p 
              className={`text-gray-400 font-medium bg-gray-800/50 rounded-lg border border-gray-700/50 inline-block group-hover:bg-gray-700/50 group-hover:border-green-500/30 group-hover:text-green-200 transition-all duration-300 ${year === 'Second Year' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-2'}`}
              whileHover={{ scale: 1.05 }}
            >
              {member.team}
            </motion.p>
          )}
          {/* Year Badge for Second Year (since they don't have image badge) */}
          {year === 'Second Year' && (
            <motion.div 
              className="px-2 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg border border-green-400/30 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05, y: -1 }}
            >
              2nd Year
            </motion.div>
          )}
        </motion.div>

        {/* Social Links */}
        <div className={`flex justify-center ${year === 'Second Year' ? 'pt-1 space-x-2' : 'pt-3 space-x-3'}`}>
          {member.linkedin && (
            <motion.a
              href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`${member.name}'s LinkedIn`}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                y: -2
              }}
              whileTap={{ scale: 0.9 }}
              className={`bg-gradient-to-r from-blue-600/30 to-blue-500/30 hover:from-blue-600/50 hover:to-blue-500/50 text-blue-300 rounded-lg transition-all duration-300 border border-blue-600/40 hover:border-blue-500/60 shadow-lg hover:shadow-blue-500/25 ${year === 'Second Year' ? 'p-1.5' : 'p-2.5'}`}
            >
              <FiLinkedin className={`${year === 'Second Year' ? 'w-3 h-3' : 'w-4 h-4'}`} />
            </motion.a>
          )}
          {member.instagram && (
            <motion.a
              href={`https://instagram.com/${member.instagram.replace('@', '').replace('/', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`${member.name}'s Instagram`}
              whileHover={{ 
                scale: 1.1, 
                rotate: -5,
                y: -2
              }}
              whileTap={{ scale: 0.9 }}
              className={`bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600/50 hover:to-purple-600/50 text-pink-300 rounded-lg transition-all duration-300 border border-pink-600/40 hover:border-pink-500/60 shadow-lg hover:shadow-pink-500/25 ${year === 'Second Year' ? 'p-1.5' : 'p-2.5'}`}
            >
              <FiInstagram className={`${year === 'Second Year' ? 'w-3 h-3' : 'w-4 h-4'}`} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Decorative 3D Elements */}
      {year === 'Second Year' ? (
        // Compact decorative elements for second year
        <>
          <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-1/2 right-4 w-0.5 h-0.5 bg-green-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-900" />
          {/* Cool floating mini particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-60"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 30 - 15],
                  y: [0, Math.random() * 20 - 10]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
                style={{
                  left: `${30 + i * 40}%`,
                  top: `${30 + i * 20}%`
                }}
              />
            ))}
          </div>
        </>
      ) : (
        // Regular decorative elements for other years
        <>
          <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-1/2 left-3 w-1 h-1 bg-green-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-900" />
        </>
      )}
    </div>
  </motion.div>
));

TeamMemberCard.displayName = 'TeamMemberCard';

const TeamsPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

  // Organize team data with updated year classifications
  const teamData: TeamData = useMemo(() => ({
    alumni: yearMapping.alumni,
    finalYears: yearMapping.finalYears,
    thirdYears: yearMapping.thirdYears,
    secondYears: yearMapping.secondYears,
    headCoordinators: yearMapping.headCoordinators
  }), []);

  // Get all unique teams for filtering
  const allTeams = useMemo(() => {
    const teams = new Set<string>();
    Object.values(teamData).flat().forEach(member => {
      teams.add(member.team);
    });
    return Array.from(teams).sort();
  }, [teamData]);

  // Filter and search logic
  const filteredMembers = useMemo(() => {
    let filtered: { member: TeamMember; year: string }[] = [];

    // Add members from selected year or all years (excluding alumni unless specifically selected)
    if (selectedYear === 'all') {
      filtered = [
        ...teamData.headCoordinators.map(member => ({ member, year: 'Head Coordinator' })),
        ...teamData.finalYears.map(member => ({ member, year: 'Final Year' })),
        ...teamData.thirdYears.map(member => ({ member, year: 'Third Year' })),
        ...teamData.secondYears.map(member => ({ member, year: 'Second Year' }))
        // Alumni excluded from default view
      ];
    } else {
      const yearMap: { [key: string]: { members: TeamMember[]; yearLabel: string } } = {
        'head': { members: teamData.headCoordinators, yearLabel: 'Head Coordinator' },
        'alumni': { members: teamData.alumni, yearLabel: 'Alumni' },
        'final': { members: teamData.finalYears, yearLabel: 'Final Year' },
        'third': { members: teamData.thirdYears, yearLabel: 'Third Year' },
        'second': { members: teamData.secondYears, yearLabel: 'Second Year' }
      };
      
      if (yearMap[selectedYear]) {
        filtered = yearMap[selectedYear].members.map(member => ({
          member,
          year: yearMap[selectedYear].yearLabel
        }));
      }
    }

    // Filter by team
    if (selectedTeam !== 'all') {
      filtered = filtered.filter(({ member }) => member.team === selectedTeam);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(({ member }) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.team.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [teamData, selectedYear, selectedTeam, searchTerm]);

  // Group filtered members by year for display
  const groupedMembers = useMemo(() => {
    const groups: { [key: string]: { member: TeamMember; year: string }[] } = {};
    
    filteredMembers.forEach(item => {
      if (!groups[item.year]) {
        groups[item.year] = [];
      }
      groups[item.year].push(item);
    });

    // Sort groups by hierarchy
    const yearOrder = ['Head Coordinator', 'Alumni', 'Final Year', 'Third Year', 'Second Year'];
    const sortedGroups: { [key: string]: { member: TeamMember; year: string }[] } = {};
    
    yearOrder.forEach(year => {
      if (groups[year]) {
        sortedGroups[year] = groups[year];
      }
    });

    return sortedGroups;
  }, [filteredMembers]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-white transition-all duration-300 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700/50 hover:border-gray-600/50"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4">
            <div className="flex items-center">
              <FiUsers className="text-4xl text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Meet Our Team
              </h1>
            </div>
            <button
              onClick={() => setSelectedYear('alumni')}
              className="ml-0 sm:ml-6 px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-full shadow-lg border border-green-400/30 transition-all duration-300"
            >
              Show Alumni
            </button>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know the passionate individuals driving our environmental mission forward.
          </p>
        </motion.section>

        {/* Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/60 backdrop-blur-2xl rounded-3xl border border-gray-700/50 p-8 mb-16 shadow-2xl relative z-[2000]"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-600/50"
              />
            </div>

            <div className="flex gap-4">
              {/* Year Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                  className="flex items-center gap-3 px-3 sm:px-6 py-3 sm:py-4 bg-gray-700/50 border border-gray-600/50 rounded-2xl text-white hover:bg-gray-600/50 transition-all duration-300 backdrop-blur-sm min-w-[120px] sm:min-w-[180px] shadow-lg hover:shadow-xl text-xs sm:text-base"
                >
                  <FiFilter className="text-green-400" />
                  <span className="font-medium">{selectedYear === 'all' ? 'All Years' : selectedYear.charAt(0).toUpperCase() + selectedYear.slice(1)}</span>
                  <FiChevronDown className={`transition-transform duration-300 ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isYearDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-[1000] min-w-full overflow-hidden"
                    >
                      {['all', 'head', 'alumni', 'final', 'third', 'second'].map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsYearDropdownOpen(false);
                          }}
                          className="block w-full text-left px-6 py-3 hover:bg-gray-700/50 text-white transition-all duration-200 font-medium hover:text-green-400 first:rounded-t-2xl last:rounded-b-2xl"
                        >
                          {year === 'all' ? 'All Years' : 
                           year === 'head' ? 'Head Coordinators' :
                           year === 'alumni' ? 'Alumni' :
                           year === 'final' ? 'Final Year' :
                           year === 'third' ? 'Third Year' : 'Second Year'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Team Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  className="flex items-center gap-3 px-3 sm:px-6 py-3 sm:py-4 bg-gray-700/50 border border-gray-600/50 rounded-2xl text-white hover:bg-gray-600/50 transition-all duration-300 backdrop-blur-sm min-w-[120px] sm:min-w-[180px] shadow-lg hover:shadow-xl text-xs sm:text-base"
                >
                  <FiUsers className="text-green-400" />
                  <span className="font-medium truncate">{selectedTeam === 'all' ? 'All Teams' : selectedTeam}</span>
                  <FiChevronDown className={`transition-transform duration-300 ${isTeamDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isTeamDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-[1000] min-w-full max-h-60 overflow-y-auto"
                    >
                      <button
                        onClick={() => {
                          setSelectedTeam('all');
                          setIsTeamDropdownOpen(false);
                        }}
                        className="block w-full text-left px-6 py-3 hover:bg-gray-700/50 text-white transition-all duration-200 font-medium hover:text-green-400 rounded-t-2xl"
                      >
                        All Teams
                      </button>
                      {allTeams.map((team) => (
                        <button
                          key={team}
                          onClick={() => {
                            setSelectedTeam(team);
                            setIsTeamDropdownOpen(false);
                          }}
                          className="block w-full text-left px-6 py-3 hover:bg-gray-700/50 text-white transition-all duration-200 font-medium hover:text-green-400 last:rounded-b-2xl"
                        >
                          {team}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-gray-400 text-sm font-medium bg-gray-700/30 px-4 py-2 rounded-xl backdrop-blur-sm">
              {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </motion.section>

        {/* Team Members */}
        <div className="space-y-12">
          {Object.entries(groupedMembers).map(([year, members], groupIndex) => (
            <motion.section
              key={year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + groupIndex * 0.1 }}
              className="space-y-8"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4 relative"
                >
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {year}
                  </span>
                  <span className="text-green-400 ml-3 text-2xl md:text-3xl">
                    ({members.length})
                  </span>
                </motion.h2>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-32 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mx-auto rounded-full shadow-lg shadow-green-500/50"
                />
              </div>

              {/* Members Grid - unified for all years, 4 cards per row */}
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {members.map(({ member, year: memberYear }, index) => (
                    <motion.div
                      key={`${member.name}-${member.team}`}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -50 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      className="h-full min-h-[340px]"
                    >
                      <TeamMemberCard member={member} year={memberYear} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FiUsers className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No members found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedYear('all');
                setSelectedTeam('all');
                setSearchTerm('');
              }}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
