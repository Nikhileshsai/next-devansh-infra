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
        // Softer shades for backgrounds
        'background-light': '#F3F4F6', // Light gray
        'background-dark': '#1F2937',  // Darker gray

        // Softer shades for cards/elements (avoiding pure white)
        'card-light': '#F9FAFB', // Very light gray, almost white but not pure
        'card-dark': '#374151',  // Slightly lighter dark gray for cards

        // Text colors with good contrast
        'text-light': '#111827', // Very dark gray for light theme text
        'text-dark': '#E5E7EB',  // Light gray for dark theme text
        
        // Primary and secondary colors (can remain vibrant if they contrast well)
        'primary': '#3B82F6', // A friendly blue
        'primary-hover': '#2563EB',
        'secondary': '#6B7280', // A neutral gray for secondary text
      }
    },
  },
  plugins: [],
}