// composables/useAuthUser.ts
import {useAuthStore} from "~/store/auth.js";
import {GET_CURRENT_USER_PROFILE} from "~/graphql/queries/getCurrentUser.js";

export const useAuthUser = async () => {
    const auth = useAuthStore()

    try {
        const { data} = await useAsyncQuery(GET_CURRENT_USER_PROFILE)
        auth.user = data.value?.getCurrentUser
    } catch (error) {
        console.error('Erreur utilisateur', error)
    }
}
