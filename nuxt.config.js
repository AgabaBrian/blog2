export default {
  // Global page headers
  head: {
    title: 'blog-dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    '~/assets/css/tailwind.css',
  ],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',  // Add this line
  ],

  // Axios Configuration
  axios: {
    baseURL: 'https://junior-developer-assessment-blog.onrender.com',  // Base URL of your API
  },

  // Build Configuration
  build: {},
}
