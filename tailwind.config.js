// tailwind.config.js
const { colors, fontSize, spacing } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        ...colors,
        redChiper: '#FA0236',
      },
      spacing: {
        ...spacing,
        72: '18rem',
        84: '21rem',
        96: '24rem',
        128: '34rem',
        '3/4': '75%',
      },
      fontSize: {
        ...fontSize,
        xxs: '.625rem',
        xxxs: '.5rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
    },
  },
  variants: {},
  plugins: [],
};
