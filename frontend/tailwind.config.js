/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Rozha One"', '"Cinzel"', 'serif'],
        devanagari: ['"Tiro Devanagari Hindi"', '"Yatra One"', 'serif'],
      }
    },
  },
  plugins: [],
}