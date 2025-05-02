<script setup>
import {object, string} from "yup";
import {CREATE_PLAYLIST} from "~/graphql/mutation/createPlaylist.js";

const schema = object({
  name: string().min(3).required(' Champs requis'),
  description: string()
})

const state = reactive({
  name: undefined,
  description: undefined
})
const router = useRouter()
const toast = useToast()

async function onSubmit(event) {
  const { mutate } = useMutation(CREATE_PLAYLIST, {
    variables: {
      playlist: {
        name: state.name,
        description: state.description || ''
      }
    }
  })
  try {
    const { data } = await mutate()
    toast.add({
      title: 'Playlist updated successfully !',
      icon: 'i-lucide-square-check',
      color: 'success'
    })
    await router.push('/spotify/playlist/' + data.createPlaylist.id)
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
  <UModal title="Create playlist">
    <UButton label="Create playlist" variant="subtle" class="cursor-pointer" />
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" class="w-full" placeholder="Name playlist" />
        </UFormField>

        <UFormField label="Description" name="description">
          <UTextarea v-model="state.description" class="w-full" autoresize :maxrows="4" placeholder="Describe playlist..." />
        </UFormField>

        <UButton type="submit" variant="subtle" class="cursor-pointer">
          Submit
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped>

</style>