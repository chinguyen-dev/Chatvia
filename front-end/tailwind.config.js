/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray87: "#878a92",
        gray49: "#495057",
      },
      boxShadow: {
        "3xl": "0 2px 4px rgba(15, 34, 58, 0.12)",
      },
    },
  },
  plugins: [],
};
