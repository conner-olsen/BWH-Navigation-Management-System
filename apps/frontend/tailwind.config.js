/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'red': '#bd0000',
        'light-blue': '#3382fe',
        'medium-blue': '#0047b7',
        'dark-blue': '#012d5a',
        'white': '#f5f5f5',
        'gray': '#d9d9d9',
      }
    },
  },
  plugins: [],
};
