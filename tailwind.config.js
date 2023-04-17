/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        sm: "540px",
        md: "728px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1519px",
      },
      container: {
        center: true,

        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "2rem",
          xl: "2rem",
          "2xl": "2rem",
        },
      },
      colors: {
        primary: "#2A79FF",
        danger: "#FF0101",
        warning: "#FFC107",
        gray: "#ddd",
        white: "#fff",
        "light-gray": "#797979",
        "light-primary": "#2A79FF1A",
        "ligt-secondary": "#EAF2FF",
        slate: "#F1F1F1",
        orange: "#FF5722",
        black: "#000000",
        "light-black": "#262626",
      },

      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
      },
    },
  },

  // plugins: [require("tailwindcss")],
};
