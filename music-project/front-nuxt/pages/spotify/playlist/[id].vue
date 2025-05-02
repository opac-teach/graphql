<script setup lang="ts">
import {GET_PLAYLIST} from "~/graphql/queries/getPlaylist";
import {useAuthStore} from "~/store/auth";
import ListTracks from "~/components/tracks/ListTracks.vue";
import PlaylistHeader from "~/components/playlist/PlaylistHeader.vue";
import SearchTracks from "~/components/playlist/modal/SearchTracks.vue";
import DeletePlaylist from "~/components/playlist/modal/DeletePlaylist.vue";

const route = useRoute()
const limit = ref(10)
const page = ref(0)
const variables = {
  getPlaylistId: route.params.id,
  limit,
  page
}
const { data, error, pending, refresh } = await useAsyncQuery(GET_PLAYLIST, variables)
const el = ref(null)
const tracks = ref([])
const isLoadingMore = ref(false)
const authStore = useAuthStore()
const isOwner = computed(() => data.value?.getPlaylist.owner.id === authStore.user?.id)

useInfiniteScroll(
    el,
    async () => {
      if (isLoadingMore.value) return
      isLoadingMore.value = true
      page.value++
      await refresh()
      isLoadingMore.value = false
    },
    {
      distance: 150,
      canLoadMore: () => {
        const total = data.value?.getPlaylist?.tracks.total || 0
        return tracks.value.length < total && !isLoadingMore.value
      }
    }
)

watch(data, (newData) => {
  if (newData?.getPlaylist?.tracksPaginated?.items) {
    tracks.value.push(...newData.getPlaylist.tracksPaginated.items)
  }
}, { immediate: true })

</script>

<template>
    <div class="playlist-container bg-black text-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between">
        <NuxtLink to="/spotify">
          <UIcon name="i-lucide-arrow-left" class="size-10" />
          go back
        </NuxtLink>
        <div>
          <DeletePlaylist v-if="isOwner" />
        </div>
      </div>
      <PlaylistHeader :data="data" :is-owner="isOwner" @refresh="refresh" />
      <div class="mt-10">
        <h2 class="text-2xl font-semibold text-white">Tracks</h2>
        <div class="mt-6 space-y-6" >
          <SearchTracks v-if="isOwner" @refresh="refresh" />
          <ListTracks :tracks="tracks" :isOwner="isOwner" />
          <div ref="el" />
        </div>
      </div>

    </div>
</template>

<style>
.playlist-container {
  background: linear-gradient(135deg, #1a1a1a, #333);
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}

.track-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

.track-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

.track-card img {
  transition: transform 0.3s ease;
}

.track-card:hover img {
  transform: scale(1.1);
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2e7d32;
}
</style>
