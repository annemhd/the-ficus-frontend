<template>
    <section class="mt-8 flex flex-col items-center">
        <h1 class="text-2xl">Modifier mes informations</h1>
        <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col justify-center gap-4 p-4 rounded-3xl w-1/2"
            @submit="onSubmit"
        >
            <UFormGroup
                name="images"
                label="Images"
                description="Choissisez une photo de profile"
                class="w-full"
            >
                <ImgUpload for="users" />
            </UFormGroup>
            <UFormGroup name="username" label="Nom d'utilisateur">
                <UInput v-model="state.title" placeholder="Nom d'utilisateur" class="w-full" />
            </UFormGroup>
            <UFormGroup>
                <USelectMenu
                    v-model="selectedCities"
                    :searchable="search"
                    :ui-menu="uiMenu"
                    loadingIcon="i-flowbite-chevron-down-outline"
                    trailingIcon="i-flowbite-chevron-down-outline"
                    option-attribute="name"
                    by="name"
                    searchablePlaceholder="Recherche..."
                    clearSearchOnClose
                    multiple
                    trailing
                >
                    <template #label>
                        <span class="font-medium">Villes</span>
                        <UBadge v-if="selectedCities.length > 0" variant="soft" size="xs">{{
                            selectedCities.length
                        }}</UBadge>
                    </template>
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
            </div> </UForm
        ><UForm
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
    </section>
</template>

<script setup lang="ts">
import { object, string, number } from 'yup'
import { getSession } from '~/services/users.supabase'

const userId = ref()
const selectedCities: any = ref<string[]>([])

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
