<template>
    {{ imgs }}
    <div v-if="src">
        <img v-for="source in imgs" :src="source" />
    </div>

    <input ref="file" @change="uploadImage" type="file" />
    <UButton color="black" @click="triggerFileInput">ajouter</UButton>
</template>
<script setup lang="ts">
import { uploadFile, getUrl } from '~/services/images.supabase'

const emit = defineEmits(['images'])
const file: any = useTemplateRef('file')
const src = ref()
const imgs: any = ref([])

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
