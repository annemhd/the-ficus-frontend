<template>
    <section class="w-96 flex flex-col justify-center prose">
        <h1>S'inscrire</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ou
            <NuxtLink to="/auth/signup" class="text-emerald-500">connectez-vous</NuxtLink>
        </p>
        <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col justify-center gap-4"
            @submit="onSubmit"
        >
            <UFormGroup name="username">
                <UInput
                    v-model="state.username"
                    placeholder="Nom d'utilisateur"
                    icon="i-heroicons-user"
                />
            </UFormGroup>
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
            <UFormGroup name="confirmPassword">
                <UInput
                    v-model="state.confirmPassword"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    icon="i-heroicons-lock-closed"
                />
            </UFormGroup>
            <UFormGroup name="city">
                <UInputMenu
                    v-model="state.city"
                    :search="search"
                    placeholder="Ville"
                    option-attribute="nom"
                    trailing
                    by="nom"
                >
                    <template #leading>
                        <UIcon name="i-heroicons-map-pin" class="text-zinc-400" />
                    </template>
                    <template #option-empty="{ query }">
                        pas de resultats pour <q>{{ query }}</q>
                    </template>
                </UInputMenu>
            </UFormGroup>
            <UButton type="submit" class="flex justify-center grow-0 w-1/2"> S'inscrire </UButton>
        </UForm>
    </section>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

import { registerUser } from '../../services/auth'
import { addUser } from '../../services/users'
import { object, string, ref as yupRef } from 'yup'

const router = useRouter()

const state = reactive({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    city: undefined,
})

const schema = object({
    email: string().email("L'email est invalide").required("L'email est requis"),
    password: string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caracteres, 1 majuscule et 1 minuscule')
        .required('Le mot de passe est requis'),
    confirmPassword: string()
        .oneOf([yupRef('password')], 'Les mots de passe doivent correspondre')
        .required('Vous devez confirmer votre mot de passe'),
    city: object(),
})

async function onSubmit() {
    try {
        await schema.validate(state)
        const user = await registerUser(state.email, state.password)
        const payload = {
            username: state.username,
            email: state.email,
            city: state.city,
        }
        await addUser(user.uid, payload)
        router.push({ name: 'auth-confirmation' })
    } catch (error) {
        console.error(error)
    }
}

async function search(query: string) {
    const cities: any[] = await $fetch(
        `https://geo.api.gouv.fr/communes?nom=${query}&fields=departement&boost=population&limit=4`
    )

    return cities
}
</script>
