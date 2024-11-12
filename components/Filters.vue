<template>
    <section class="flex gap-1 justify-center items-center">
        <UPopover>
            <UButton class="rounded-xl hover:bg-gray-100" color="black" variant="ghost">
                Trier par
                <UIcon name="i-flowbite-chevron-down-outline" class="w-5 h-5 text-gray-400"
            /></UButton>
            <template #panel>
                <div class="p-2 flex flex-col gap-3">
                    <URadioGroup v-model="selectedSort" :options="sorting" />
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
            :searchable="search"
            :ui-menu="uiMenu"
            loadingIcon="i-flowbite-chevron-down-outline"
            trailingIcon="i-flowbite-chevron-down-outline"
            option-attribute="name"
            by="name"
            variant="none"
            searchablePlaceholder="Recherche..."
            clearSearchOnClose
            multiple
            trailing
        >
            <template #label>
                <span>Villes</span>
                <UBadge v-if="selectedCities.length > 0" variant="soft" size="xs">{{
                    selectedCities.length
                }}</UBadge>
            </template>
            <template #option="{ option: city }">
                <span class="">{{ city.name }}</span>
                <span class="truncate text-gray-400">{{ city.departement }}</span>
            </template>
            <template #empty>ex. Montreuil, Toulon, etc.</template>
            <template #option-empty="{ query }">
                Pas de résultats pour <q>{{ query }}</q>
            </template>
        </USelectMenu>

        <UPopover>
            <UButton class="rounded-xl hover:bg-gray-100" color="black" variant="ghost">
                Prix <UIcon name="i-flowbite-chevron-down-outline" class="h-5 w-5 text-gray-400"
            /></UButton>
            <template #panel>
                <div class="flex gap-2 p-4">
                    <UInput
                        v-model="selectedPrice"
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

        <UButton
            v-if="resetFilter"
            icon="i-tabler-trash"
            color="pink"
            size="sm"
            class="flex justify-center items-center"
            @click="reset"
        />
    </section>
</template>
<script setup lang="ts">
const emit = defineEmits(['sort', 'cities', 'categories', 'price'])

const selectedSort = ref<string>('ascending_date')
const selectedCategories: any = ref([])
const selectedCities: any = ref([])
//taf
const selectedPrice = ref<number>()

const uiMenu = ref({
    width: 'min-w-60',
    select: 'inline-flex items-center text-left cursor-pointer',
    popper: {
        placement: 'bottom',
    },
})

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

const sorting = ref([
    {
        value: 'ascending_date',
        label: 'Plus récentes',
    },
    {
        value: 'descending_date',
        label: 'Plus anciennes',
    },
])

const resetFilter = computed(
    () =>
        (selectedSort.value !== 'ascending_date' ||
            selectedCategories.value > 0 ||
            selectedCities.value.length > 0 ||
            selectedPrice.value) ??
        0 > 0
)

const handleCategories = (category: any) => {
    const index = selectedCategories.value.indexOf(category)

    if (index > -1) {
        selectedCategories.value.splice(index, 1)
    } else {
        selectedCategories.value.push(category)
    }
}

const reset = () => {
    selectedSort.value = 'ascending_date'
    selectedCities.value = []
    selectedCategories.value = []
    selectedPrice.value = 0
}

async function search(query: string) {
    const cities: [] = await $fetch(
        'https://geo.api.gouv.fr/communes?nom=&fields=departement&boost=population&limit=6',
        { params: { nom: query } }
    )

    return cities.map(
        (city: { label: string; nom: number; departement: { code: string; nom: string } }) => ({
            name: city.nom,
            code: city.departement.code,
            departement: city.departement.nom,
        })
    )
}

watch(
    () => [selectedSort.value, selectedCities.value, selectedCategories.value, selectedPrice.value],
    async ([sort, cities, cat, price]) => {
        emit('sort', sort)

        if (cities?.length > 0)
            emit(
                'cities',
                cities.map((item: any) => item.name)
            )

        if (selectedCategories.value?.length > 0)
            emit(
                'categories',
                selectedCategories.value.map((item: any) => item.value)
            )
        else
            emit(
                'categories',
                cat.map((item: any) => item.value)
            )

        if (price?.length > 0) emit('price', price)
    },
    { deep: true }
)
</script>
