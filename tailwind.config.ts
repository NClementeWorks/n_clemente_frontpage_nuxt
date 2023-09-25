import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const colors = {
  green: {
    hex: '#32deb3',
    rgb: '(50, 222, 179)',
  },
  magenta: {
    hex: '#ed24f4',
    rgb: '(237, 36, 244)',
  },
  cyan: {
    hex: '#1dbbe2',
    rgb: '(29, 187, 226)',
  },
  blue: {
    hex: '#0000B2',
  },
}

export default <Partial <Config> > {
  theme: {
    extend: {

      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        sky: colors.cyan,
        pink: colors.magenta,
        green: colors.green,
        blue: colors.blue,
        primary: colors.blue,
      },

    },
  },
};