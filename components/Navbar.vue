<template>
    <nav class="flex justify-between items-center w-full">
        <section class="flex items-center gap-4">
            <section
                class="flex justify-center items-center h-12 w-16 bg-zinc-200 rounded-lg text-zinc-500"
            >
                <ULink to="/"
                    ><UIcon
                        name="i-heroicons-photo"
                        class="w-6 h-6 flex justify-center items-center"
                /></ULink>
            </section>
            <div class="flex items-center p-4 gap-6 bg-white rounded-2xl">
                <ULink
                    to="/market"
                    class="flex text-sm font-medium text-zinc-700"
                    active-class="text-primary"
                    >Marché
                </ULink>
                <ULink
                    to="/about"
                    class="flex text-sm font-medium text-zinc-700"
                    active-class="text-primary"
                >
                    À propos
                </ULink>
            </div>
        </section>
        <Account />
    </nav>
</template>
<script setup lang="ts">
import { useUsersStore } from '~/store/users.pinia'

const store = useUsersStore()
const userInfo = ref()

onMounted(() => {
    userInfo.value = store.user?.user?.user_metadata
})
</script>
