/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "white": "#FFFFFF",
      "black": "#000000",
      "gray": "#7f7f7f"
    },
    fontFamily: {
      "roboto": ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}

