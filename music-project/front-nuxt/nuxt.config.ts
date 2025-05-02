// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],

  apollo: {
    authType: 'Bearer',
    authHeader: 'Authorization',
    clients: {
      default: {
        httpEndpoint: 'http://localhost:3001/graphql',
        tokenStorage: 'cookie',
        httpLinkOptions: {
          credentials: 'include',
        },
        tokenName: 'token',
        authType: 'Bearer',
        authHeader: 'Authorization',
        connectToDevTools: true
      },
    }
  },

  runtimeConfig: {
    public: {
      apiHost: 'http://localhost:3001'
    },
  }
})