<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  isOwner: {
    type: Boolean,
    required: true
  }
})

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

</script>

<template>
  <img
      class="w-16 h-16 object-cover rounded-full mr-4"
      :src="item.track.album.images?.[0]?.url"
      alt="track cover"
  />

  <div>
    <p class="text-lg font-semibold">{{ item.track.name }}</p>
    <p class="text-sm text-gray-400">{{ item.track.artists[0]?.name }}</p>
  </div>

  <div class="ml-auto flex items-center gap-6">
    <p class="text-sm text-gray-300 min-w-[50px] text-right">
      {{ formatDuration(item.track.duration_ms) }}
    </p>

    <UButton
        v-if="isOwner"
        color="error"
        variant="soft"
        size="xl"
        icon="i-lucide-trash-2"
        class="p-2 rounded-full text-sm rounded-full cursor-pointer"
    />
  </div>
</template>

