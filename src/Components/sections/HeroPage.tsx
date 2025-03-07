"use client";
import React from "react";
import { WavyBackground } from "../ui/HomePage";

function HeroPage() {
  return (
    <WavyBackground className="max-w-7xl mx-auto notallow flex items-center justify-center h-screen">
      <div className="">
      <p className="text-4xl font-bebas sm:text-5xl md:text-6xl lg:text-7xl text-white font-extrabold inter-var text-center">
        GREEN CLUB MNNIT
      </p>
      <p className="text-lg font-Sfpro md:text-xl mt-4 text-white font-bold inter-var text-center max-w-3xl mx-auto">
      The Green Club at MNNIT is dedicated to fostering a sustainable and eco-friendly campus. Through initiatives such as tree plantation drives, plastic waste reduction, animal care, and environmental awareness campaigns, we strive to create a positive impact on our surroundings.      </p>
      <p className="text-base font-Sfpro md:text-lg mt-6 text-white font-extrabold inter-var text-center max-w-3xl mx-auto">
        Join us in our journey to preserve nature, reduce our carbon footprint, and make MNNIT a cleaner, greener, and more sustainable place for all. From promoting plant care to spreading awareness on sustainability, together, we can create a lasting positive impact.
      </p>
      </div>

    </WavyBackground>
  );
}

export default HeroPage;
