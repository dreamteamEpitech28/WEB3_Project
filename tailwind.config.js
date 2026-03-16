/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        "gold-400": "rgb(240 230 140)",
        "silver-300": "rgb(212 212 216)",
      },
      boxShadow: {
        "watch-glow": "0 0 40px rgba(240, 230, 140, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
