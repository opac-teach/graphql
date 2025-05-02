<script setup>
import {SEARCH_TRACKS} from "~/graphql/queries/searchTracks"
import {ADD_ITEMS} from "~/graphql/mutation/addItems.js";

const searchTerm = ref('')
const variables = {
  value: searchTerm
}
const loading = ref(false)
const groups = ref([])
const selected = ref([])
const { data, pending, execute } = useAsyncQuery(
    SEARCH_TRACKS,
    variables,
    {
      lazy: true
    }
)

const results = computed(() => {
  const items = data.value?.searchTracks?.tracks?.items ?? []
  return items.map((track) => ({
    id: track.uri,
    label: track.name,
    suffix: track.artists.map((a) => a.name).join(', '),
    avatar: {
      src: track.album?.images?.[0]?.url || ''
    }
  }))
})

watchEffect(() => {
  groups.value = [{
    id: 'tracks',
    label: searchTerm.value ? `Tracks matching “${searchTerm.value}”...` : 'Tracks',
    items: results.value,
    ignoreFilter: true
  }]
})

const route = useRoute()
const toast = useToast()

const submitTracks = async () => {
  loading.value = true
  const { mutate } = useMutation(ADD_ITEMS, {
    variables: {
      addItemsId: route.params.id,
      playlist: {
        uris: selected.value.map((item) => item?.id)
      }
    }
  })
  try {
    const {data}  = await mutate()
    toast.add({
      title: 'Tracks add successfully in your playlist !',
      icon: 'i-lucide-square-check',
      color: 'success'
    })
  } catch (error) {
    toast.add({
      title: 'Error to add in your playlist !',
      icon: 'i-lucide-circle-x',
      color: "error"
    })
    console.error('Apollo mutation error:', error)
  }
  loading.value = false
  selected.value = []
}
</script>

<template>
  <UModal title="Search tracks" description="" @after:leave="$emit('refresh')">
    <UButton
        label="add tracks"
        variant="subtle"
        icon="i-lucide-plus"
        class="cursor-pointer"
    />

    <template #body>
      <UCommandPalette
          multiple
          v-model="selected"
          v-model:search-term="searchTerm"
          :loading="pending"
          :groups="groups"
          placeholder="Search users..."
          class="h-80"
          @update:searchTerm="execute"
      >
        <template #empty>
          Search tracks
        </template>
      </UCommandPalette>
    </template>
    <template v-if="selected.length > 0" #footer>
      <UButton variant="soft" :loading="loading" @click="submitTracks">
        add {{ selected.length }} tracks
      </UButton>
    </template>
  </UModal>
</template>

