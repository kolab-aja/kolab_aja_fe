import { useAuthStore } from "@/store/auth";

// REDIRECT KE NOT-FOUND PAGE APABILA TELAH LOGIN

export default function BlockLogin(to, from, next) {
    const authStore = useAuthStore();

    // REDIRECT KE PAGE NOT-FOUND APABILA SUDAH LOGIN DAN MENGAKSES PAGE LOGIN
    if (authStore.isLogin) {
        next('/not-found');
        return true;
    }

    // APABILA BLM LOGIN LANJUT KE MIDDLEWARE SELAJUTNYA
    return false;
}