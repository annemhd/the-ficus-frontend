<template>
    <section class="mt-8 flex flex-col items-center">
        <UForm
            :schema="schema"
            :state="state"
            class="bg-white flex flex-col justify-center gap-4 p-16 rounded-3xl"
            @submit="onSubmit"
            ><h1 class="text-2xl">Ajouter un article</h1>
            <UFormGroup
                name="title"
                label="Titre"
                description="Choissisez un titre à votre article"
            >
                <UInput v-model="state.title" placeholder="ex : Un jolie ficus" />
            </UFormGroup>
            <UFormGroup
                name="description"
                label="Description"
                description="Mettez votre article en valeur avec le plus de détails possibles"
            >
                <UTextarea
                    v-model="state.description"
                    placeholder="ex : C'est un ficus de 20cm de hauteur"
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
                        :options="[
                            'Plantes intérieur',
                            'Plantes extérieur',
                            'Boutures',
                            'Caches pot',
                            'Vases',
                            'Outils',
                            'Autres',
                        ]"
                    />
                </UFormGroup>
                <UFormGroup
                    name="price"
                    label="Prix"
                    description="Choisissez le prix =<0"
                    class="w-full"
                >
                    <UInput v-model="state.price" placeholder="Prix"
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
                <div class="mt-2 flex flex-col"><ImgUpload @images="getImagesUrls" /></div>
            </UFormGroup>

            <div class="flex justify-between">
                <UFormGroup
                    name="online"
                    label="Status"
                    description="Pour enregistrer l'article hors ligne"
                    class="w-full flex flex-col gap-2 text-sm"
                >
                    <div class="flex gap-3 items-center">
                        <UToggle v-model="state.online" />{{ status }}
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
import { useUsersStore } from '~/store/users.pinia'

const store = useUsersStore()
const userId = ref()
const status = computed(() => (state.online ? 'En ligne' : 'Hors ligne'))

const state = reactive({
    user_id: userId.value,
    title: '',
    description: '',
    category: '',
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
    category: string().required('La categorie est requise'),
    price: number(),
})

onMounted(() => {
    userId.value = store.user?.user?.id
})

const getImagesUrls = (v: any) => {
    state.images = v
    console.log(v)
}

const router = useRouter()

async function onSubmit() {
    try {
        await schema.validate(state)
        await addArticle(
            userId.value,
            state.title,
            state.description,
            state.category,
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
