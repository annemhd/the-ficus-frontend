// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [
  ],
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirect: false
  }
})