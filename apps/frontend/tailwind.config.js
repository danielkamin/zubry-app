module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './common/**/*.{js,ts,jsx,tsx}', './modules/**/*.{js,ts,jsx,tsx}'],
  media: false,
  theme: {
    extend: {
      colors: {
        primary: '#FFC800'
      },
      fontFamily: {
        open: "'Open Sans', sans-serif"
      },
      height: {
        v75: '75vh',
        v50: '50vh',
        v25: '25vh'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
