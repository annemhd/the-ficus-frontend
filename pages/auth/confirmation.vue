<template>
    <article class="w-96 flex flex-col justify-center items-center prose">
        <h1>Incription validée</h1>
        <p class="text-center">
            Vous pouvez désormais vous connecter
            <UButton type="submit" to="/auth/signup" class="w-1/2 no-underline" block>
                Se connecter
            </UButton>
        </p>
    </article>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'confirmation',
})
</script>
