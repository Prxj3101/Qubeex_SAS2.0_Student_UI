/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'shine-gradient': 'shine 3s linear infinite',
        'spin-y-slow': 'spinY 4s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        spinY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
};
