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
        'colorVia': '#22dcbd',
        'brandBackground': '#02000f',
        'iconColor': '#4a5568'
      },
      animation: {
        decrease: 'decrease 3s linear forwards',
        slideIn: 'slideIn .3s ease-out reverse'
      },
      keyframes: {
        decrease: {
          '0%': { width: '100%' },
          '25%': { width: '75$'},
          '50%': { width: '50%' },
          '75%': { width: '25%' },
          '100%': { width: '0' }
        },
        slideIn: {
          '0%': { transform:  'translateX(0px)' },
          '100%': { transform:'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
