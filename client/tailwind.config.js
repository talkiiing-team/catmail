/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@vkontakte/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "primary-text": "var(--color-primary-text, #000)",
      },
    },
  },
  plugins: [],
};
