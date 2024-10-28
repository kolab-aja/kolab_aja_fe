import { useAuthStore } from "@/store/auth"

// HANDLE SUDAH LOGIN / BLM
// BLOCK PAGE YG TIDAK SESUAI ROLE

export default function WithRoles(to, from, next, roles) {
    const authStore = useAuthStore();

    // REDIRECT KE PAGE LOGIN APABILA BELUM LOGIN
    if ( !authStore.isLogin ) {
        next("/login");
        return true;
    }
    // REDIRECT KE PAGE NOT-FOUND APABILA USER MENGAKSES PAGE YANG TIDAK DIPERBOLEHKAN UNTUK ROLES TERSEBUT
    else if ( !roles.includes(authStore.userRoles) ) {
        next("/not-found")
        return true;
    }
    // APABILA USER MEMILIKI HAK UTK MENGAKSES PAGE TSB ( GUARD DARI FE ), MAKA LANJUT KE MIDDLEWARE SELANJUTNYA
    return false;

}