import { useUser } from '~/composables/useUser'



export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUser()
    const user = userStore.user
    // If the user is not authenticated and trying to access the dashboard
    if (!user && to.name === 'dashboard') {
        // Redirect to the signup page
        return navigateTo('/auth/signin'); // Change '/signup' to your signup route
    }
});