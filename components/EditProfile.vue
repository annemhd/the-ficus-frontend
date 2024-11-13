<template>
    <div>
        <UButton label="Modifier mon profil" @click="isOpen = true" />

        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Modifier mon profil
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>
                <UForm
                    :schema="schema"
                    :state="state"
                    class="flex flex-col justify-center gap-4 p-4 rounded-3xl w-1/2"
                    @submit="onSubmit"
                    ><h1 class="text-2xl">Ajouter un article</h1>
                    <UFormField
                        name="title"
                        label="Titre"
                        description="Choissisez un titre à votre article"
                    >
                        <UInput
                            v-model="state.title"
                            placeholder="ex : Un jolie ficus"
                            class="w-full"
                        />
                    </UFormField>
                    <UFormField
                        name="description"
                        label="Description"
                        description="Mettez votre article en valeur avec le plus de détails possibles"
                    >
                        <UTextarea
                            v-model="state.description"
                            placeholder="ex : C'est un ficus de 20cm de hauteur"
                            class="w-full"
                            :autoresize="false"
                        /> </UFormField
                ></UForm>
                <template #footer>
                    <UButton label="Annuler" color="gray" variant="ghost" @click="isOpen = false" />
                    <UButton label="Enregistrer" @click="isOpen = true" />
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { object, string, number } from 'yup'

const isOpen = ref(false)

const props = defineProps()

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
</script>
