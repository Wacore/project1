/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  plugins: [],
};
