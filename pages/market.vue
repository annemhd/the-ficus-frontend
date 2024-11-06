<template>
    <main class="">
        <header class="pt-8 flex justify-between gap-2">
            <Filters />
            <p class="text-sm">{{ total }} articles</p>
        </header>
        <section class="mt-6 h-56 grid grid-cols-5 gap-4 content-stretch">
            <UCard v-for="article in articles">
                <template #header> </template>

                {{ article }}
                <template #footer>
                    <Placeholder class="h-8" />
                </template>
            </UCard>
        </section>
    </main>
</template>
<script setup lang="ts">
import { getAllArticles } from '~/services/articles.supabase'

const articles = ref()
const total = ref()

onMounted(async () => {
    await getArticles()
})

const getArticles = async () => {
    articles.value = await getAllArticles()
    total.value = articles.value.length
}
</script>
