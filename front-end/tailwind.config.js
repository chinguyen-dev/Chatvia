/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray87: "#878a92",
        gray49: "#495057",
        muted: "#7a7f9a",
        primary: "#7269ef",
      },
      boxShadow: {
        "3xl": "0 2px 4px rgba(15, 34, 58, 0.12)",
        focus: "0 0 0 0.15rem #7269ef40",
      },
      translate: {
        "3d": "translate3d(-50%, -50%, 0)",
      },
      fontFamily: {
        nunito: '"Nunito", sans-serif',
      },
    },
  },
  plugins: [],
};
