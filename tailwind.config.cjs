/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D96C4A',
        secondary: '#6F8A63',
        brand: {
          dark: '#F6F4EF',
          section: '#ECE7DE',
          surface: '#FFFFFF',
          text: '#1E1E1E',
          muted: '#6B6B6B',
          line: '#E4DFD6',
          input: '#DAD4C8',
          placeholder: '#9A9A9A',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        soft: '0 16px 36px -24px rgba(51, 45, 39, 0.28)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rise: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        rise: 'rise 0.65s ease both',
      },
    },
  },
  plugins: [],
}
