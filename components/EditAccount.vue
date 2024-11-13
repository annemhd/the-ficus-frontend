<template>
    <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col justify-center gap-4 p-4 rounded-3xl w-1/2"
        @submit="onSubmit"
    >
        <UFormGroup name="Email" label="Email">
            <UInput v-model="state.title" placeholder="Email" class="w-full" />
        </UFormGroup>
        <UFormGroup name="Mot de passe" label="Mot de passe">
            <UInput v-model="state.title" placeholder="Mot de passe" class="w-full" />
        </UFormGroup>
        <UFormGroup name="Confirmation du mot de passe" label="Confirmation du mot de passe">
            <UInput
                v-model="state.title"
                placeholder="Confirmation du mot de passe"
                class="w-full"
            />
        </UFormGroup>

        <div class="flex justify-between">
            <div class="mt-auto">
                <UButton
                    type="submit"
                    color="primary"
                    class="flex justify-center w-48"
                    label="Enregistrer"
                />
            </div>
        </div>
    </UForm>
</template>
<script setup lang="ts">
import { object, string, number } from 'yup'
import { getSession } from '~/services/users.supabase'

const userId = ref()
const selectedCities: any = ref<string[]>([])

const items = [
    {
        key: 'profil',
        label: 'Informations du profil',
        icon: 'i-heroicons-information-circle',
    },
    {
        key: 'account',
        label: 'Paramètres du compte',
        icon: 'i-heroicons-arrow-down-tray',
    },
]

const uiMenu = ref({
    width: 'min-w-60',
    select: 'inline-flex items-center text-left cursor-pointer',
    popper: {
        placement: 'bottom',
    },
})

const state = reactive({
    user_id: userId.value,
    title: '',
    description: '',
    category: [],
    price: 0,
    images: [],
    online: true,
})

const schema = object({
    title: string()
        .min(8, 'Le titre doit contenir 6 caracteres minimum')
        .required('Le titre est requis'),
    description: string()
        .min(8, 'La description doit contenir au moins 8 caracteres')
        .required('La description est requise'),
    category: object().required('La categorie est requise'),
    price: number(),
})

onMounted(async () => {
    const session = await getSession()
    userId.value = session?.user?.id
})

const router = useRouter()

async function search(query: string) {
    const cities: any = await $fetch(
        'https://geo.api.gouv.fr/communes?nom=&fields=departement&boost=population&limit=6',
        { params: { nom: query } }
    )

    return cities.map(
        (city: { label: string; nom: number; departement: { code: string; nom: string } }) => ({
            name: city.nom,
            code: city.departement.code,
            departement: city.departement.nom,
        })
    )
}

async function onSubmit() {
    try {
        await schema.validate(state)
        ///
        router.push({ path: '/account/profile' })
    } catch (error) {
        console.log(error)
    }
}
</script>
