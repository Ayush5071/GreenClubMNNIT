"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";


const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
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
    if (!formData.name || !formData.contact || !formData.message) {
      setStatus("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/contactMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", contact: "", message: "" });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus("❌ Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <motion.section ref={containerRef}>
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bebas text-white mb-4 antialiased font-bold"
            style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(34,197,94,0.4)' }}
          >
            GET IN TOUCH
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-green-300 font-Sfpro max-w-2xl mx-auto leading-relaxed antialiased"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Have a question or want to share something? Fill the form below!
          </motion.p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white font-Sfpro text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800/50 border border-green-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-white font-Sfpro text-sm font-medium mb-2">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800/50 border border-green-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                placeholder="Your Contact Number"
              />
            </div>
            <div>
              <label className="block text-white font-Sfpro text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-zinc-800/50 border border-green-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="What do you want to tell us?"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl border border-green-400/50 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <div
                className={`text-center p-3 rounded-lg border ${
                  status.includes("✅")
                    ? "text-green-400 bg-green-900/20 border-green-700/50"
                    : status.includes("❌")
                    ? "text-red-400 bg-red-900/20 border-red-700/50"
                    : "text-blue-400 bg-blue-900/20 border-blue-700/50"
                }`}
              >
                <p className="text-sm font-medium">{status}</p>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
