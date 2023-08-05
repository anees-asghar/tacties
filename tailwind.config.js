/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "blue": "#102937",
      "green": "#39AC80",
      "red": "#D68877",
      "white": "#FFFFFF",
      "black": "#000000"
    },
    fontFamily: {
      "roboto": ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}

