// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [
    { src: '~/plugins/firebase.js', mode: 'client' }
  ],
  modules: ['@nuxt/ui']
})