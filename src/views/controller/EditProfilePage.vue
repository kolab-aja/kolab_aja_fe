<template>
	<v-app>
		<TheSidebar
			active-at="/controller/profile"
			navbar-title="Pengaturan Profil"
		>
			<TheVCol class="d-flex flex-column ga-9">
				<TheVRow class="d-flex ga-4">
					<v-avatar
						size="80"
						image="@/assets/images/default-profile-picture.png"
						style="border: 2px solid #8a76d4"
					/>
					<TheVCol class="d-flex flex-column justify-center">
						<p style="font-size: 20px; font-weight: bold">
							{{ currentNama }}
						</p>
						<p
							style="
								font-size: 16px;
								color: #87868b;
								font-weight: 500;
							"
						>
							{{ currentWilayah }}
						</p>
					</TheVCol>
				</TheVRow>

				<form
					class="d-flex flex-column ga-9"
					@submit.prevent="handleSubmit"
				>
					<h2 style="font-size: 20px; font-family: 500">
						Informasi Pengguna
					</h2>
					<TheVRow class="d-flex align-end ga-5" max-width="800">
						<TheInput
							custom-label="Nama"
							v-model="nama"
							:error-messages="errorName"
						/>
						<TheInput custom-label="Alamat Email" v-model="email" disabled />
					</TheVRow>
					<TheVRow class="d-flex align-end ga-5" max-width="800">
						<TheInput
							custom-label="Nomor Telepon"
							v-model="telepon"
							:error-messages="errorPhoneNumber"
						/>
						<TheInputDropDown
							:result="controllerFee"
							@update:result="controllerFee = $event"
							:options="optionFee"
							custom-label="Controller Fee"
						/>
					</TheVRow>
					<TheVCol max-width="800"><v-divider /></TheVCol>
					<h2 style="font-size: 20px; font-family: 500">
						Detail Profile
					</h2>
					<TheRichTextBox max-width="800" v-model="deskripsi">
					</TheRichTextBox>
					<TheVCol max-width="800">
						<TheInputDropDown
							:result="expertise"
							@update:result="expertise = $event"
							:options="expertiseOptions"
							custom-label="Expertise"
							multiple
							chips
						></TheInputDropDown>
					</TheVCol>
					<div v-if="statusIsi == 1">
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
			</TheVCol>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import { ref } from "vue";
import TheSidebar from "@/components/controller/TheSidebar.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import TheInput from "@/components/common/TheInput.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheInputDropDown from "@/components/common/TheInputDropDown.vue";
import TheRichTextBox from "@/components/common/TheRichTextBox.vue";
import { useProfileStore } from "@/store/profile.js";
import { useSnackbarStore } from "@/store/snackbar";
import { watch } from 'vue';
import router from "@/router";


const profileStore = useProfileStore();
const snackbarStore = useSnackbarStore();

// States for form fields
const nama = ref("");
const email = ref("");
const telepon = ref("");
const controllerFee = ref(null);
const deskripsi = ref();
const expertise = ref([]);
const wilayah = ref("");
const statusIsi = ref(null);
const expertiseOptions = ref([]);
const disabledButtonSubmit = ref(true);

//States for error
const errorName = ref("");
const errorPhoneNumber = ref("");
const errorSelectedFee = ref("");
const errorExpertise = ref("");

// Options for select and combobox
const optionFee = [
	{ title: "5%", value: 5 },
	{ title: "10%", value: 10 },
	{ title: "15%", value: 15 },
];

let currentNama = "";
let currentWilayah = "";

nama.value = profileStore.data.data_pengguna.nama || "";
email.value = profileStore.data.data_pengguna.email || "";
telepon.value = profileStore.data.data_pengguna.nomor_telepon || "";
controllerFee.value = profileStore.data.data_pengguna.fee || null;
deskripsi.value = profileStore.data.data_pengguna.profil_detail || "";
expertise.value = profileStore.data.data_pengguna.spesialisasi || [];
wilayah.value = profileStore.data.data_pengguna.lokasi || "";
statusIsi.value = profileStore.data.data_pengguna.id_status_pengguna || "";

expertiseOptions.value =
	profileStore.data.spesialisasi.map((item) => {
		const obj = { ...item };
		return { title: obj.nama, value: obj.nama };
	}) || [];
currentNama = nama.value;
currentWilayah = wilayah.value;

const handleClickSubmit = () => {
	if (!nama.value) {
		errorName.value = "Nama tidak boleh kosong";
	} else {
		errorName.value = "";
	}

	if (!telepon.value) {
		errorPhoneNumber.value = "Nomor Telepon tidak boleh kosong";
	} else {
		errorPhoneNumber.value = "";
	}

	if (!controllerFee.value) {
		errorSelectedFee.value = "Fee tidak boleh kosong";
	} else {
		errorSelectedFee.value = "";
	}

	if (!expertise.value.length) {
		errorExpertise.value = "Expertise tidak boleh kosong";
	} else {
		errorExpertise.value = "";
	}
};

// Methods for form submission
const handleSubmit = async () => {
	if (
		!errorName.value &&
		!errorPhoneNumber.value &&
		!errorSelectedFee.value &&
		!errorExpertise.value
	) {
		try {
			await profileStore.updateProfile({
				nama: nama.value,
				email: email.value,
				nomor_telepon: telepon.value,
				fee: controllerFee.value,
				profil_detail: deskripsi.value,
				spesialisasi: expertise.value,
				wilayah: wilayah.value,
			});

			await profileStore.getProfile();

			snackbarStore.showSnackbar({
				type: "success",
				message: "Data berhasil di update",
				timeout: 5000,
			});

			// APABILA SETELAH ISI STATUS KE-UPDATE MENJADI 2 ( BLM ISI PAYMENT ), MAKA REDIRECT KE ISI PAYMENT PAGE
			if (profileStore.data.data_pengguna.id_status_pengguna == 2) {
				router.push("/controller/edit-payment");
			} else {
				router.push("/controller/profile");
			}
		} catch (error) {
			snackbarStore.showSnackbar({
				message: error.response.data.errors,
				timeout: 5000,
			});
		}
	}
};

const handleBatal = () => {
	router.push(`/controller/profile`);
};

watch(
	[nama, telepon, controllerFee, expertise],
	(
		[newName, newPhoneNumber, newFee, newExpertise],
		[oldName, oldPhoneNumber, oldFee, oldExpertise]
	) => {
		if (newName && newPhoneNumber && newFee && newExpertise) {
			disabledButtonSubmit.value = false;
		} else {
			disabledButtonSubmit.value = true;
		}
	}
);
</script>

<style scoped></style>
