<template>
    <input ref="file" @change="uploadImage" type="file" class="hidden" />
    <div class="grid grid-cols-3 gap-4 content-stretch mb-4">
        <div v-for="source in imgs" class="rounded-2xl overflow-hidden relative gap-2">
            <div class="h-36 w-full flex overflow-hidden bg-gray-200">
                <img :src="source" class="object-cover object-center h-36 w-full" />
            </div>
            <UButton
                color="pink"
                icon="i-iconamoon-close-fill"
                class="absolute top-2 left-2 rounded-full"
                size="xs"
                @click="deleteImage(source)"
            />
        </div>

        <div
            v-for="img in imgQuota"
            class="flex justify-center items-center border-2 border-dotted border-primary h-36 w-full rounded-2xl gap-2"
        >
            <UButton
                color="primary"
                variant="soft"
                icon="i-tabler-plus"
                class="rounded-full"
                @click="triggerFileInput"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { uploadFile, deleteFile, getUrl } from '~/services/images.supabase'

const emit = defineEmits(['images'])
const file: any = useTemplateRef('file')
const src = ref()
const imgs: any = ref([])

const imgQuota = computed(() => 3 - imgs.value.length)

const triggerFileInput = () => {
    file.value.click()
}

const uploadImage = async () => {
    const upload = await uploadFile(file.value.files[0])
    src.value = await getUrl(`articles/${upload?.path}`)
    imgs.value.push(src.value.data.publicUrl)
    emit('images', imgs.value)
}

const deleteImage = async (path: any) => {
    await deleteFile(path)
    const index = imgs.value.indexOf(path)

    if (index > -1) {
        // If the item exists in the array
        imgs.value.splice(index, 1)
    }
}
</script>
