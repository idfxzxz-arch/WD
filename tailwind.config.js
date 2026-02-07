/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
 theme: {
  extend: {
    fontFamily: {
      genz: ["Space Grotesk", "sans-serif"],
    },

      letterSpacing: {
        ultra: ".2em",
      },

      animation: {
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },

    },
  },
  plugins: [],
}
