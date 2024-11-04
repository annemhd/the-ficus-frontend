export default defineNuxtRouteMiddleware((to, from) => {
  if (from.name !== 'signin') {
    return navigateTo('/auth/signin')
  }
})

