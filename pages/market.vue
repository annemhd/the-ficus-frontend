<template>
    <main class="">
        <header class="pt-8 flex justify-between gap-2">
            <Filters
                @sort="handleSort"
                @categories="handleCategories"
                @cities="handleCities"
                @price="handlePrice"
            />
            <p class="text-sm">{{ total }} articles</p>
        </header>
        <section class="mt-6 grid grid-cols-5 gap-4 content-stretch p-4 rounded-3xl">
            <div v-for="article in articles" class="flex flex-col gap-2">
                <ArticleCard :article="article" />
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import { getAllArticles } from '~/services/articles.supabase'

const articles = ref()
const total = ref()

const sort = ref(false)
const sortBy = ref('created_at')
const categories = ref([])
const cities = ref([])
const price = ref<number | null>(0)

onMounted(async () => {
    await getArticles()
})

const handleSort = (s: any) => {
    if (s === 'ascending_date') (sortBy.value = 'created_at'), (sort.value = false)
    else if (s === 'descending_date') (sortBy.value = 'created_at'), (sort.value = true)
    else if (s === 'ascending_price') (sortBy.value = 'price'), (sort.value = false)
    else if (s === 'descending_price') (sortBy.value = 'price'), (sort.value = true)
    else (sortBy.value = 'created_at'), (sort.value = true)
}

const handleCategories = (items: []) => {
    categories.value = items
}

const handleCities = (items: []) => {
    cities.value = items
}

const handlePrice = (item: number) => {
    price.value = item === 0 ? null : item
}

const getArticles = async () => {
    articles.value = await getAllArticles(
        sortBy.value,
        sort.value,
        categories.value,
        cities.value,
        price.value
    )
    total.value = articles.value?.length
}

watch(
    [sort, sortBy, categories, cities, price],
    async () => {
        articles.value = await getAllArticles(
            sortBy.value,
            sort.value,
            categories.value,
            cities.value,
            price.value
        )
    },
    { deep: true }
)
</script>
