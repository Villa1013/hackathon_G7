// tailwind.config.js
const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        ...colors,
        redChiper: '#FA0236',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
        128: '34rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
