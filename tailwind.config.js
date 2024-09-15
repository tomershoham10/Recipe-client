/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1920px',
      '3xl': '2560px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        recipeGreen: {
          default: '#98AB85',
        },
        recipeBlue: {
          default: '#16428C',
        },
        recipeGray: {
          lightest: '#FFFFFF',
          light: '#F5F5F0',
          default: '#DADAD1',
          dark: '#6C594F',
          darker: '#433B31',
        },
        recipeBrown: {
          light: '#804F45',
          default: '#9E8E7D',
          dark: '#5A4A42',
        },
        recipeRed: {
          default: '#C0272D'
        },
      }
    },
  },
  plugins: [],
}
