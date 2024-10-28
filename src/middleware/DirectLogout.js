import { useAuthStore } from "@/store/auth";

// DIPAKAI HANYA UNTUK /logout 

export default async function DirectLogout (to, from, next) {
    const authStore = useAuthStore();
    // authStore.logout AKAN MEMANGGIL authStore.removeLocalStorage YANG AKAN REDIRECT KE LOGIN PAGE
    try { await authStore.logout() } 
    catch (err) {}
    return false;
}