module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'samurai': ['samurai', 'serif']
      },
      colors: {
        'theme-white': '#FEFEF9',
        'theme-black': '#393939',
        'theme-red': '#DB2F2F',
      }
    },
  },
  plugins: [],
}
