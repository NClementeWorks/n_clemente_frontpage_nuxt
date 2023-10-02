// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig ({

  devtools: { enabled: true },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
  ],
  
  vuetify: {
    vuetifyOptions: './vuetify.config.ts',
    moduleOptions: {
      /* other module options */
      styles: { configFile: 'assets/sass/vuetify_settings.scss' }
    },
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
})
