<template>
    <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col justify-center items-center gap-4 p-4 rounded-3xl"
        @submit="onSubmit"
        ><ImgUpload for="users" />
        <div class="flex flex-col gap-1 justify-center items-center">
            <span class="text-sm">Avatar</span>
            <span class="text-sm">Choissisez une photo de profile</span>
        </div>

        <UFormGroup name="username" label="Nom d'utilisateur" class="w-full">
            <UInput v-model="state.title" placeholder="Nom d'utilisateur" />
        </UFormGroup>
        <UFormGroup name="city" label="Ville" class="w-full">
            <USelectMenu
                v-model="selectedCities"
                :searchable="search"
                :ui-menu="uiMenu"
                placeholder="ex. Montreuil, Toulon, etc."
                loadingIcon="i-flowbite-chevron-down-outline"
                trailingIcon="i-flowbite-chevron-down-outline"
                option-attribute="name"
                by="name"
                searchablePlaceholder="Recherche..."
                clearSearchOnClose
                multiple
                trailing
            >
                <template #option="{ option: city }">
                    <span class="">{{ city.name }}</span>
                    <span class="truncate text-gray-400">{{ city.departement }}</span>
                </template>
                <template #empty>ex. Montreuil, Toulon, etc.</template>
                <template #option-empty="{ query }">
                    Pas de résultats pour <q>{{ query }}</q>
                </template>
            </USelectMenu>
        </UFormGroup>

        <UFormGroup
            name="description"
            label="Description"
            description="Mettez votre article en valeur avec le plus de détails possibles"
            class="w-full"
        >
            <UTextarea
                v-model="state.description"
                placeholder="ex : C'est un ficus de 20cm de hauteur"
                class="w-full"
                :autoresize="false"
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
