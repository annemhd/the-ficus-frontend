<template>
    <section class="mt-8 flex flex-col items-center">
        <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col justify-center gap-4 p-4 rounded-3xl w-1/2"
            @submit="onSubmit"
            ><h1 class="text-2xl">Ajouter un article</h1>
            <UFormGroup
                name="title"
                label="Titre"
                description="Choissisez un titre à votre article"
            >
                <UInput v-model="state.title" placeholder="ex : Un jolie ficus" class="w-full" />
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
            <div class="flex gap-4">
                <UFormGroup
                    name="category"
                    label="Catégories"
                    description="Le type de votre article"
                    class="w-full"
                >
                    <UInputMenu
                        v-model="state.category"
                        selected-icon="i-tabler-check"
                        class="w-full"
                        placeholder="Selectionner une catégorie"
                        :options="categories"
                        by="value"
                        option-attribute="label"
                        :search-attributes="['label']"
                    />
                </UFormGroup>
                <UFormGroup
                    name="price"
                    label="Prix"
                    description="Choisissez le prix =<0"
                    class="w-full"
                >
                    <UInput v-model="state.price" placeholder="Prix" class="w-full"
                        ><template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                        </template></UInput
                    >
                </UFormGroup>
            </div>
            <UFormGroup
                name="images"
                label="Images"
                description="Choissisez jusqu'à 3 photos"
                class="w-full"
            >
                <ImgUpload for="articles" @images="getImagesUrls" />
            </UFormGroup>

            <div class="flex justify-between">
                <UFormGroup
                    name="online"
                    label="Status"
                    description="Pour enregistrer l'article hors ligne"
                    class="w-full flex flex-col gap-2 text-sm"
                >
                    <div class="flex gap-3 items-center">
                        <UToggle v-model="state.online" /> {{ status }}
                    </div>
                </UFormGroup>
                <div class="mt-auto">
                    <UButton
                        type="submit"
                        color="primary"
                        class="flex justify-center w-48"
                        label="Ajouter l'article"
                    />
                </div>
            </div>
        </UForm>
    </section>
</template>

<script setup lang="ts">
import { addArticle } from '~/services/articles.supabase'
import { object, string, number } from 'yup'
import { getSession } from '~/services/users.supabase'

const userId = ref()

//taf
const categories = ref<{ label: string; val: string }[]>([
    {
        label: 'Plantes intérieur',
        val: 'indoor_plants',
    },
    {
        label: 'Plantes extérieur',
        val: 'outdoor_plants',
    },
    { label: 'Boutures', val: 'cuttings' },
    {
        label: 'Vases et caches pots',
        val: 'vases_and_pot_covers',
    },
    { label: 'Outils', val: 'tools' },
])

const status = computed(() => (state.online ? 'En ligne' : 'Hors ligne'))

const state = reactive({
    user_id: userId.value,
    title: '',
    description: '',
    category: { label: '', val: '' },
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

const getImagesUrls = (images: any) => {
    state.images = images
}

const router = useRouter()

async function onSubmit() {
    try {
        await schema.validate(state)
        await addArticle(
            userId.value,
            state.title,
            state.description,
            state.category.val,
            state.price,
            state.images,
            state.online
        )
        router.push({ path: '/account/profile' })
    } catch (error) {
        console.log(error)
    }
}
</script>
