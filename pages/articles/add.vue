<template>
    <section class="mt-8 flex flex-col items-center">
        <UForm
            :schema="schema"
            :state="state"
            class="flex w-2/4 flex-col justify-center gap-4"
            @submit="onSubmit"
        >
            <UFormGroup name="title">
                <UInput v-model="state.title" placeholder="Titre" icon="i-heroicons-user" />
            </UFormGroup>
            <UFormGroup name="description">
                <UTextarea
                    v-model="state.description"
                    placeholder="Description..."
                    icon="i-heroicons-envelope"
                />
            </UFormGroup>
            <UInputMenu
                v-model="state.category"
                selected-icon="i-tabler-check"
                class="w-full lg:w-48"
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
            <UFormGroup name="price">
                <UInput v-model="state.price" placeholder="Prix" icon="i-heroicons-lock-closed" />
            </UFormGroup>
        </UForm>
        <div class="flex flex-col w-full"><ImgUpload @images="getImagesUrls" /></div>
        <div class="flex gap-2 items-center">en ligne <UToggle v-model="state.online" /></div>

        <UButton
            type="submit"
            color="primary"
            class="flex justify-center grow-0 w-1/2"
            label="Ajouter l'article"
        />
    </section>
</template>

<script setup lang="ts">
import { addArticle } from '~/services/articles.supabase'
import { object, string, number } from 'yup'
import { useUsersStore } from '~/store/users.pinia'

const store = useUsersStore()
const userId = ref()

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
