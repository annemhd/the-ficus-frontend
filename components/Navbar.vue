<template>
    <nav class="flex justify-between items-center w-full">
        <section class="flex items-center gap-4">
            <section
                class="flex justify-center items-center h-12 w-16 bg-gray-100 rounded-lg text-gray-400"
            >
                <ULink to="/"
                    ><UIcon
                        name="i-heroicons-photo"
                        class="w-6 h-6 flex justify-center items-center"
                /></ULink>
            </section>
            <div class="flex items-center gap-">
                <ULink
                    to="/market"
                    class="font-medium hover:bg-primary-50 text-current hover:text-primary-500 rounded-lg cursor-pointer"
                    active-class="text-sm px-4 py-2 text-current-900"
                    inactive-class="text-sm px-4 py-2 "
                    >Marché
                </ULink>
                <ULink
                    to="/about"
                    class="font-medium hover:bg-primary-50 text-current hover:text-primary-500 rounded-lg cursor-pointer"
                    active-class="text-sm px-4 py-2 text-gray-900"
                    inactive-class="text-sm px-4 py-2 "
                >
                    À propos
                </ULink>
                <UButton
                    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                    color="gray"
                    variant="ghost"
                    aria-label="Theme"
                    @click="isDark = !isDark"
                />
            </div>
        </section>
        <Account />
    </nav>
</template>
<script setup lang="ts">
import { getSession } from '~/services/users.supabase'

const userInfo = ref()

onMounted(async () => {
    const session = await getSession()
    userInfo.value = session?.user?.user_metadata
})

const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
})
</script>
