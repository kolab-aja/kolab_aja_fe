<template>
    <v-app>
        <TheSidebar active-at="/client/profile" navbar-title="Pengaturan Profil">
            <TheVCol class="d-flex flex-column ga-9">

                <TheVRow class="d-flex ga-4">
                    <v-avatar size="80" image="@/assets/images/default-profile-picture.png" style="border: 2px solid #8A76D4" />
                    <TheVCol class="d-flex flex-column justify-center">
                        <p style="font-size: 20px; font-weight: bold;">{{ currentNama }}</p>
                        <p style="font-size: 16px; color: #87868B; font-weight: 500;">{{ currentWilayah }}</p>
                    </TheVCol>
                </TheVRow>

                <form class="d-flex flex-column ga-9" @submit.prevent="handleSubmit">
                    <h2 style="font-size: 20px; font-family: 500;">Informasi Pengguna</h2>

                    <div>
                        <TheInput max-width="800" custom-label="Nama" v-model="name" :error-messages="errorName" />
                        <TheInput max-width="800" custom-label="Alamat Email" disabled v-model="email" />
                        <TheInput max-width="800" custom-label="Nomor Telepon" v-model="phoneNumber" :error-messages="errorPhoneNumber" />
                    </div>

                    <TheVCol md="8"><v-divider/></TheVCol>

                    <h2 style="font-size: 20px; font-family: 500;">Informasi Lokasi</h2>

                    <div>
                        <TheInput max-width="800" custom-label="Wilayah" v-model="wilayah" :error-messages="errorWilayah" placeholder="Format : Kota, Provinsi" />
                        <TheInput max-width="800" custom-label="Alamat" v-model="alamat" :error-messages="errorAlamat" />
                    </div>

                    <div v-if="statusIsi == 1">
                        <TheButton size="m" type="primary" button-type="submit" @click="handleClickSubmit" :disabled="disabledButtonSubmit">Simpan</TheButton>
                    </div>                    
                    <TheVRow class="d-flex ga-5" v-else>
                        <TheButton size="m" type="primary" button-type="submit" @click="handleClickSubmit">Simpan</TheButton>
                        <TheButton size="m" type="secondary" @click="handleBatal" >Batal</TheButton>
                    </TheVRow>
                </form>

            </TheVCol>
        </TheSidebar>
    </v-app>
</template>

<script setup>
    import TheSidebar from '@/components/client/TheSidebar.vue';
    import TheButton from '@/components/common/TheButton.vue';
    import TheInput from '@/components/common/TheInput.vue';
    import TheVRow from '@/components/common/TheVRow.vue';
    import TheVCol from '@/components/common/TheVCol.vue';
    import { ref } from 'vue';
    import { useProfileStore } from "@/store/profile.js"
    import { watch } from 'vue';
    import router from '@/router';
    import { useSnackbarStore } from '@/store/snackbar';

    let currentNama = "";
    let currentWilayah = "";

    let statusIsi;

    const name = ref("");
    const email = ref("");
    const phoneNumber = ref("");
    const wilayah = ref("");
    const alamat = ref("");

    const errorName = ref("");
    // const errorEmail = ref("");
    const errorPhoneNumber = ref("");
    const errorWilayah = ref("");
    const errorAlamat = ref("");

    const disabledButtonSubmit = ref(true);

    const profileStore = useProfileStore();
    const snackbarStore = useSnackbarStore();

    // DATA PROFIL TELAH DI-FETCHING DI FORCE-FILL MIDDLEWARE
    name.value = profileStore.data.data_pengguna.nama || '';
    email.value = profileStore.data.data_pengguna.email || '';
    phoneNumber.value = profileStore.data.data_pengguna.nomor_telepon || '';
    wilayah.value = profileStore.data.data_pengguna.lokasi || '';
    alamat.value = profileStore.data.data_pengguna.alamat || '';
    currentNama = name.value;
    currentWilayah = wilayah.value;
    statusIsi = profileStore.data.data_pengguna.id_status_pengguna;

    const handleClickSubmit = () => {
        if ( name.value == "" ) {
            errorName.value = "Nama tidak boleh kosong"
        } else {
            errorName.value = ""
        }

        if ( phoneNumber.value == "" ) {
            errorPhoneNumber.value = "Nomor Telepon tidak boleh kosong"
        } else {
            errorPhoneNumber.value
        }

        if ( wilayah.value == "" ) {
            errorWilayah.value = "Wilayah tidak boleh kosong"
        } else if ( wilayah.value.split(", ").length != 2 ) {
            errorWilayah.value = "Format wilayah harus berupa Kota, Provinsi"
        } else {
            errorWilayah.value = ""
        }

        if ( alamat.value == "" ) {
            errorAlamat.value = "Alamat tidak boleh kosong"
        } else {
            errorAlamat.value = ""
        }
    }

    const handleSubmit = async () => {
        if ( !errorName.value && !errorPhoneNumber.value && !errorWilayah.value && !errorAlamat.value ) {
            try {
                await profileStore.updateProfile({
                    nama: name.value,
                    email: email.value,
                    nomor_telepon: phoneNumber.value,
                    lokasi: wilayah.value,
                    alamat: alamat.value,
                })
                // UPDATE GLOBAL STORE PROFIL DATA DENGAN YANG BARU DI-EDIT
                await profileStore.getProfile()

                snackbarStore.showSnackbar({
                    type: "success",
                    message: "Data berhasil di update",
                    timeout: 5000,
                });
                // APABILA SETELAH ISI STATUS KE-UPDATE MENJADI 2 ( BLM ISI PAYMENT ), MAKA REDIRECT KE ISI PAYMENT PAGE
                if ( profileStore.data.data_pengguna.id_status_pengguna == 2 ) {
                    router.push("/client/edit-payment")
                } else {
                    router.push("/client/profile");
                }
            } catch ( err ) {
                    snackbarStore.showSnackbar({
                    message: err.response.data.errors,
                    timeout: 5000,
                });
            }
        }
    }

    const handleBatal = () => {
        router.push("/client/profile")
    }
    
    watch([name, phoneNumber, wilayah, alamat], ([newName, newPhoneNumber, newWilayah, newAlamat], [oldName, oldPhoneNumber, oldWilayah, oldAlamat]) => {
        if ( newName && newPhoneNumber && newWilayah && newAlamat ) {
            disabledButtonSubmit.value = false
        } else {
            disabledButtonSubmit.value = true
        }
    });

</script>

<style scoped>

</style>