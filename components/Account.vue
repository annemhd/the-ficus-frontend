<template>
    <section v-if="userInfo" class="flex items-center gap-4">
        <UPopover>
            <UButton
                color="black"
                variant="solid"
                icon="i-tabler-user-filled"
                size="md"
                class="rounded-2xl p-4"
                :label="userInfo?.username"
            />
            <template #panel>
                <div class="w-48 flex flex-col gap-1 p-2">
                    <UButton to="/profile" color="gray" variant="ghost" icon="i-tabler-user-filled"
                        >Profil</UButton
                    >
                    <UButton
                        to="/dashboard"
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
import { useUsersStore } from '~/store/users.pinia'

const store = useUsersStore()
const userInfo = ref()
const router = useRouter()

onMounted(() => {
    userInfo.value = store.user?.user?.user_metadata
})

const logout = async () => {
    try {
        //taf : retirer any
        await signOut()
        userInfo.value = null
        router.push({ path: '/' })
    } catch (error) {
        console.error(error)
    }
}
</script>
