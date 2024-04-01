/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],
   theme: {
    extend: {
      colors:{
        'dark-blue':'#1a4068',
        'light-blue-bg':'#F3F5F7',
        blue:'#3876B7',
        'light-orange-bg':'#FFFBF2',
        gray:'#D9D9D9',
        orange:'#FFA500'
      },
      fontFamily:{
        'lato':['Lato','sans-serif'],
        'montserrat':['Montserrat','sans-serif']
      },
      fontSize:{
        'header':'32px'
      }
    },
  },

  plugins: [require("flowbite/plugin")],
};
