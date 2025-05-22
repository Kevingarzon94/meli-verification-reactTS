/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meli: {
          yellow: '#FFE600',
          blue: '#3483FA',
          'dark-blue': '#2968c8',
          black: '#333333',
          gray: '#EEEEEE',
          'dark-gray': '#999999',
        },
        'meli-yellow': '#FFE600',
        'meli-blue': '#3483FA',
        'meli-dark-blue': '#2968c8',
        'meli-black': '#333333',
        'meli-gray': '#EEEEEE',
        'meli-dark-gray': '#999999',
      },
      fontFamily: {
        sans: ['Proxima Nova', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}