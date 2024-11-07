<template>
    <section class="flex gap-1">
        <UPopover>
            <UButton class="rounded-xl hover:bg-gray-100" color="black" variant="ghost">
                Trier par
                <UIcon name="i-flowbite-chevron-down-outline" class="w-5 h-5 text-gray-400"
            /></UButton>
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
            <UButton class="rounded-xl hover:bg-gray-100" color="black" variant="ghost">
                Catégories
                <UIcon name="i-flowbite-chevron-down-outline" class="h-5 w-5 text-gray-400"
            /></UButton>
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
        <USelectMenu
            v-model="selected"
            class="mt-0.5 hover:bg-gray-100 px-1 rounded-lg"
            placeholder="Ville"
            searchablePlaceholder="Recherche"
            option-attribute="nom"
            by="code"
            variant="none"
            selectedIcon="i-tabler-check"
            trailingIcon="i-flowbite-chevron-down-outline"
            :ui-menu="uiMenu"
            :loading="loading"
            :searchable="search"
            multiple
        >
            <template #label>
                <div v-if="selected.length" class="truncate flex gap-2">
                    <div class="font-medium">Ville<span v-if="selected.length > 1">s</span></div>
                    <UBadge color="primary" variant="soft" size="xs">{{ selected.length }}</UBadge>
                </div>
                <div v-else class="text-black font-medium cursor-pointer">Villes</div>
            </template>
            <template #option="{ option: city }">
                <div class="w-48">
                    <div>{{ city.nom }}</div>
                    <div class="text-xs text-gray-400">{{ city.departement.nom }}</div>
                </div>
            </template>
        </USelectMenu>
        <UPopover>
            <UButton class="rounded-xl hover:bg-gray-100" color="black" variant="ghost">
                Prix <UIcon name="i-flowbite-chevron-down-outline" class="h-5 w-5 text-gray-400"
            /></UButton>
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
const loading = ref(false)
const selected = ref([])

const uiMenu = ref({
    width: 'w-56',
    select: 'inline-flex items-center text-left cursor-pointer',
    popper: {
        placement: 'bottom',
    },
    default: {
        empty: {
            label: 'ex. Montreuil, Nice, etc.',
        },
        optionEmpty: {
            label: 'Pas de resultats pour "{query}"',
        },
    },
})

async function search(query: string) {
    loading.value = true

    const users: any[] = await $fetch(
        `https://geo.api.gouv.fr/communes?nom=${query}&fields=departement&boost=population&limit=4`
    )

    loading.value = false

    return users
}

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
