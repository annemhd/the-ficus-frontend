<template>
    <div class="flex flex-col gap-2">
        <div v-if="route.name === 'market'" class="flex gap-2 justify-between items-center">
            <div class="flex gap-2 items-center">
                <UAvatar
                    size="sm"
                    :src="props.article.avatar"
                    :alt="props.article.username"
                    :ui="{
                        size: { md: 'h-full w-full text-base' },
                    }"
                    class="bg-gray-100 overflow-hidden h-8 w-8"
                    imgClass="object-cover"
                />
                <p class="text-sm">{{ props.article.username }}</p>
            </div>

            <UIcon name="i-tabler-heart-filled" class="text-gray-400" />
        </div>
        <NuxtLink
            :to="link"
            v-if="props.article.images.length > 0"
            class="rounded-2xl overflow-hidden"
        >
            <img :src="props.article.images[0]" class="object-cover h-48 w-96" />
        </NuxtLink>
        <NuxtLink
            v-else
            :to="link"
            class="rounded-2xl overflow-hidden h-48 flex justify-center items-center bg-gray-200"
        >
            <UIcon name="i-heroicons-photo" class="text-gray-400 h-24 w-24" />
        </NuxtLink>

        <div class="flex justify-between text-sm px-2">
            <p>
                {{ props.article.title }}
            </p>
            <p>{{ props.article.price }}€</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['article'])
const route = useRoute()
const link = computed(() => `/articles/${props?.article?.id}`)
</script>
