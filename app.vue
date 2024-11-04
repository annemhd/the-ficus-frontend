<template>
    <NuxtLayout :name="layout">
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
const route = useRoute()
const layout = computed(() =>
    route.name === 'auth-signin' ||
    route.name === 'auth-signup' ||
    route.name === 'auth-confirmation'
        ? 'authentification'
        : route.name === 'dashboard'
        ? 'default'
        : 'default'
)
</script>
