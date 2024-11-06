<template>
    <div class="w-96 flex flex-col justify-center items-center prose">
        <h1 class="text-center">Inscription pris en compte</h1>
        <p class="text-center text-sm">
            Un mail de confirmation a été envoyé. Une fois votre mail validée, vous pourrez vous
            connecter
        </p>

        <div class="flex gap-2">
            <UButton
                color="black"
                variant="solid"
                to="/auth/signin"
                class="no-underline"
                label="Se connecter"
            />
            <UButton
                color="gray"
                variant="soft"
                to="/"
                class="no-underline"
                label="Retour à la page d'accueil"
            />
        </div>
    </div>
</template>
<script setup lang="ts"></script>
