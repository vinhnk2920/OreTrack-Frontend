export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'beebovocab',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios.js',],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAfWPHZQaE2INyFuPIH2GPVbPG-AmL74aU",
          authDomain: "beebovocab.firebaseapp.com",
          projectId: "beebovocab",
          storageBucket: "beebovocab.appspot.com",
          messagingSenderId: "877191793479",
          appId: "1:877191793479:web:b34728027547f37f8d5a62",
          measurementId: "G-3YPZHG4DVC"
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
      }
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    rewriteRedirects: true, // If enabled, user will redirect back to the original guarded route instead of redirect.home.
    fullPathRedirect: false, // If true, use the full route path with query parameters for redirect
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: 'http://8.219.131.182:8000',
        token: {
          property: 'token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'data'
        },
        refreshToken: {
          maxAge: 60 * 60 * 24 * 30
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },
}
