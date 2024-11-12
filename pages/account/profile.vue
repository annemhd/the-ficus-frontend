<template>
    <section class="flex gap-6 mt-6">
        <div
            class="flex flex-none justify-center items-center rounded-2xl overflow-hidden h-48 w-48 bg-gray-200"
        >
            <UIcon name="i-heroicons-photo" class="text-gray-400 h-14 w-14" />
        </div>
        <div class="flex flex-col gap-3 w-3/4">
            <h1 class="text-3xl font-bold tracking-wide">
                {{ userInfo?.user.user_metadata.username }}
            </h1>
            <div class="flex flex-col">
                <h2 class="">{{ userInfo?.user.user_metadata.city.nom }}</h2>
                <h3 class="text-sm text-gray-500">
                    {{ userInfo?.user.user_metadata.city.departement.nom }}
                </h3>
            </div>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum ante
                pulvinar enim suscipit vestibulum. Suspendisse tincidunt imperdiet justo, eu cursus
                odio finibus quis.
            </p>
        </div>
        <div class="w-full flex flex-col items-end justify-between gap-6">
            <div>
                <UButton color="primary" class="flex-none" label="Modifier mes informations" />
            </div>
            <div class="flex gap-6">
                <div>
                    <div class="text-sm">Articles</div>
                    <div class="leading-none text-[48px] font-semibold">{{ total }}</div>
                </div>
                <div class="">
                    <div class="text-sm">Abonnés</div>
                    <div class="leading-none text-[48px] font-semibold">100</div>
                </div>
                <div>
                    <div class="text-sm">Abonnements</div>
                    <div class="leading-none text-[48px] font-semibold">100</div>
                </div>
            </div>
        </div>
    </section>
    <header class="pt-8 flex justify-between gap-2">
        <Filters
            @sort="handleSort"
            @categories="handleCategories"
            @cities="handleCities"
            @price="handlePrice"
        />
        <p class="text-sm">{{ totalfilter }} articles</p>
    </header>
    <section class="mt-6 grid grid-cols-5 gap-4 content-stretch bg-white p-4 rounded-3xl">
        <div v-for="article in articles" class="flex flex-col gap-2">
            <ArticleCard :article="article" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { getSession } from '~/services/users.supabase'
import { getArticlesByUser } from '~/services/articles.supabase'

const userInfo = ref()
const userId = ref()
const articles = ref()

const total = ref()
const totalfilter = ref()

const sort = ref(false)
const sortBy = ref('created_at')
const categories = ref([])
const cities = ref([])
const price = ref(1000)

onMounted(async () => {
    userInfo.value = await getSession()
    userId.value = userInfo.value?.user.id
    await getArticles()
})

const handleSort = (s: any) => {
    if (s === 'ascending_date') (sortBy.value = 'created_at'), (sort.value = false)
    else if (s === 'descending_date') (sortBy.value = 'created_at'), (sort.value = true)
    else if (s === 'ascending_price') (sortBy.value = 'price'), (sort.value = false)
    else if (s === 'descending_price') (sortBy.value = 'price'), (sort.value = true)
    else (sortBy.value = 'created_at'), (sort.value = true)
}

const handleCategories = (c: any) => {
    categories.value = c
}

const handleCities = (c: any) => {
    cities.value = c
}

const handlePrice = (p: any) => {
    price.value = p
}

const getArticles = async () => {
    articles.value = await getArticlesByUser(
        userId.value,
        sortBy.value,
        sort.value,
        categories.value,
        cities.value,
        price.value
    )
    total.value = articles.value?.length
    totalfilter.value = articles.value?.length
}

watch(
    [sort, sortBy, categories, cities, price],
    async () => {
        const updateArticles = await getArticlesByUser(
            userId.value,
            sortBy.value,
            sort.value,
            categories.value,
            cities.value,
            price.value
        )
        articles.value = updateArticles
        totalfilter.value = updateArticles?.length
    },
    { deep: true }
)
</script>
