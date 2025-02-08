import { useProfileStore } from "@/store/profile";
import { useAuthStore } from "@/store/auth";

export default async function ForceFill(to, from, next) {
    const authStore = useAuthStore();

    const profileStore = useProfileStore();

    if (!profileStore.data) {
        await profileStore.getProfile();
    }

    let statusIsi = profileStore.data.data_pengguna.id_status_pengguna;

    if (authStore.userRoles == 'creative-hub-team' && profileStore.data.data_pengguna.status_ganti_password == 0 && to.path != `/${authStore.userRoles}/edit-account`) {
        next(`/${authStore.userRoles}/edit-account`)

        return true
    } else if (statusIsi == 1 && to.path != `/${authStore.userRoles}/edit-profile` && (authStore.userRoles == 'creative-hub-team' && profileStore.data.data_pengguna.status_ganti_password == 1)) {
        next(`/${authStore.userRoles}/edit-profile`)
        return true

    } else if (statusIsi == 2 && to.path != `/${authStore.userRoles}/edit-payment`) {
        next(`/${authStore.userRoles}/edit-payment`)

        return true
    } else if (statusIsi == 3 && to.path != `/${authStore.userRoles}/edit-profile`) {
        next(`/${authStore.userRoles}/edit-profile`)

        return true
    } else if (statusIsi == 4) {
        return false
    }
    return false
}