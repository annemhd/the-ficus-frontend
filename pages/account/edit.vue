<template>
    <section class="mt-8 flex flex-col items-center">
        <div class="flex flex-col justify-center gap-6 w-1/2">
            <h1 class="text-3xl">Modifier mes informations</h1>
            <div class="flex flex-col gap-3">
                <h2 class="text-lg">Infomations du profil</h2>
                <EditProfile :userData="userData" />
            </div>

            <UDivider class="my-6" />
            <div class="flex flex-col gap-3 mb-16">
                <h2 class="text-lg">Paramètres du compte</h2>
                <EditAccount :userData="userData" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import EditAccount from '~/components/EditAccount.vue'
import EditProfile from '~/components/EditProfile.vue'
import { getSession, getUserData } from '~/services/users.supabase'

const userSession = ref()
const userData = ref()
const userId = ref()

onMounted(async () => {
    userSession.value = await getSession()
    userId.value = userSession.value?.user.id
    userData.value = await getUserData(userId.value)
})
</script>
