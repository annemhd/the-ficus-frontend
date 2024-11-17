<template>
    <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col justify-center gap-4 rounded-3xl w-full"
        @submit="onSubmit"
    >
        <div class="flex flex-col w-full">
            <div class="flex w-full gap-6">
                <div class="flex flex-col justify-between">
                    <p class="text-sm font-medium">Photo de profil</p>
                    <AvatarUpload @image="getImagesUrls" :avatar="props.userData?.[0].avatar" />
                </div>

                <div class="w-full flex flex-col gap-4">
                    <div class="flex gap-4">
                        <UFormGroup name="username" label="Nom d'utilisateur" class="w-full">
                            <UInput v-model="state.username" placeholder="Nom d'utilisateur" />
                        </UFormGroup>
                        <UFormGroup name="city" label="Ville" size="md" class="w-full">
                            <USelectMenu
                                v-model="selectedCities[0]"
                                :searchable="search"
                                :ui-menu="uiMenu"
                                placeholder="ex. Montreuil, Toulon, etc."
                                loadingIcon="i-flowbite-chevron-down-outline"
                                trailingIcon="i-flowbite-chevron-down-outline"
                                option-attribute="name"
                                by="name"
                                searchablePlaceholder="Recherche..."
                                clearSearchOnClose
                                trailing
                            >
                                <template #option="{ option: city }">
                                    <span class="">{{ city.name }}</span>
                                    <span class="truncate text-gray-400">{{
                                        city.departement
                                    }}</span>
                                </template>
                                <template #empty>ex. Montreuil, Toulon, etc.</template>
                                <template #option-empty="{ query }">
                                    Pas de résultats pour <q>{{ query }}</q>
                                </template>
                            </USelectMenu>
                        </UFormGroup>
                    </div>
                    <UFormGroup
                        name="description"
                        label="Description"
                        description="Mettez votre article en valeur avec le plus de détails possibles"
                        class="w-full"
                    >
                        <UTextarea
                            v-model="state.description"
                            placeholder="ex : C'est un ficus de 20cm de hauteur"
                            class="w-full h-full"
                            :rows="6"
                        />
                    </UFormGroup>
                </div>
            </div>
        </div>

        <div class="flex justify-end">
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
import { array, object, string } from 'yup'
import { getSession, updateUser } from '~/services/users.supabase'

const props = defineProps(['userData'])
const router = useRouter()

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
    id: '',
    username: '',
    description: '',
    city: {},
    avatar: '',
})

const schema = object({
    username: string().min(8, 'Le titre doit contenir 6 caracteres minimum'),
    description: string().min(8, 'La description doit contenir au moins 8 caracteres'),
    city: object(),
    avatar: string(),
})

onMounted(async () => {
    const session = await getSession()
    userId.value = session?.user?.id
})

const getImagesUrls = (images: any) => {
    state.avatar = images
}

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
        await updateUser(
            userId.value,
            state.username,
            selectedCities.value[0],
            state.description,
            state.avatar
        )
        // router.push({ path: '/account/profile' })
    } catch (error) {
        console.log(error)
    }
}

watch(
    () => props.userData,
    (newVal) => {
        if (newVal && newVal[0]) {
            state.username = newVal[0].username
            state.description = newVal[0].description
            state.city = newVal[0].city
            state.avatar = newVal[0].avatar[0]
            selectedCities.value.push(newVal[0].city)
        }
    },
    { immediate: true }
)
</script>
