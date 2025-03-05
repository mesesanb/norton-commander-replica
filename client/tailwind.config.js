/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include toate fișierele relevante din folderul `src`
  ],
  theme: {
    extend: {
      colors: {
        nortonBackground: '#0000a8',
        nortonText: '#57ffff',
        nortonButton: '#00a8a8',
        nortonInfo: '#ffff55',
      },
      fontFamily: {
        dos: ['Dos', 'monospace'],
      },
    },
  },
  plugins: [],
};
