/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf8f6',
          100: '#f2eae1',
          200: '#e3d0be',
          300: '#d2b196',
          400: '#c18f6f',
          500: '#b47452',
          600: '#a66245',
          700: '#8a4f3b',
          800: '#714234',
          900: '#5c372c',
          950: '#321c16',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#faf8f6',
          muted: '#f2eae1',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
