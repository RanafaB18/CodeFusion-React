/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blackish': '#1a202c',
        'blacklike': '#2d3748',
        'whitish': '#edf2f7',
        'blackhover': '#4A5567',
        'whitelike': '#E1E8F0',
        'whitehover': '#edf1f5',
        'activeblue': '#2e5c86',
        'orangish': '#ED8835',
        'grayish': '#A1AEBE',
        'bluish': '#4299e1',
        'yellowish': '#FEECC8',
        'buttonBlue': '#59adeb',
        'colorFrom': '#ff7a1b',
        'colorTo': '#de3fe3',
        'colorVia': '#22dcbd'
      }
    },
  },
  plugins: [],
}
