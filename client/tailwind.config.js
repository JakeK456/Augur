/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily: {
        marcellus: ["Marcellus SC", "serif"],
        ubuntu: ["Ubuntu", "serif"],
        maven: ["Maven Pro", "serif"],
      },
      colors: {
        gray195: "#c3c3c3",
        primary: "#1d3557",
        secondary: "#a8dadc",
        background: "#d62828",
        "menu-hover": "#457b9d",
      },
    },
  },
  plugins: [],
};
