import { defineStore } from 'pinia'
import { useCookie, useRoute, useRouter, useApollo } from '#imports'
import {useAuthUser} from "~/composables/useAuthUser.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async init() {
            const cookieToken = useCookie('access_token', {
                watch: false,
                maxAge: 60 * 60 * 24 * 7
            })
            const route = useRoute()
            const router = useRouter()
            const { onLogin } = useApollo()

            const queryToken = route.query.access_token

            if (queryToken) {
                this.token = queryToken
                useCookie('access_token').value = queryToken

                await router.replace({query: {...route.query, access_token: undefined}})
            } else {
                this.token = cookieToken.value || null
            }

            if (this.token) {
                onLogin(this.token)
                await useAuthUser()
            }
        },

        logout() {
            this.token = null
            useCookie('access_token').value = null
        },
    },
})
