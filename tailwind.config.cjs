/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#147D6C',
        'primary-hover': '#1695A3',
        secondary: '#2D388A',
        accent: '#00AEEF',
        gold: '#F6BE21',
        brand: {
          dark: '#F4FAF9',
          section: '#EAF4F2',
          surface: '#FFFFFF',
          text: '#173A35',
          muted: '#5A746F',
          line: '#CFE0DC',
          input: '#BFD4CF',
          placeholder: '#8BA5A0',
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
