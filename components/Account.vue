<template>
    <section v-if="userInfo" class="flex items-center gap-2">
        <UButton
            to="/articles/add"
            color="primary"
            variant="solid"
            icon="i-tabler-plus"
            size="md"
            class="rounded-xl p-3"
        /><UButton
            to="/account/messages"
            color="black"
            variant="solid"
            icon="i-tabler-mail"
            size="md"
            class="rounded-xl p-3"
        />

        <UPopover>
            <UButton color="black" variant="ghost" class="rounded-xl p-0"
                ><UAvatar
                    size="lg"
                    :src="userInfo.avatar_src"
                    :alt="userInfo.username"
                    :ui="{ rounded: 'rounded-xl' }"
                    class="bg-zinc-200"
            /></UButton>
            <template #panel>
                <div class="w-48 flex flex-col gap-1 p-2">
                    <UButton
                        to="/account/profile"
                        color="gray"
                        variant="ghost"
                        icon="i-tabler-user-filled"
                        >Profil</UButton
                    >
                    <UButton
                        to="/account/messages"
                        color="gray"
                        variant="ghost"
                        icon="i-tabler-mail-filled"
                        label="Messages"
                    />
                </div>
                <UDivider />
                <div class="flex flex-col gap-1 p-2">
                    <UButton color="pink" variant="ghost" icon="i-tabler-logout-2" @click="logout"
                        >Déconnexion</UButton
                    >
                </div>
            </template>
        </UPopover>
    </section>

    <section v-else class="flex items-center p-4 gap-4 bg-black rounded-2xl">
        <ULink to="/auth/signin" class="text-white text-sm">Se connecter</ULink>
        <UDivider orientation="vertical" class="h-4" />
        <ULink to="/auth/signup" class="text-white rounded-r-2xl text-sm">S'inscrire</ULink>
    </section>
</template>

<script setup lang="ts">
import { signOut } from '~/services/users.supabase'
import { getSession } from '~/services/users.supabase'

const userInfo = ref()
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
