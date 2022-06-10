/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: { spinner: "spinner 1s infinite" },
      keyframes: {
        spinner: {
          "100%": { "box-shadow": "0 0 0 30px theme(colors.pink.400)" }
        }
      }
    }
  },
  plugins: []
};
