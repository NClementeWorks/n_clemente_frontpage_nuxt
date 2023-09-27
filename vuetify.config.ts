import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

const theme_colors = {
  green: '#32deb3',
  magenta: '#ed24f4',
  cyan: '#1dbbe2',
  blue: '#0000B2',
  white: '#ffffff',
  off_white: '#F2F6F8',
  light_gray: 'rgba(0,0,0,.1)',
  black: '#000000',
}

  // green rgb: '(50, 222, 179)',
  // magenta rgb: '(237, 36, 244)',
  // cyan rgb: '(29, 187, 226)',

const custom_theme = {
  dark: false,
  colors: {
    // background: '#fff',
    surface: theme_colors.off_white,
    primary: theme_colors.blue,
    secondary: theme_colors.cyan,
    // error: ovf_colors.red,
    info: theme_colors.cyan,
    success: theme_colors.green,
    // warning: ovf_colors.orange_bright,
    ...theme_colors,
  },
}

export default defineVuetifyConfiguration({

  theme: {
    themes: { custom_theme },
    defaultTheme: 'custom_theme',
  },

  icons: {
    defaultSet: 'fa-svg'
  },

  aliases: {
    PrimaryBtn: 'VBtn',
    SecondaryBtn: 'VBtn',
  },

  defaults: {
    VBtn: {
      rounded: true,
    },

    PrimaryBtn: {
      rounded: true,
      color: 'primary',
    },
    
    SecondaryBtn: {
      variant: 'text',
      rounded: true,
      color: 'white',
      elevation: '0',
      appendIcon: 'fas fa-angles-down',
    },

  },

})