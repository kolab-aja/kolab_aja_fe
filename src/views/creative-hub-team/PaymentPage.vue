<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/payment" navbar-title="Metode Pembayaran">
			<TheVCol class="d-flex flex-column ga-9" style="max-width: 800px;">
				<TheVRow class="d-flex justify-space-between align-center mt-10">
					<h3>Informasi Pembayaran</h3>
					<div><TheButton size="s" @click="editAccount"><v-icon left>mdi-pencil</v-icon> Edit</TheButton></div>
				</TheVRow>
				<TheVCol>
					<strong>Nama Bank</strong>
					<p>{{ bank }}</p>
				</TheVCol>
				<TheVCol>
					<strong>Nomor Rekening</strong>
					<div>{{ nomorRekening }}</div>
				</TheVCol>
				<TheVCol>
					<strong>Nama Pemilik</strong>
					<div>{{ namaPemilik }}</div>
				</TheVCol>

			</TheVCol>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import { useBillStore } from "@/store/bill";
import { onMounted, ref } from "vue";
import router from "@/router";

const billStore = useBillStore();

const nomorRekening = ref("");
const namaPemilik = ref("");
const idBank = ref(null)
const bank = ref(null);


onMounted(async () => {
	try {
		await billStore.getBillingInformation();
		nomorRekening.value =
			billStore.data.billing_rekening.nomor_rekening || "";
		namaPemilik.value = billStore.data.billing_rekening.nama_pemilik || "";
		idBank.value = billStore.data.billing_rekening.id_bank || 0;
		bank.value = billStore.data.bank[idBank.value-1].nama || ""
		statusIsi = profileStore.data.data_pengguna.id_status_pengguna;
	} catch (err) {}
});

const editAccount = () => {
	router.push("/creative-hub-team/edit-payment");
};
</script>
