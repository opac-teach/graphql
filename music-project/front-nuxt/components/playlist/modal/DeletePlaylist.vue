<script setup>
import {REMOVE_PLAYLIST} from "~/graphql/mutation/removePlaylist.js";

const first = ref(false)
const router = useRouter()
const route = useRoute()
const toast = useToast()

const deletePlaylist = async () => {
  const { mutate } = useMutation(REMOVE_PLAYLIST, {
    variables: {
      removePlaylistId: route.params.id
    }
  })
  try {
    const { data } = await mutate()
    if (data?.removePlaylist?.success) {
      toast.add({
        title: 'Playlist updated successfully !',
        icon: 'i-lucide-square-check',
        color: 'success'
      })
      await router.push('/spotify')
    }
  } catch (e) {
    toast.add({
      title: 'Error to update your playlist !',
      icon: 'i-lucide-circle-x',
      color: "error"
    })
  }
}
</script>

<template>
  <UModal v-model:open="first" :dismissible="false" :ui="{ footer: 'justify-end' }">
    <UButton
        color="error"
        variant="subtle"
        size="xl"
        icon="i-lucide-trash-2"
        class="cursor-pointer"
    />
    <template #header>
      <div>Do you want delete this playlist ?</div>
    </template>
    <template #footer>
      <UButton label="Close" color="neutral" variant="outline" class="cursor-pointer" @click="first = false" />
      <UButton label="Delete" color="error" class="cursor-pointer" @click="deletePlaylist" />
    </template>
  </UModal>
</template>

<style scoped>

</style>