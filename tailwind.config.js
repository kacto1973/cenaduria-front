/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "verde-alamo": "#1a4731",
        "dorado-alamo": "#c5a059",
        "crema-fondo": "#fdfbf7",
      },
    },
  },
  plugins: [],
};
