/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./stories/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {}
    },
    theme: {
      ...defaultTheme.theme,
      xss: '500px'
    }
  },
  plugins: []
};
