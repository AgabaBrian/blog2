export default {
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

  css: [
    '~/assets/css/tailwind.css',
  ],

  plugins: [{ src: '~/plugins/toast.js', mode: 'client' }],

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'https://junior-developer-assessment-blog.onrender.com/api',  
  },

  build: {},

  // Production configuration settings
  vue: {
    config: {
      productionTip: false, // Disable the production tip
      devtools: false // Disable DevTools in production
    }
  }
}
