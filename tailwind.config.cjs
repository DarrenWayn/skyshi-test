/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        activity: "repeat(auto-fit, minmax(135px, 1fr))",
      },
    },
  },
  plugins: [],
};
