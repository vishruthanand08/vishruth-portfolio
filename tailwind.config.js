/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable toggling dark/light via class
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        lightbg: "#f9f9f9",
        lighttext: "#111111",
        darkbg: "#0a0a0a",
        darktext: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
