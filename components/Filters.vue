<template>
    <section class="flex gap-2">
        <UPopover>
            <UButton
                class="rounded-xl py-2 px-4"
                color="black"
                variant="solid"
                icon="i-tabler-sort-descending-2-filled"
                trailing
                label="Trier par"
            />
            <template #panel>
                <div class="p-4 flex flex-col gap-3">
                    <URadio
                        v-for="option of options"
                        :key="option.value"
                        v-model="selectedSort"
                        v-bind="option"
                    />
                </div>
            </template>
        </UPopover>
        <UPopover>
            <UButton
                class="rounded-xl py-2 px-4"
                color="black"
                variant="solid"
                icon="i-tabler-tags-filled"
                trailing
                label="Catégories"
            />
            <template #panel>
                <div class="p-4 flex flex-col gap-3">
                    <UCheckbox label="Plantes intérieur" />
                    <UCheckbox label="Plantes extérieur" />
                    <UCheckbox label="Boutures" />
                    <UCheckbox label="Vases et caches pots" />
                    <UCheckbox label="Outils" />
                </div>
            </template>
        </UPopover>
        <UPopover>
            <UButton
                class="rounded-xl py-2 px-4"
                color="black"
                variant="solid"
                icon="i-tabler-coin-euro-filled"
                label="Prix"
                trailing
            />
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

const selectedSort = ref('pertinent')
</script>
