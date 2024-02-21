/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandgrey: '#faf3f8',// '#f8f8f8', // Replace with your desired color code
        branddark: '#171717',
        brandlight: '#e4915e',
        brandmedium: '#892912',
        brandwhite: '#ffffff',
      },
    },
  },
  plugins: [],
};
