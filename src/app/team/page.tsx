import React from "react";
import FinalYear from "@/Components/sections/FinalYear";
import ThirdYear from "@/Components/sections/ThirdYear";
import SecondYear from "@/Components/sections/SecondYear";

const TeamsPage = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white py-12 space-y-16">
      {/* Header Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-green-500 relative">
          <span className="relative">
            Meet Our Team
            <span className="absolute inset-0 text-shadow-glow"></span>
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Get to know the passionate individuals driving our mission forward!
        </p>
      </section>

      {/* Final Year Section */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center text-white relative">
          <span className="relative decoration-green-500 underline">
            Final Year Team
            <span className="absolute inset-0 text-shadow-glow"></span>
          </span>
        </h2>
        <FinalYear />
      </section>

      {/* Third Year Section */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center text-white relative">
          <span className="relative decoration-green-500 underline">
            Third Year Team
            <span className="absolute inset-0 text-shadow-glow"></span>
          </span>
        </h2>
        <ThirdYear />
      </section>

      {/* Second Year Section */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center text-white relative">
          <span className="relative decoration-green-500 underline">
            Second Year Team
            <span className="absolute inset-0 text-shadow-glow"></span>
          </span>
        </h2>
        <SecondYear />
      </section>
    </div>
  );
};

export default TeamsPage;
