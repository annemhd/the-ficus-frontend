import { useUser } from '~/composables/useUser'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUser()
    const user = userStore.user;
    if (user) {
        if (to.name === 'signin' || to.name === 'signup') {
            return navigateTo('/dashboard');
        }
    }
});
