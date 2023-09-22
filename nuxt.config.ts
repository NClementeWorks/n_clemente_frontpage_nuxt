// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig ({

  devtools: { enabled: true },

  modules: [ '@nuxt/ui', '@nuxtjs/color-mode' ],

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
  
  // ui: {
  //   global: true,
  //   icons: ['fas']
  // }
})
