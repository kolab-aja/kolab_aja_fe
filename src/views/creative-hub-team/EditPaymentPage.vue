<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/payment" navbar-title="Metode Pembayaran">
			<form class="d-flex flex-column ga-9" @submit.prevent="handleSubmit">
				<h2 style="font-size: 20px; font-weight: 500">
					Informasi Pembayaran
				</h2>
				<div>
					<TheInputDropDown
						max-width="800"
						:result="bank"
						@update:result="bank = $event"
						:options="optionBank"
						custom-label="Pilih Bank"
						:error-messages="errorBank"
					/>
					<TheInput
						max-width="800"
						custom-label="Nomor Rekening"
						v-model="nomorRekening"
						:error-messages="errorNomorRekening"
					/>
					<TheInput
						max-width="800"
						custom-label="Nama Pemilik"
						v-model="namaPemilik"
						:error-messages="errorNamaPemilik"
					/>
				</div>

				<div v-if="statusIsi == 2">
					<TheButton
						size="m"
						type="primary"
						button-type="submit"
						@click="handleClickSubmit"
						:disabled="disabledButtonSubmit"
					>Simpan</TheButton
					>
				</div>

				<TheVRow class="d-flex ga-2" v-else>
					<TheButton
						size="m"
						type="primary"
						button-type="submit"
						@click="handleClickSubmit"
					>Simpan</TheButton
					>
					<TheButton
						size="m"
						type="secondary"
						@click="handleBatal"
					>Batal</TheButton
					>
				</TheVRow>
			</form>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheInputDropDown from "@/components/common/TheInputDropDown.vue";
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheInput from "@/components/common/TheInput.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import {onMounted, ref, watch} from "vue";
import {useSnackbarStore} from "@/store/snackbar";
import {useProfileStore} from "@/store/profile";
import {useBillStore} from "@/store/bill";
import router from "@/router";

let statusIsi;

const disabledButtonSubmit = ref(true);

const billStore = useBillStore();
const profileStore = useProfileStore();
const snackbarStore = useSnackbarStore();

const nomorRekening = ref("");
const namaPemilik = ref("");
const bank = ref();
const optionBank = ref([]);

const errorNomorRekening = ref("");
const errorBank = ref("");
const errorNamaPemilik = ref("");

onMounted(async () => {
	try {
		await billStore.getBillingInformation();
		nomorRekening.value =
			billStore.data.billing_rekening.nomor_rekening || "";
		namaPemilik.value = billStore.data.billing_rekening.nama_pemilik || "";
		bank.value = billStore.data.billing_rekening.id_bank || null; //mengisi bank dengan angka  2
		optionBank.value =
			billStore.data.bank.map((item) => {
				const obj = {...item};
				return {title: obj.nama, value: obj.id};
			}) || [];
		statusIsi = profileStore.data.data_pengguna.id_status_pengguna;
	} catch (err) {
	}
});

watch(
	[nomorRekening, bank, namaPemilik],
	(
		[newNomorRekening, newBank, newNamaPemilik],
		[oldNomorRekening, oldBank, oldNamaPemilik]
	) => {
		if (newNomorRekening && newBank && newNamaPemilik) {
			disabledButtonSubmit.value = false;
		} else {
			disabledButtonSubmit.value = true;
		}
	}
);

const handleClickSubmit = () => {
	if (!nomorRekening.value) {
		errorNomorRekening.value = "Nomor Rekening tidak boleh kosong";
	} else {
		errorNomorRekening.value = "";
	}

	if (!bank.value) {
		errorBank.value = "Jenis Bank tidak boleh kosong";
	} else {
		errorBank.value = "";
	}

	if (!namaPemilik.value) {
		errorNamaPemilik.value = "Nama tidak boleh kosong";
	} else {
		errorNamaPemilik.value = "";
	}
};

const handleSubmit = async () => {
	if (
		!errorNomorRekening.value &&
		!errorBank.value &&
		!errorNamaPemilik.value
	) {
		try {
			await billStore.updateBillingInfo({
				id_bank: bank.value,
				nomor_rekening: nomorRekening.value,
				nama_pemilik: namaPemilik.value,
			});
			// UPDATE STATUS ISI
			await profileStore.getProfile();
			snackbarStore.showSnackbar({
				type: "success",
				message: "Data berhasil di update",
				timeout: 5000,
			});
			if (
				statusIsi == 2 &&
				profileStore.data.data_pengguna.id_status_pengguna == 4
			) {
				router.push("/creative-hub-team/progress");
			} else {
				router.push("/creative-hub-team/payment");
			}
		} catch (err) {
			snackbarStore.showSnackbar({
				message: err.response.data.errors,
				timeout: 5000,
			});
		}
	}
};

const handleBatal = () => {
	router.push("/creative-hub-team/payment");
};
</script>

<style scoped></style>
