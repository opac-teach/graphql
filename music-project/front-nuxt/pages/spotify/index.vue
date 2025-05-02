<script setup lang="ts">
import {GET_CURRENT_USER} from "~/graphql/queries/getCurrentUser";
import CreatePlaylist from "~/components/playlist/modal/CreatePlaylist.vue";

const { data, error, pending } = await useAsyncQuery(GET_CURRENT_USER)


</script>

<template>
  <UContainer class="py-10 space-y-8">
    <h1 class="text-3xl font-semibold text-primary">Spotify Account</h1>
    <div class="flex items-center gap-6">
      <UAvatar :src="data?.getCurrentUser.images?.url" :alt="data?.getCurrentUser.display_name" size="3xl" />
      <div>
        <h1 class="text-2xl font-bold text-white capitalize">{{ data?.getCurrentUser.display_name }}</h1>
        <p class="text-zinc-400">{{ data?.getCurrentUser.email }}</p>
      </div>
    </div>

    <div class="mt-20">
      <div class="flex justify-between">
        <h2 class="text-2xl font-semibold mb-4 text-white">
          Your Playlists
        </h2>
        <CreatePlaylist />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20">
        <UCard
            v-for="playlist in data?.getCurrentUser.playlists.items"
            :key="playlist.id"
            class="bg-zinc-900 border border-white/10 hover:border-white/20 transition"
        >
          <template #header>
            <img :src="playlist?.images?.[0]?.url" alt="cover" class="w-full h-70 object-cover rounded-t-md" />
          </template>
          <template #default>
            <div class="flex justify-between">
              <h3 class="text-lg font-bold text-white">{{ playlist.name }}</h3>
              <UButton
                  :to="`/spotify/playlist/${playlist.id}`"
                  icon="i-lucide-pen"
                  size="xl"
                  class="font-bold rounded-full p-4"
                  color="primary"
                  variant="soft"
              />
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
