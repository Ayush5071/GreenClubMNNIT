"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Mission = () => {
  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-zinc-950 px-4 py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glassmorphism Card */}
      <motion.div
        className="backdrop-blur-2xl bg-white/5 border border-green-500/20 rounded-3xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bebas text-green-300 mb-6 text-center drop-shadow-lg">
          No Active Mission
        </h1>
        <p className="text-lg md:text-xl text-zinc-200 text-center mb-8 font-Sfpro">
          Currently, Green Club MNNIT is not involved in any official mission or program.<br />
          Stay tuned for future updates and opportunities to join our movement for a greener campus and planet!
        </p>
        <Link href="/">
          <motion.button
            className="mt-4 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl border border-green-400/50 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            Go to Home Page
          </motion.button>
        </Link>
      </motion.div>
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-56 h-56 bg-emerald-400/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.section>
  );
};

export default Mission;
