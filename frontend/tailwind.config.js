/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  colors: {
        'primary': '#089bab',
        'secondary': '#fc9e5b',
        'textLight' : '#676c70',
        'white': '#ffffff',
        'background': '#eff7f8',
      },
    extend: {
      spacing: {
        'small': '32px',
        'medium': '36px',
        'large': '80px',
      },
    },
  },
  plugins: [],
};
