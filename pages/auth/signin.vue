<template>
    <section class="w-96 flex flex-col justify-center gap-4">
        <h1 class="text-3xl">S'inscrire</h1>
        <p class="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ou
            <ULink to="/auth/signup" class="text-primary">inscrivez-vous</ULink>
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
                <UButton type="submit" color="primary" class="w-1/2" block> Se connecter </UButton>
                <!-- <UButton type="submit" color="black" variant="link" class="w-1/2">
                    Mot de passe oublié
                </UButton> -->
            </div>
        </UForm>
    </section>
</template>
<script setup lang="ts">
import type { signInForm } from '~/types/users'
import { signIn } from '~/services/users.supabase'
import { object, string } from 'yup'

const router = useRouter()

const state = reactive<signInForm>({
    email: '',
    password: '',
})

const schema = object({
    email: string().email("L'email est invalide").required("L'email est requis"),
    password: string().required('Le mot de passe est requis'),
})

async function onSubmit() {
    try {
        //taf : retirer any
        const { error }: any = await signIn(state.email, state.password)
        if (!error) router.push({ path: '/account/profile' })
    } catch (error) {}
}
</script>
