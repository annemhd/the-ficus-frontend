<template>
    <input ref="file" @change="uploadImage" type="file" class="hidden" />
    <div class="rounded-2xl overflow-hidden relative gap-2">
        <div class="flex overflow-hidden size-56">
            <img v-if="handleImage" :src="image" class="object-cover object-center size-56" />
            <div
                v-else
                class="size-56 flex flex-col justify-center items-center gap-2 border-dotted border-2 border-gray-300 rounded-2xl"
            >
                <div class="text-sm">Selectionner une photo</div>
                <UButton variant="soft" icon="i-tabler-upload" @click="triggerFileInput"></UButton>
            </div>
        </div>
        <div v-if="image" class="flex absolute bottom-2 left-2 gap-2">
            <UButton
                size="xs"
                color="blue"
                variant="soft"
                icon="i-tabler-edit"
                @click="triggerFileInput"
            />
            <UButton
                size="xs"
                color="red"
                variant="soft"
                icon="i-tabler-trash"
                @click="deleteImage(image)"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { uploadFile, deleteFile, getUrl } from '~/services/images.supabase'

const emit = defineEmits(['image'])
const props = defineProps(['avatar'])
const file: any = useTemplateRef('file')
const src = ref()
const image: any = ref()
const imageToDelete = ref('')
const isDelete = ref(true)
const hasAvatar = ref(false)

const handleImage = computed(() =>
    hasAvatar.value && image.value !== '' ? true : hasAvatar.value && isDelete.value ? false : true
)

const triggerFileInput = () => {
    file.value.click()
}

const uploadImage = async () => {
    var upload
    upload = await uploadFile(file.value.files[0], 'users')
    src.value = await getUrl(`users/${upload?.path}`)
    image.value = src.value.data.publicUrl

    imageToDelete.value = src.value.data.publicUrl
    await deleteFile(imageToDelete.value, 'avatar')
    if (isDelete.value) emit('image', src.value.data.publicUrl)

    isDelete.value = false
}

const deleteImage = async (path: any) => {
    isDelete.value = true
    await deleteFile(path, 'avatar')
    image.value = ''
    emit('image', '')
}

watch(
    () => props.avatar,
    (newVal) => {
        if (newVal) {
            image.value = newVal
            imageToDelete.value = newVal
            hasAvatar.value = true
        }
    },
    { immediate: true }
)
</script>
