<template>
    <input ref="file" @change="uploadImage" type="file" class="hidden" />
    <div
        class="grid gap-4 content-stretch justify-center"
        :class="{
            'grid-cols-3': props.for === 'articles',
            'size-56': props.for === 'users',
            'h-40 w-full': props.for === 'articles',
        }"
    >
        <div v-for="source in imgs" class="rounded-2xl overflow-hidden relative gap-2">
            <div
                class="flex overflow-hidden bg-gray-200"
                :class="{
                    'size-56': props.for === 'users',
                    'h-40 w-full': props.for === 'articles',
                }"
            >
                <img
                    :src="source"
                    class="object-cover object-center"
                    :class="{
                        'size-56': props.for === 'users',
                        'h-40 w-full': props.for === 'articles',
                    }"
                />
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
            v-if="props.for === 'users' && imgs.length === 0"
            class="flex justify-center items-center border-2 border-dotted border-gray-300 dark:border-gray-700 size-56 rounded-2xl gap-2"
        >
            <UButton
                color="primary"
                variant="soft"
                icon="i-tabler-plus"
                class="rounded-full"
                @click="triggerFileInput"
            />
        </div>

        <div
            v-if="props.for === 'articles'"
            v-for="img in imgQuota"
            class="flex justify-center items-center border-2 border-dotted border-gray-300 dark:border-gray-700 h-40 w-full rounded-2xl gap-2"
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
const props = defineProps(['for', 'avatar'])
const file: any = useTemplateRef('file')
const src = ref()
const imgs: any = ref([])

const imgQuota = computed(() => (props.for === 'users' ? 1 : 3 - imgs.value.length))

const triggerFileInput = () => {
    file.value.click()
}

const uploadImage = async () => {
    var upload
    if (props.for === 'users') {
        upload = await uploadFile(file.value.files[0], 'users')
        src.value = await getUrl(`users/${upload?.path}`)
    } else if (props.for === 'articles') {
        upload = await uploadFile(file.value.files[0], 'articles')
        src.value = await getUrl(`articles/${upload?.path}`)
        if (file.value.files[0]) imgs.value.push(src.value.data.publicUrl)
        console.log(file.value.files[0])
        emit('images', imgs.value)
    }
}

const deleteImage = async (path: any) => {
    await deleteFile(path, props.for)
    const index = imgs.value.indexOf(path)

    if (index > -1) {
        // If the item exists in the array
        imgs.value.splice(index, 1)
    }
}
</script>
