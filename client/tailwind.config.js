/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nortonBackground: '#0000af',
        nortonText: '#57ffff',
        nortonButton: '#00a8a8',
        nortonInfo: '#ffff55',
      },
      fontFamily: {
        dos: ['Dos', 'monospace'],
      },
      fontSize: {
        base: '16px',
      },
    },
  },
  plugins: [],
};
