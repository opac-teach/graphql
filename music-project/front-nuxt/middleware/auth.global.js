export default defineNuxtRouteMiddleware((to, from) => {
    const authPage = ['spotify', 'spotify-playlist-id']
    const token = useCookie('access_token', {
        watch: false,
        maxAge: 60 * 60 * 24 * 7
    })

    if (!token.value && authPage.includes(to.name)) {
        abortNavigation()
        return navigateTo('/')
    }
})