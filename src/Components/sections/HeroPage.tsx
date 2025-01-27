"use client";
import React from "react";
import { WavyBackground } from "../ui/HomePage";

function HeroPage() {
  return (
    <WavyBackground className="max-w-7xl mx-auto notallow flex items-center justify-center h-screen">
      <div className="">
      <p className="text-4xl font-bebas sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold inter-var text-center">
        GREEN CLUB MNNIT
      </p>
      <p className="text-lg font-Sfpro md:text-xl mt-4 text-white font-light inter-var text-center max-w-3xl mx-auto">
        The Green Club at MNNIT is dedicated to cultivating a sustainable and eco-friendly campus through tree plantation, plastic reduction, animal care, and environmental awareness initiatives. Our mission is to educate and inspire students to take action for a greener future.
      </p>
      <p className="text-base font-Sfpro md:text-lg mt-6 text-white font-normal inter-var text-center max-w-3xl mx-auto">
        Join us in our journey to preserve nature, reduce our carbon footprint, and make MNNIT a cleaner, greener, and more sustainable place for all. From promoting plant care to spreading awareness on sustainability, together, we can create a lasting positive impact.
      </p>
      </div>

    </WavyBackground>
  );
}

export default HeroPage;
