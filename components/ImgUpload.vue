<template>
    <input ref="file" @change="uploadImage" type="file" class="hidden" />
    <div class="mt-6 grid grid-cols-3 gap-4 content-stretch mb-4">
        <div v-for="source in imgs" class="rounded-2xl overflow-hidden">
            <img :src="source" class="object-cover h-24 w-48" />
        </div>

        <div v-for="img in imgQuota" class="bg-stone-300 h-32 rounded-2xl"></div>
    </div>
    <UButton color="black" @click="triggerFileInput" block>Ajouter une photo</UButton>
</template>
<script setup lang="ts">
import { uploadFile, getUrl } from '~/services/images.supabase'

const emit = defineEmits(['images'])
const file: any = useTemplateRef('file')
const src = ref()
const imgs: any = ref([])

const imgQuota = computed(() => 6 - imgs.value.length)

const triggerFileInput = () => {
    file.value.click()
}

const uploadImage = async () => {
    const upload = await uploadFile(file.value.files[0])
    src.value = await getUrl(`articles/${upload?.path}`)
    imgs.value.push(src.value.data.publicUrl)
    emit('images', imgs.value)
}
</script>
