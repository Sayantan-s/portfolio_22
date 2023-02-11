/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Unbounded", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
