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
          light: '#2A5BA7',
          default: '#16428C',
          dark: '#282E62',
          darker: '#1C224C'
        },
        recipeGray: {
          lightest: '#FFFFFF',
          light: '#F5F5F0',
          mid:'#EAEAE0',
          default: '#DADAD1',
          dark: '#6C594F',
          darker: '#433B31',
        },
        recipeBrown: {
          light:'#9D8E7E',
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
