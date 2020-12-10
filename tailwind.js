// tailwind.config.js
const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  theme: {
    extend: {
      ...colors,
      redChiper: '#FA0236',
    },
  },
  variants: {},
  plugins: [],
};
