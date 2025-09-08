/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'background-light': '#F7F6F2',
        'background-dark': '#484849',
        'card-light': '#A6A3A7',
        'card-dark': '#3F3F46',
        'text-light': '#222222',
        'text-dark': '#E5E7EB',
        'primary': '#2563EB',
        'primary-hover': '#1D4ED8', // A slightly darker blue for hover
        'secondary': '#6B7280',
        'footer-bg': '#374151',
        'footer-text': '#F3F4F6',
      }
    },
  },
  plugins: [],
}
