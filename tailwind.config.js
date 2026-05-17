/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        cream: "#f5f3ef",
        "off-black": "#0e0e0e",
        "mid-gray": "#6b6b6b",
        "border-light": "#e5e2dc",
        forest: "#2d6a4f",
      },
    },
  },
  plugins: [],
};
