<template>
    <section class="prose">
        <h1>Tableau de bord</h1>
        <p>Hello {{ userInfos }} !</p>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'dashboard',
})

import { getUserById } from '~/services/users'

const currentUser: any = useCookie('current-user')
const userInfos: any = ref()

onMounted(async () => {
    userInfos.value = await getUserById(currentUser.value?.uid)
})
</script>
