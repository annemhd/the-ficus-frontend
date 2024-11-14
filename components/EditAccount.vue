<template>
    <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col justify-center items-center gap-4 rounded-3xl w-full"
        @submit="onSubmit"
    >
        <UFormGroup
            name="Email"
            label="Email"
            description="Un mail de confirmation vous sera envoyer vers le nouvel email"
            class="w-full"
        >
            <UInput v-model="state.email" placeholder="Email" color="gray" :disabled="true" />
        </UFormGroup>
        <div class="flex w-full gap-4">
            <UFormGroup name="Mot de passe" label="Mot de passe" class="w-full">
                <UInput v-model="state.password" placeholder="Mot de passe" />
            </UFormGroup>
            <UFormGroup
                name="Confirmation du mot de passe"
                label="Confirmation du mot de passe"
                class="w-full"
            >
                <UInput
                    v-model="state.confirmPassword"
                    placeholder="Confirmation du mot de passe"
                />
            </UFormGroup>
        </div>

        <div class="flex justify-end w-full">
            <div class="mt-auto">
                <UButton
                    type="submit"
                    color="primary"
                    class="flex justify-center"
                    label="Mettre à jour"
                />
            </div>
        </div>
    </UForm>
</template>
<script setup lang="ts">
import { object, string, ref as yupRef } from 'yup'
import { getSession, updateUserPassword } from '~/services/users.supabase'

const props = defineProps(['userData'])

const userId = ref()

const state = reactive({
    email: '',
    password: '',
    confirmPassword: '',
})

const schema = object({
    email: string().email(),
    password: string().min(
        8,
        'Le mot de passe doit contenir au moins 8 caracteres, 1 majuscule et 1 minuscule'
    ),
    confirmPassword: string().oneOf([yupRef('password')], 'Les mots de passe doivent correspondre'),
})

onMounted(async () => {
    const session = await getSession()
    userId.value = session?.user?.id
})

watch(
    () => props.userData,
    (newVal) => {
        if (newVal && newVal[0]) {
            state.email = newVal[0].email
        }
    },
    { immediate: true }
)

async function onSubmit() {
    console.log(state)
    try {
        await schema.validate(state)
        // await updateUserEmail(state.email)
        if (state.password) await updateUserPassword(state.password)
        // router.push({ path: '/account/profile' })
    } catch (error) {
        console.log(error)
    }
}
</script>
