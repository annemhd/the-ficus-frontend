<template>
    <header class="pt-4 flex justify-between gap-2">
        <Filters />
    </header>
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

const selected = ref('sms')
</script>
