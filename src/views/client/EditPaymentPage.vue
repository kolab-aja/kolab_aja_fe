<template>
    <v-app>
        <TheSidebar active-at="/client/payment" navbarTitle="Metode Pembayaran">
            <form class="d-flex flex-column ga-9" @submit.prevent="handleSubmit">
                <h2 style="font-size: 20px; font-family: 500;">Informasi Pembayaran</h2>

                <TheInput
                    max-width="800"
                    custom-label="Nomor Kartu"
                    prepend-inner-icon="mdi-credit-card"
                    append-inner-icon="mdi-lock-outline"
                    v-model="nomorKartu"
                    :error-messages="errorNomorKartu"
					minlength="15"
					maxlength="16"
					@keypress="isNumber($event)"
                />

                <TheVRow class="d-flex align-end ga-5" max-width="800">
                    <TheInput custom-label="Nama Depan" v-model="namaDepan" :error-messages="errorNamaDepan" />
                    <TheInput custom-label="Nama Belakang" v-model="namaBelakang" :error-messages="errorNamaBelakang" />
                </TheVRow>

                <TheVRow class="d-flex align-end ga-5" max-width="800">
                    <TheVRow class="d-flex align-end ga-5" max-width="390">
                        <TheInputNumber custom-label="Habis Berlaku" placeholder="MM" v-model="mm" :error-messages="errorMM" :min="1" :max="12" />
                        <TheInputNumber placeholder="YYYY" v-model="yy" :error-messages="errorYY" :min="new Date().getFullYear()" :max="new Date().getFullYear() + 100" />
                    </TheVRow>
                    <TheInput custom-label="CVV" max-width="390" v-model="cvv" :error-messages="errorCVV" minlength="3" maxlength="3" @keypress="isNumber($event)"/>
                </TheVRow>

                <div v-if="statusIsi == 2">
                    <TheButton size="m" type="primary" button-type="submit" @click="handleClickSubmit" :disabled="disabledButtonSubmit">Simpan</TheButton>
                </div>

                <TheVRow class="d-flex ga-5" v-else>
                    <TheButton size="m" type="primary" button-type="submit" @click="handleClickSubmit">Simpan</TheButton>
                    <TheButton size="m" type="secondary" @click="handleBack" >Batal</TheButton>
                </TheVRow>
            </form>
        </TheSidebar>
    </v-app>
</template>

<script setup>
    import TheSidebar from '@/components/client/TheSidebar.vue';
    import TheInput from "@/components/common/TheInput.vue";
    import TheInputNumber from '@/components/common/TheInputNumber.vue';
    import TheButton from '@/components/common/TheButton.vue';
    import TheVRow from '@/components/common/TheVRow.vue';
    import { onMounted, ref, watch } from 'vue';
    import { useClientBillingStore } from '@/store/client/billing';
    import { useProfileStore } from '@/store/profile';
    import router from '@/router';
    import { useSnackbarStore } from '@/store/snackbar';

    // REF DEFAULT VALUE EMPTY STRING -> TheInput ( STRING ONLY )
    // REF DEFAULT VALUE null -> TheInputNumber ( INTEGER )

    let statusIsi;

    const clientBillingStore = useClientBillingStore();
    const profileStore = useProfileStore();
    const snackbarStore = useSnackbarStore();

    const disabledButtonSubmit = ref(true)

    const nomorKartu = ref("");
    const namaDepan = ref("");
    const namaBelakang = ref("");
    const mm = ref(null);
    const yy = ref(null);
    const cvv = ref("")

    const errorNomorKartu = ref("");
    const errorNamaDepan = ref();
    const errorNamaBelakang = ref("");
    const errorMM = ref("");
    const errorYY = ref("");
    const errorCVV = ref("")

    const handleClickSubmit = () => {
        if ( !nomorKartu.value ) {
            errorNomorKartu.value = "Nomor Kartu tidak boleh kosong"
        } else {
            errorNomorKartu.value = ""
        }

        if ( !namaDepan.value ) {
            errorNamaDepan.value = "Nama Depan tidak boleh kosong";
        } else {
            errorNamaDepan.value = ""
        }

        if ( !namaBelakang.value ) {
            errorNamaBelakang.value = "Nama Belakang tidak boleh kosong"
        } else {
            errorNamaBelakang.value = ""
        }

        if ( !mm.value ) {
            errorMM.value = "MM tidak boleh kosong"
        } else {
            errorMM.value = ""
        }

        if ( !yy.value ) {
            errorYY.value = "YYYY tidak boleh kosong"
        } else if ( 2000 > yy.value || yy.value > 3000  ) {
            errorYY.value = "YYYY harus diantara tahun 2000 dan 3000"
        } else {
            errorYY.value = ""
        }

        if ( !cvv.value ) {
            errorCVV.value = "CVV tidak boleh kosong"
        } else if ( cvv.value.length != 3 ) {
            errorCVV.value = "CVV hanya boleh 3 digit"
        } else {
            errorCVV.value = ""
        }
    }

	function isNumber (event) {
		const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		let keyPressed = event.key;

		if (!keysAllowed.includes(keyPressed)) {
			event.preventDefault()
		}
	}

    const handleBack = () => {
        router.push("/client/payment")
    }

    watch([nomorKartu, namaDepan, namaBelakang, mm, yy, cvv], ([newNomorKartu, newNamaDepan, newNamaBelakang, newMm, newYy, newCvv], [oldNomorKartu, oldNamaDepan, oldNamaAkhir, oldMm, oldYy, oldCvv]) => {
        if ( newNomorKartu && newNamaDepan && newNamaBelakang && newMm && newYy && newCvv ) {
            disabledButtonSubmit.value = false
        } else {
            disabledButtonSubmit.value = true
        }
    });

    onMounted(async () => {
        try {
            await clientBillingStore.getBilling();
            nomorKartu.value = clientBillingStore.data.nomor_kartu || "";
            namaDepan.value = clientBillingStore.data.nama_depan || "";
            namaBelakang.value = clientBillingStore.data.nama_belakang || "";
            mm.value = clientBillingStore.data.bulan || null;
            yy.value = clientBillingStore.data.tahun || null;
            cvv.value = clientBillingStore.data.cvv || "";
            statusIsi = profileStore.data.data_pengguna.id_status_pengguna
        } catch (err) {}
    })

    const handleSubmit = async () => {
        if ( !errorNomorKartu.value && !errorNamaDepan.value && !errorNamaBelakang.value && !errorMM.value && !errorYY.value && !errorCVV.value ) {
            try {
                await clientBillingStore.updateBilling({
                    nomorKartu: nomorKartu.value,
                    nama_depan: namaDepan.value,
                    nama_belakang: namaBelakang.value,
                    bulan: mm.value,
                    tahun: yy.value,
                    cvv: cvv.value
                })
                // UPDATE STATUS ISI
                await profileStore.getProfile()
                snackbarStore.showSnackbar({
                    type: "success",
                    message: "Data berhasil di update",
                    timeout: 5000,
                });
                // BELUM ISI PROFILE DAN SKARANG SUDAH ISI PROFILE PERTAMA KALI
                if ( statusIsi == 2 && profileStore.data.data_pengguna.id_status_pengguna == 4 ) {
                    router.push("/client/progress")
                } else {
                    router.push("/client/payment")
                }
            } catch (err) {
                snackbarStore.showSnackbar({
                    message: err.response.data.errors,
                    timeout: 5000,
                });
            }
        }
    }


</script>

<style scoped>

</style>
