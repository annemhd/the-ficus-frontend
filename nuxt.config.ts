// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [
  ],
   css: ['/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  supabase: {
    redirect: false
  }
})