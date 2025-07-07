"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";


const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Sending...");

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      // Send to server-side API (Nodemailer)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("❌ Failed to send message. Please try emailing us directly at greenclub@mnnit.ac.in");
    } finally {
      setIsLoading(false);
      // Clear status after 5 seconds
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-32 overflow-hidden"
      id="contact"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
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
            GET IN TOUCH
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-green-300 font-Sfpro max-w-4xl mx-auto leading-relaxed antialiased"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Ready to join the green revolution? Let&apos;s connect and make a difference together
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Info Cards */}
            <div className="space-y-6">
              <motion.div
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bebas text-white">Email Us</h3>
                    <p className="text-green-300 font-Sfpro">greenclub@mnnit.ac.in</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bebas text-white">Visit Us</h3>
                    <p className="text-green-300 font-Sfpro">MNNIT Allahabad, Prayagraj</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bebas text-white">Follow Us</h3>
                    <p className="text-green-300 font-Sfpro">@greenclub_mnnit</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Motivational Quote */}
            <motion.div
              className="bg-gradient-to-br from-zinc-800/50 to-zinc-700/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <blockquote className="text-lg text-green-300 font-Sfpro italic leading-relaxed">
                &ldquo;Every great journey begins with a single step. Your message could be the spark that ignites the next big environmental change.&rdquo;
              </blockquote>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20 shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-white font-Sfpro text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-white font-Sfpro text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </motion.div>

              {/* Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-white font-Sfpro text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-white font-Sfpro text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-zinc-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your ideas, suggestions, or how you'd like to contribute to our green initiatives..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl border border-green-400/50 transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                {isLoading ? "Sending..." : "Send Message 🌱"}
              </motion.button>

              {/* Status Message */}
              {status && (
                <motion.div
                  className={`text-center p-4 rounded-lg border ${
                    status.includes("✅") 
                      ? "text-green-400 bg-green-900/20 border-green-700/50" 
                      : status.includes("❌") 
                      ? "text-red-400 bg-red-900/20 border-red-700/50"
                      : "text-blue-400 bg-blue-900/20 border-blue-700/50"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-medium">{status}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
