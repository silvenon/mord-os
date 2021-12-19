module.exports = {
  content: ['./index.html', './src/**/*.ts?(x)'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
