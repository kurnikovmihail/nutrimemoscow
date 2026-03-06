/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        secondary: '#66BB6A',
        brand: {
          dark: '#121212',
          surface: '#1E1E1E',
          text: '#F5F5F5',
          muted: '#B0B0B0',
          accent: '#FFB74D',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 44px -24px rgba(0, 0, 0, 0.65)',
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
