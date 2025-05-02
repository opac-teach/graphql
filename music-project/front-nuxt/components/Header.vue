<script setup lang="ts">
import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore()
const { $api } = useNuxtApp()
const items = [
  [{ label: 'My profil', to: '/spotify' }],
  [{ label: 'Logout', icon: 'lucide:log-out', click: handleLogout, color: 'error' }]
]

async function handleSpotifyLogin() {
  const { url } = await $api.spotify.login()
  window.location.href = url
}

function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <div class="flex items-center justify-between h-16 px-4">
    <div class="flex items-center">
      <p class="text-white font-bold">Music Library</p>
    </div>

    <div>
      <template v-if="authStore.isAuthenticated">
        <UDropdownMenu :items="items" :popper="{ placement: 'bottom-end' }">
          <UButton variant="link" class="h-10 px-2 min-w-0 cursor-pointer">
            <div class="flex items-center gap-2">
              <Icon name="logos:spotify-icon" class="w-5 h-5" />
              <span class="text-white capitalize">{{ authStore.user?.display_name }}</span>
              <Icon name="lucide:chevron-down" class="w-4 h-4 text-zinc-400" />
            </div>
          </UButton>
        </UDropdownMenu>
      </template>

      <template v-else>
        <UButton
            variant="soft"
            icon="logos:spotify-icon"
            class="cursor-pointer rounded-2xl py-2 px-4"
            @click="handleSpotifyLogin"
        >
          Connect with Spotify
        </UButton>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>