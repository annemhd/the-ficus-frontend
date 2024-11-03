<template>
    <div>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup name="username">
                <UInput v-model="state.username" placeholder="Nom d'utilisateur" />
            </UFormGroup>
            <UFormGroup name="email">
                <UInput v-model="state.email" placeholder="E-mail" />
            </UFormGroup>
            <UFormGroup name="password">
                <UInput v-model="state.password" type="password" placeholder="Mot de passe" />
            </UFormGroup>
            <UFormGroup name="confirmPassword">
                <UInput
                    v-model="state.confirmPassword"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                />
            </UFormGroup>
            <UFormGroup name="city">
                <UInput v-model="state.city" placeholder="Ville" />
            </UFormGroup>
            <UButton type="submit"> S'inscrire </UButton>
        </UForm>
    </div>
</template>
<script setup lang="ts">
import { registerUser } from './services/auth'
import { addUser } from './services/users'

import { object, string, type InferType, ref as yupRef } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

type Schema = InferType<typeof schema>

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
    city: string(),
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    try {
        await schema.validate(state)
        const user = await registerUser(state.email, state.password)
        const payload = {
            username: state.username,
            email: state.email,
            city: state.city,
        }
        await addUser(user.uid, payload)
        console.log('User registered successfully:', user)
    } catch (error) {
        console.error(error)
    }
}
</script>
