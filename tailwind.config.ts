/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './src/**/*.{js,jsx,ts,tsx}',
  './public/index.html',
],
  theme: {
    extend: {
       keyframes: {
        slideBefore: {
          '0%': { transform: 'translateX(0%) translateY(-50%)' },
          '100%': { transform: 'translateX(100%) translateY(-50%)' },
        },
      },
      animation: {
        'before-slide': 'slideBefore 1.8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

