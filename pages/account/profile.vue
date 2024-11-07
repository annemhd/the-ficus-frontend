<template>
    <section class="prose">
        <h1>Profil</h1>
        <p>Hello {{ userInfo }} !</p>
    </section>
</template>

<script setup lang="ts">
import { getSession } from '~/services/users.supabase'

const userInfo = ref()

onMounted(async () => {
    userInfo.value = await getSession()
})
</script>
