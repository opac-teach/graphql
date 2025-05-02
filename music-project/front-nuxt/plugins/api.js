import axios from "axios";

export default defineNuxtPlugin(nuxtApp => {
    const axiosInstance = axios.create({
        baseURL: nuxtApp.$config.public.apiHost
    })

    const get = async (url) => {
        try {
            return (await axiosInstance.get(url)).data
        } catch (e) {
            return e
        }
    }

    const api = {
        spotify: {
            async login () {
                return await get('/auth/spotify')
            }
        }
    }

    nuxtApp.provide('api', api)
})