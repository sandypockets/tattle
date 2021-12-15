const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: true,
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    safelist: [
      'grid-cols-1',
      'grid-cols-2',
      'grid-cols-3',
      'grid-cols-4',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '2xs': '330px',
        'xs': '475px',
        ...defaultTheme.screens,
      },
      maxWidth: {
        '7xs': '3rem',
        '6xs': '4rem',
        '5xs': '6rem',
        '4xs': '8rem',
        '3xs': '10rem',
        '2xs': '12rem',
        '1xs': '16rem',
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'min': 'min-content',
        'fit': 'fit-content',
        'full': '100%',
        '1/2': '50%',
        ...defaultTheme.maxWidth
      },
      fontSize: {
        '4xs': '.50rem',
        '3xs': '.55rem',
        '2xs': '.65rem',
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        ...defaultTheme.fontSize
      },
      spacing: {
        '128': '32rem',
        '150': '37.5rem',
        '180': '45rem',
        '190': '47.5rem',
        '200': '50rem',
        '250': '62.5rem',
        '256': '64rem',
        '320': '80rem',
      },
      animation: {
        'reverse-spin': 'reverse-spin 1s linear infinite'
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: 'rotate(360deg)'
          },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
