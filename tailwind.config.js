/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "indian-orange": {
          50: "#fffaf4",
          100: "#fff5e8",
          200: "#ffe7c6",
          300: "#ffd9a4",
          400: "#ffbc60",
          500: "#FF9F1C",
          600: "#e68f19",
          700: "#bf7715",
          800: "#995f11",
          900: "#7d4e0e",
        },
        "indian-green": {
          50: "#f5fcfb",
          100: "#eaf9f8",
          200: "#cbf0ed",
          300: "#abe7e2",
          400: "#6dd6cc",
          500: "#2EC4B6",
          600: "#29b0a4",
          700: "#239389",
          800: "#1c766d",
          900: "#176059",
        },
      },
    },
  },
  plugins: [],
};
