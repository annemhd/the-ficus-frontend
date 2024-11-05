<template>
    <section v-if="currentUser" class="flex items-center gap-4">
        <UPopover>
            <UButton
                color="black"
                variant="solid"
                icon="i-tabler-user-filled"
                size="md"
                class="rounded-2xl p-4"
                :label="userInfos?.username"
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
                    <UButton
                        color="pink"
                        variant="ghost"
                        icon="i-tabler-logout-2"
                        @click="logoutAccount"
                        >Déconnexion</UButton
                    >
                </div>
            </template>
        </UPopover>
    </section>
    <section v-else class="flex gap-2">
        <UButton to="/auth/signup" color="gray" variant="ghost">Se connecter</UButton>
        <UButton to="/auth/signin" color="primary" variant="solid">S'inscrire</UButton>
    </section>
</template>

<script setup lang="ts">
import { logout } from '~/services/auth'
import { getUserById } from '~/services/users'

const currentUser: any = useCookie('current-user')
const userInfos: any = ref()
const router = useRouter()

onMounted(async () => {
    userInfos.value = await getUserById(currentUser.value?.uid)
})

const logoutAccount = () => {
    logout()
    router.push({ name: '/' })
}
</script>
