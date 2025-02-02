"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoginPage = () => {
  const pageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  const redirectToHome = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-black text-green-300 h-screen flex flex-col justify-center items-center px-6 text-center"
    >
      <h1
        ref={textRef}
        className="text-3xl md:text-5xl font-bold text-center soft-neon-text"
      >
        🌱 Green Club - Coming Soon!
      </h1>
      <p className="text-md md:text-lg mt-2 text-green-400 opacity-90 max-w-lg">
        We are working on something amazing. Stay connected for updates!
      </p>
      <button
        ref={buttonRef}
        onClick={redirectToHome}
        className="mt-5 px-6 py-3 text-black bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-md soft-neon-btn border-none cursor-pointer text-lg rounded-lg"
      >
        Back to Home
      </button>

      {/* Style Enhancements */}
      <style jsx>{`
        .soft-neon-text {
          text-shadow: 0 0 3px #00ff00, 0 0 6px rgba(0, 255, 0, 0.5);
        }

        .soft-neon-btn {
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
        }

        .soft-neon-btn:hover {
          box-shadow: 0 0 12px rgba(0, 255, 0, 0.7);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
