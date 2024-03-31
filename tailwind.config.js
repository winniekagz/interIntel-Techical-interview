/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        jakartaSans: ["Plus Jakarta Sans"],
        PublicSans: ["Public Sans"],
      },
      colors: {
        darkGray: "#F0F7F0",
        blackest: "#212121",
        darkBlue: "#261f5d",
        green: "#261f5d",
        lightGreen: "#ECF7EC",
        black1: "#333",
        black2: "#222",
        black3: "rgba(20, 20, 20, 0.70)",

        lightBlue: "#45a0c6",
      },
      screens: {
        xs: "360px",
        ...defaultTheme.screens,
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
