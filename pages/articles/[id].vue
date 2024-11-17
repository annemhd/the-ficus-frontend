<template>{{ article }}</template>
<script setup lang="ts">
import { getArticleById } from '~/services/articles.supabase'
const route = useRoute()
const article = ref()

onMounted(async () => {
    article.value = await getArticle()
})

const getArticle = async () => {
    const data = await getArticleById(`${route?.params?.id}`)
    return data
}

watch(() => route.params.id, getArticle)
</script>
