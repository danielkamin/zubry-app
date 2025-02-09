module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  media: false,
  theme: {
    extend: {
      colors: {
        'primary-1': '#fffee6',
        'primary-2': '#fff7a3',
        'primary-3': '#fff07a',
        'primary-4': '#ffe552',
        'primary-5': '#ffd829',
        'primary-6': '#ffc800',
        'primary-7': '#d9a300',
        'primary-8': '#b38000',
        'primary-9': '#8c6000',
        'primary-10': '#664200'
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
