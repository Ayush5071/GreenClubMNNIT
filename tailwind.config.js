module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      textShadow: {
        glow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5)',
        'aurora-glow': '0 0 10px rgba(0, 255, 127, 0.7), 0 0 20px rgba(0, 255, 127, 0.7)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};
