import React from "react";

const CustomFooter = () => (
  <footer className="w-full py-6 bg-gray-950 border-t border-green-900 text-center mt-12">
    <div className="text-gray-300 text-sm flex flex-col items-center gap-1">
      <span>
        Made with <span className="text-red-500">♥</span> by
        <a
          href="https://ayushtiwari.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:underline ml-1"
        >
          Ayush Tiwari
        </a>
      </span>
      <span className="text-xs text-green-500 mt-1">GREEN Club MNNIT &copy; {new Date().getFullYear()} All rights reserved.</span>
    </div>
  </footer>
);

export default CustomFooter;
