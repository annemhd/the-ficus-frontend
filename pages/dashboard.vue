<template>
    <section class="prose">
        <h1>Tableau de bord</h1>
        <p>Hello {{ userInfo }} !</p>
    </section>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/store/users.pinia'

const store = useUsersStore()
const userInfo = ref()

onMounted(() => {
    userInfo.value = store.user?.user?.user_metadata
})
</script>
