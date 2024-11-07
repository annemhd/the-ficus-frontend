<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-2 justify-between items-center">
            <div class="flex gap-2 items-center">
                <UAvatar size="sm" :src="props.article.users.avatar_src" alt="Avatar" />
                <p class="text-sm">{{ props.article.users.username }}</p>
            </div>

            <UIcon name="i-tabler-heart-filled" class="text-zinc-400" />
        </div>
        <div class="rounded-2xl overflow-hidden">
            <img :src="props.article.images[0]" class="object-cover h-48 w-96" />
        </div>

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
</script>
