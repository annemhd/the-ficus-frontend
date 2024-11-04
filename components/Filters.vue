<template>
    <section class="flex gap-2">
        <UPopover>
            <UButton color="gray" variant="soft" icon="i-tabler-sort-descending-2-filled" trailing>
                Trier par</UButton
            >

            <template #panel>
                <div class="p-4">
                    <URadioGroup v-model="selected" :options="options" />
                </div>
            </template>
        </UPopover>
        <UPopover>
            <UButton color="gray" variant="soft" icon="i-tabler-tags-filled" trailing disabled>
                Catégories</UButton
            >

            <template #panel>
                <div class="p-4">
                    <UCheckbox label="Plantes intérieur" />
                    <UCheckbox label="Plantes extérieur" />
                    <UCheckbox label="Boutures" />
                    <UCheckbox label="Vases et caches pots" />
                    <UCheckbox label="Outils" />
                </div>
            </template>
        </UPopover>
        <UPopover>
            <UButton color="gray" variant="soft" icon="i-tabler-coin-euro-filled" trailing disabled>
                Prix</UButton
            >

            <template #panel>
                <div class="flex gap-2 p-4">
                    <UInput
                        size="sm"
                        color="white"
                        :trailing="false"
                        placeholder="Min"
                        class="w-24"
                    >
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                        </template>
                    </UInput>
                    <UInput
                        size="sm"
                        color="white"
                        :trailing="false"
                        placeholder="Max"
                        class="w-24"
                    >
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                        </template>
                    </UInput>
                </div>
            </template>
        </UPopover>
    </section>
</template>
<script setup lang="ts">
const options = [
    {
        value: 'pertinent',
        label: 'Pertinences',
    },
    {
        value: 'ascending',
        label: 'Plus récentes',
    },
    {
        value: 'descending',
        label: 'Plus anciennes',
    },
]

const selected = ref('pertinent')
</script>
