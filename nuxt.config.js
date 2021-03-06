export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'zPrintFrontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css' },
      {rel: 'stylesheet', href: './styles/globalStyles.css'}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css

  css: [{ src: './styles/main.scss', lang: 'scss' }, { src: './styles/globalStyles.css', lang: 'css'}],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-js-toggle-button', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['./styles/main.scss'],
  },
  axios: {
    baseURL: 'http://127.0.0.1:3333/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
