<script setup>
import {object, string} from "yup";
import {UPDATE_PLAYLIST} from "~/graphql/mutation/updatePlaylist.js";

const loading = ref(false)
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isOwner: {
    type: Boolean,
    required: true
  }
})

const schema = object({
  name: string().min(3).max(20).required('Valeur requise'),
  description: string()
})

const state = reactive({
  name: props.data?.getPlaylist.name,
  description: props.data?.getPlaylist.description
})
const emit = defineEmits(['refresh'])
const toast = useToast()

async function onSubmit () {
  const { mutate } = useMutation(UPDATE_PLAYLIST, {
    variables: {
      updatePlaylistId: useRoute().params.id,
      playlist: {
        name: state.name,
        description: state.description
      }
    }
  })
  try {
    const { data } = await mutate()
    emit('refresh')
    toast.add({
      title: 'Playlist updated successfully !',
      icon: 'i-lucide-square-check',
      color: 'success'
    })
  } catch (error) {
    toast.add({
      title: 'Error to update your playlist !',
      icon: 'i-lucide-circle-x',
      color: "error"
    })
    console.error('Apollo mutation error:', error)
  }
}
</script>

<template>
  <div class="flex items-center gap-6 mt-10">
    <img
        class="w-64 h-64 object-cover rounded-xl shadow-xl"
        :src="data?.getPlaylist.images?.[0]?.url"
        alt="playlist cover"
    />
    <div>
      <UForm :schema="schema" :state="state" class="space-y-4">
        <UFormField>
          <UInput
              v-model="state.name"
              :disabled="!isOwner"
              color="neutral"
              variant="ghost"
              placeholder="Search..."
              size="xl"
              :loading="loading"
              :style="{ fontSize: '2rem', fontWeight: '600' }"
              @change="onSubmit"
          />
        </UFormField>
        <UFormField>
          <UTextarea
              v-model="state.description"
              :disabled="!isOwner"
              color="primary"
              variant="ghost"
              placeholder="Type something..."
              :maxrows="4"
              autoresize
              :loading="loading"
              class="w-full"
              @change="onSubmit"
          />
        </UFormField>
      </UForm>
      <div class="flex items-center gap-2 text-sm text-gray-300 mt-4">
        <span>By</span>
        <UAvatar :src="data?.getPlaylist.owner.images?.url" size="xs" :alt="data?.getPlaylist.owner.display_name" />
        <span class="font-semibold text-white">{{ data?.getPlaylist.owner.display_name }}</span>
      </div>
      <div class="text-gray-300 mt-4">
        <span>{{ data?.getPlaylist.tracks.total }} tracks</span>
      </div>
    </div>
  </div>
</template>
