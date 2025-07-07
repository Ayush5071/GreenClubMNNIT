"use client";
import React, { useEffect, useState } from "react";
import { WavyBackground } from "../ui/HomePage";

function HeroPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const activities = [
    { emoji: "🌳", text: "Plant Trees" },
    { emoji: "🐾", text: "Care for Animals" },
    { emoji: "♻️", text: "Reduce Waste" },
    { emoji: "💧", text: "Water Conservation" },
  ];

  return (
    <WavyBackground className="max-w-7xl mx-auto notallow flex items-center justify-center h-screen relative overflow-hidden">
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-green-400 text-2xl opacity-30">🌿</div>
        <div className="absolute top-32 right-16 text-green-300 text-3xl opacity-20">🍃</div>
        <div className="absolute bottom-40 left-20 text-green-500 text-2xl opacity-25">🌱</div>
        <div className="absolute bottom-32 right-10 text-green-400 text-2xl opacity-30">🌸</div>
        <div className="absolute top-1/2 left-8 text-blue-300 text-2xl opacity-20">💫</div>
        <div className="absolute top-1/3 right-12 text-yellow-300 text-2xl opacity-25">🌟</div>
      </div>

      <div className={`text-center space-y-8 px-4 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 mb-6 shadow-lg">
          <span className="text-green-300 text-sm font-semibold mr-2">🌱</span>
          <span className="text-green-300 text-sm font-semibold">Growing a Greener Tomorrow</span>
        </div>
        
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bebas sm:text-7xl md:text-8xl lg:text-9xl text-white font-extrabold tracking-wide drop-shadow-2xl bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent">
            GREEN CLUB
          </h1>
          <p className="text-2xl font-bebas sm:text-3xl md:text-4xl lg:text-5xl text-green-300 font-bold tracking-wider drop-shadow-md">
            MNNIT ALLAHABAD
          </p>
        </div>
        
        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-2xl md:text-3xl text-white font-Sfpro font-semibold leading-relaxed drop-shadow-md">
            <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Nurturing Nature, Sustaining Life
            </span>
          </p>
          
          <p className="text-lg md:text-xl text-gray-200 font-Sfpro leading-relaxed max-w-3xl mx-auto">
            Creating a greener campus through <span className="text-green-300 font-bold">tree plantations</span>, 
            <span className="text-blue-300 font-bold"> wildlife care</span>, and <span className="text-yellow-300 font-bold">sustainability campaigns</span>.
          </p>
        </div>
        
        {/* Action Items */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 hover:border-green-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer group ${
                index === 0 ? 'animate-delay-0' : 
                index === 1 ? 'animate-delay-100' : 
                index === 2 ? 'animate-delay-200' : 'animate-delay-300'
              }`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {activity.emoji}
              </span>
              <span className="text-white font-semibold group-hover:text-green-200 transition-colors">
                {activity.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="pt-8 pb-8">
          <a href="/mission">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-500 hover:via-emerald-500 hover:to-green-400 text-white font-bold text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <span className="relative z-10 flex items-center space-x-2">
                <span>🌍</span>
                <span>Join Our Movement</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </a>
        </div>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div className="text-white/70">
            <div className="text-2xl font-bold text-green-300">500+</div>
            <div className="text-sm">Trees</div>
          </div>
          <div className="text-white/70">
            <div className="text-2xl font-bold text-blue-300">50+</div>
            <div className="text-sm">Campaigns</div>
          </div>
          <div className="text-white/70">
            <div className="text-2xl font-bold text-yellow-300">1000+</div>
            <div className="text-sm">Students</div>
          </div>
        </div>
        
      </div>
    </WavyBackground>
  );
}

export default HeroPage;
