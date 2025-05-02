<script setup>
import ItemTrack from "~/components/tracks/ItemTrack.vue";

defineProps({
  tracks: {
    type: Object,
    required: true
  },
  isOwner: {
    type: Boolean,
    required: true
  }
})

</script>

<template>
  <div
      v-for="item in tracks"
      :key="item.track.id"
      class="track-card bg-gray-800 rounded-lg p-4 flex items-center hover:shadow-xl transition-all"
  >
    <ItemTrack :item="item" :is-owner="isOwner" />
  </div>
</template>
