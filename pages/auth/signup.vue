<template>
    <section class="w-96 flex flex-col justify-center prose">
        <h1>S'inscrire</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ou
            <NuxtLink to="/auth/signin" class="text-emerald-500">inscrivez-vous</NuxtLink>
        </p>
        <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col justify-center gap-4"
            @submit="onSubmit"
        >
            <UFormGroup name="email">
                <UInput v-model="state.email" placeholder="E-mail" icon="i-heroicons-envelope" />
            </UFormGroup>
            <UFormGroup name="password">
                <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="Mot de passe"
                    icon="i-heroicons-lock-closed"
                />
            </UFormGroup>
            <div class="flex justify-between items-center gap-4">
                <UButton type="submit" class="w-1/2" block> Se connecter </UButton>
                <UButton type="submit" variant="link" class="w-1/2"> Mot de passe oublié </UButton>
            </div>
        </UForm>
    </section>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

import { updateProfile } from 'firebase/auth'
import { loginWithEmail } from '../../services/auth'
import { object, string } from 'yup'

const currentUser = useCookie('current-user')
const router = useRouter()

const state = reactive({
    email: undefined,
    password: undefined,
})

const schema = object({
    email: string().email("L'email est invalide").required("L'email est requis"),
    password: string().required('Le mot de passe est requis'),
})

async function onSubmit() {
    try {
        await schema.validate(state)
        const user = await loginWithEmail(state.email, state.password)
        currentUser.value = JSON.stringify(user)
        router.push({ name: 'dashboard' })
    } catch (error) {
        console.error(error)
    }
}
</script>
