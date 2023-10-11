import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import { useColor } from './composables/color'

const color = useColor ()


  // green rgb: '(50, 222, 179)',
  // magenta rgb: '(237, 36, 244)',
  // cyan rgb: '(29, 187, 226)',

const custom_theme = {
  dark: false,
  colors: {
    // background: '#fff',
    surface: color.theme.off_white,
    primary: color.theme.blue,
    secondary: color.theme.cyan,
    // error: ovf_colors.red,
    info: color.theme.cyan,
    success: color.theme.green,
    // warning: ovf_colors.orange_bright,
    ...color.theme,
  },
}

export default defineVuetifyConfiguration ({

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

    // Buttons

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

    // Cards

    VCard: {
      flat: true,
    },

    // Forms

    VTextField: {
      density: 'compact',
      variant: 'underlined',
    }
  },

})