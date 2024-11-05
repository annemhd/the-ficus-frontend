<template>
    <nav class="flex justify-between items-center w-full">
        <section
            class="flex justify-center items-center h-12 w-16 bg-zinc-200 rounded-lg text-zinc-500"
        >
            <ULink to="/"
                ><UIcon name="i-heroicons-photo" class="w-6 h-6 flex justify-center items-center"
            /></ULink>
        </section>
        <section class="flex items-center pl-6 gap-6 bg-zinc-50 rounded-2xl">
            <ULink
                to="/market"
                class="flex text-sm font-medium text-zinc-700"
                active-class="text-primary"
                >Marché
            </ULink>
            <ULink
                to="/about"
                class="flex text-sm font-medium text-zinc-700"
                active-class="text-primary"
            >
                À propos
            </ULink>
            <Account />
        </section>
    </nav>
</template>
<script setup lang="ts">
const route = useRoute()
</script>
