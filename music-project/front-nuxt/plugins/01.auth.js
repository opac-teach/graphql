import {useAuthStore} from "~/store/auth.js";

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore()
    authStore.init()

    return {
        provide: {
            auth: {
                get token() {
                    return authStore.token?.value || null
                },
                get isAuthenticated() {
                    return authStore.isAuthenticated
                },
            },
        },
    }
})