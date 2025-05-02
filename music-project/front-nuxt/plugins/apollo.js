import {useAuthStore} from "~/store/auth.js";
import {provideApolloClient} from "@vue/apollo-composable";

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore()
    provideApolloClient(useApollo().clients.default)

    nuxtApp.hook("apollo:auth", ({client, token}) => {
        if (authStore.token.value) {
            token.value = `Bearer ${authStore.token.value}`
        }
    })
})
