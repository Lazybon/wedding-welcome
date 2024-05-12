/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const { addDynamicIconSelectors } = require('@iconify/tailwind')

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '450px' },
      },
      container: {
        center: true,
      },
      fontFamily: {
        primary: 'Calme Extra',
      },
      keyframes: {
        show: {
          '0%': { opacity: 0 },
          '100%%': { opacity: 1 },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      spacing: {
        1: '10px',
        2: '20px',
        3: '30px',
        4: '40px',
        5: '50px',
        6: '60px',
      },
      animation: {
        'fade-in-down': 'fade-in-down 1.5s ease-out',
      },
    },
  },
  daisyui: {
    themes: ['wireframe'],
  },
  // eslint-disable-next-line no-undef
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    addDynamicIconSelectors(),
  ],
}
