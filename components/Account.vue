<template>
    <section v-if="userInfo" class="flex items-center gap-2">
        <UButton
            to="/articles/add"
            color="primary"
            variant="soft"
            icon="i-tabler-plus"
            size="xs"
            class="rounded-xl p-3"
        />
        <UButton
            to="/articles/add"
            color="primary"
            variant="soft"
            icon="i-tabler-heart"
            size="xs"
            class="rounded-xl p-3"
        />
        <UButton
            to="/account/messages"
            color="primary"
            variant="soft"
            icon="i-tabler-mail"
            size="xs"
            class="rounded-xl p-3"
        />
        <UPopover v-model:open="open">
            <UButton color="black" variant="ghost" size="xs" class="rounded-xl p-0"
                ><UAvatar
                    size="md"
                    :src="userInfo.avatar"
                    :alt="userInfo.username.toUpperCase()"
                    :ui="{ rounded: 'rounded-xl' }"
                    class="bg-gray-100"
            /></UButton>
            <template #panel>
                <div class="w-48 flex flex-col gap-1 p-2">
                    <UButton
                        to="/account/profile"
                        color="gray"
                        variant="ghost"
                        icon="i-tabler-user-filled"
                        size="sm"
                        @click="open = false"
                        >Profil</UButton
                    >
                    <UButton
                        to="/account/messages"
                        color="gray"
                        variant="ghost"
                        icon="i-tabler-mail-filled"
                        label="Messages"
                        size="sm"
                        @click="open = false"
                    />
                </div>
                <UDivider />
                <div class="flex flex-col gap-1 p-2">
                    <UButton
                        color="red"
                        variant="ghost"
                        size="sm"
                        icon="i-tabler-logout-2"
                        @click="logout"
                        >Déconnexion</UButton
                    >
                </div>
            </template>
        </UPopover>
    </section>

    <section v-else class="flex items-center gap-2 rounded-2xl">
        <ULink
            to="/auth/signin"
            class="text-sm hover:text-primary hover:bg-primary-100 dark:hover:bg-primary-900 p-3 rounded-xl"
            >Se connecter</ULink
        >
        <UDivider orientation="vertical" size="xs" class="h-4" />
        <ULink
            to="/auth/signup"
            class="rounded-r-2xl text-sm hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary p-3 rounded-xl"
            >S'inscrire</ULink
        >
    </section>
</template>

<script setup lang="ts">
import { signOut } from '~/services/users.supabase'
import { getSession } from '~/services/users.supabase'

const userInfo = ref()
const open = ref(false)
const router = useRouter()

onMounted(async () => {
    const session = await getSession()
    userInfo.value = session?.user?.user_metadata
})

const logout = async () => {
    try {
        await signOut()
        userInfo.value = null
        router.push({ path: '/' })
    } catch (error) {
        console.error(error)
    }
}
</script>
