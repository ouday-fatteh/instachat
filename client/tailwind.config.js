/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./assets/images/bg-pattern.svg')",
      },
    },
  },
  plugins: [],
};
