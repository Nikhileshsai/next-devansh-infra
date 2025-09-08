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
      /* variation 1: earth tone
        'background-light': '#FAF9F6',
      'background-dark': '#3E3A38',
      'card-light': '#FFFFFF',
      'card-dark': '#4B463F',
      'text-light': '#2F2D2B',
      'text-dark': '#E6E1DC',
      'primary': '#4F7942',
      'primary-hover': '#3E6B32',
      'secondary': '#A29F97',
      'footer-bg': '#494337',
      'footer-text': '#E6E1DC',
      */
      /* variation 2: calm muted pastels
      */
      'background-light': '#F5F7FA',
      'background-dark': '#3B3F48',
      'card-light': '#FFFFFF',
      'card-dark': '#4E535D',
      'text-light': '#3B4151',
      'text-dark': '#D6D9E1',
      'primary': '#7AA9E9',
      'primary-hover': '#5A7FCC',
      'secondary': '#A1AEC9',
      'footer-bg': '#354152',
      'footer-text': '#E1E5F0',
      /*
      */
      /* variation 3: browns
      'background-light': '#F9F8F6',
      'background-dark': '#44403C',
      'card-light': '#FFFFFF',
      'card-dark': '#605C54',
      'text-light': '#3C3A36',
      'text-dark': '#E3DFD9',
      'primary': '#8C6A43',
      'primary-hover': '#73582F',
      'secondary': '#ADA697',
      'footer-bg': '#5C574E',
      'footer-text': '#E3DFD9',
      */
      /*
      'background-light': '#FFF7F2',
      'background-dark': '#4B4F54',
      'card-light': '#FFFFFF',
      'card-dark': '#62676C',
      'text-light': '#3A3F40',
      'text-dark': '#DADCDD',
      'primary': '#E9A78A',
      'primary-hover': '#D4886F',
      'secondary': '#B9BEBF',
      'footer-bg': '#505459',
      'footer-text': '#DADCDD',
      */
      }
    },
  },
  plugins: [],
}
