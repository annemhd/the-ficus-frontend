<template>
    <main class="w-screen h-screen p-4">
        <header class="flex justify-between">
            <section class="flex gap-1">
                <UButton to="/" color="gray" variant="ghost" label="Marché" />
                <UButton to="/about" color="gray" variant="ghost" label="À propos" />
            </section>
            <Account />
        </header>
        <slot />
    </main>
</template>
