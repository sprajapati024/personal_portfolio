import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        win95: {
          gray: '#c0c0c0',
          darkgray: '#808080',
          white: '#ffffff',
          black: '#000000',
          navy: '#000080',
          teal: '#008080',
        }
      },
      fontFamily: {
        win95: ['MS Sans Serif', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'raised': 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
        'pressed': 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080',
        'window': '2px 2px 0px #808080',
      },
      fontSize: {
        'win95-xs': ['10px', '12px'],
        'win95-sm': ['11px', '14px'],
        'win95-base': ['12px', '16px'],
        'win95-lg': ['14px', '18px'],
      }
    },
  },
  plugins: [],
} satisfies Config
