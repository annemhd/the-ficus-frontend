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
                <div class="p-1 flex flex-col gap-1">
                    <UCheckbox
                        v-for="category in categories"
                        :label="category.label"
                        class="hover:bg-gray-100 p-1"
                        @click="handleCategories(category)"
                    />
                </div>
            </template>
        </UPopover>
        <USelectMenu
            v-model="selectedCities"
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
                <div v-if="selectedCities.length" class="truncate flex gap-2">
                    <div class="font-medium">
                        Ville<span v-if="selectedCities.length > 1">s</span>
                    </div>
                    <UBadge color="primary" variant="soft" size="xs">{{
                        selectedCities.length
                    }}</UBadge>
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
const selectedCities: any = ref([])
const selectedCategories: any = ref([])

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

const selectedSort = ref('pertinent')

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

const categories = ref([
    {
        label: 'Plantes intérieur',
        value: 'indoor_plants',
        checked: false,
    },
    {
        label: 'Plantes extérieur',
        value: 'outdoor_plants',
        checked: false,
    },
    { label: 'Boutures', value: 'cuttings', checked: false },
    {
        label: 'Vases et caches pots',
        value: 'vases_and_pot_covers',
        checked: false,
    },
    { label: 'Outils', value: 'tools', checked: false },
])

const handleCategories = (category: any) => {
    const index = selectedCategories.value.indexOf(category)

    if (index > -1) {
        selectedCategories.value.splice(index, 1)
    } else {
        selectedCategories.value.push(category)
    }
}

async function search(query: string) {
    loading.value = true

    const users: any[] = await $fetch(
        `https://geo.api.gouv.fr/communes?nom=${query}&fields=departement&boost=population&limit=4`
    )

    loading.value = false

    return users
}
</script>
