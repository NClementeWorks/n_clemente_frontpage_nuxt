// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig ({

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    'vuetify-nuxt-module',
  ],
  
  vuetify: {
    vuetifyOptions: './vuetify.config.ts',
    moduleOptions: {
      /* other module options */
      styles: { configFile: 'assets/sass/vuetify_settings.scss' }
    },
  },

  tailwindcss: {
    configPath: "./tailwind.config.ts",
  },
})
