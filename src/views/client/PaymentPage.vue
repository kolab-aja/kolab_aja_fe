<template>
	<v-app>
		<TheSidebar active-at="/client/payment" navbarTitle="Metode Pembayaran">
			<TheVCol class="d-flex flex-column ga-9" style="max-width: 800px;">
                <TheVRow class="d-flex justify-space-between align-center mt-10">
                    <h3>Informasi Pembayaran</h3>
                    <div><TheButton size="s" @click="editAccount"><v-icon left>mdi-pencil</v-icon> Edit</TheButton></div>
                </TheVRow>
                <TheVCol>
                    <strong>Nomor Kartu</strong>
                    <p>{{ nomorKartu }}</p>
                </TheVCol>
                <TheVRow>
                    <TheVCol>
                        <strong>Nama Depan</strong>
                        <div>{{ namaDepan }}</div>
                    </TheVCol>
                    <TheVCol>
                        <strong>Nama Belakang</strong>
                        <div>{{ namaBelakang }}</div>
                    </TheVCol>
                </TheVRow>
                <TheVRow>
                    <TheVCol>
                        <strong>Habis Berlaku</strong>
                        <div>{{ habisBerlaku }}</div>
                    </TheVCol>
                    <TheVCol>
                        <strong>CVV</strong>
                        <div>{{ cvv }}</div>
                    </TheVCol>
                </TheVRow>
            </TheVCol>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/client/TheSidebar.vue";
import TheButton from "@/components/common/TheButton.vue";
import router from "@/router";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import { onMounted, ref } from "vue";
import { useClientBillingStore } from "@/store/client/billing";

const nomorKartu = ref();
const namaDepan = ref();
const namaBelakang = ref();
const habisBerlaku = ref();
const cvv = ref();

const clientBillingStore = useClientBillingStore();

onMounted(async () => {
    try {
        await clientBillingStore.getBilling();
        nomorKartu.value = clientBillingStore.data.nomor_kartu || "";
        namaDepan.value = clientBillingStore.data.nama_depan || "";
        namaBelakang.value = clientBillingStore.data.nama_belakang || "";
        habisBerlaku.value = `${clientBillingStore.data.bulan}/${clientBillingStore.data.tahun}`;
        cvv.value = clientBillingStore.data.cvv || "";
    } catch ( err ) {}

})

const editAccount = () => {
	router.push("/client/edit-payment");
};
</script>
