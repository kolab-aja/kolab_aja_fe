<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-admin/profile" navbarTitle="Pengaturan Profile">
			<TheVRow style="margin-top: 30px" max-width="800">
				<TheVCol class="d-flex align-center">
					<v-avatar
						style="width: 100px; height: 100px; border-radius: 50%; margin-right: 16px; outline: 2px solid #d4d1ff;">
						<img :src="profileImage" alt="Profile Image" height="100%">
					</v-avatar>
					<div>
						<h2>{{ dataPengguna.nama || 'Loading...' }}</h2>
						<p class="description-text">{{ dataPengguna.lokasi || 'Loading...' }}</p>
					</div>
				</TheVCol>
			</TheVRow>

			<TheVRow max-width="800">
				<v-divider class="custom-divider"></v-divider>

				<v-row>
					<v-col cols="12">
						<h3>Informasi Creative Hub</h3>
					</v-col>
					<v-col cols="12" md="6">
						<TheFieldInput id="nama" v-model="dataPengguna.nama" label="Nama" :errorMessage="errorNama" required></TheFieldInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheFieldInput id="lokasi" v-model="dataPengguna.lokasi" label="Wilayah" :errorMessage="errorLokasi" required></TheFieldInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.email" custom-label="Alamat Email" disabled></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheFieldInput id="alamat" v-model="dataPengguna.alamat" label="Alamat" :errorMessage="errorAlamat" required></TheFieldInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.tag_line" custom-label="Tagline"></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheFieldInput id="website" v-model="dataPengguna.website" label="Website" :errorMessage="errorWebsite" required></TheFieldInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.nomor_telepon" custom-label="Nomor Telepon"  @keypress="isNumber($event)" maxlength="15"></TheInput>
					</v-col>
				</v-row>

				<v-divider class="custom-divider"></v-divider>
			</TheVRow>

			<TheVRow max-width="800" style="margin-bottom: 30px" class="ga-5">
				<v-col cols="12">
					<h3>Detail Profile</h3>
				</v-col>
				<v-col cols="12">
					<TheRichTextBox v-model="dataPengguna.profil_detail"></TheRichTextBox>
				</v-col>
			</TheVRow>

			<TheVRow>
				<TheButton @click="back" type="secondary" class="button-spacing">Batal</TheButton>
				<TheButton @click="saveProfile" type="primary">Simpan</TheButton>
			</TheVRow>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TheSidebar from "@/components/creative-hub-admin/TheSidebar.vue";
import profileImage from "@/assets/images/let-him-cook.jpg";
import TheButton from "@/components/common/TheButton.vue";
import TheInput from "@/components/common/TheInput.vue";
import TheRichTextBox from "@/components/common/TheRichTextBox.vue";
import router from "@/router";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import { useProfileStore } from "@/store/profile";
import { useSnackbarStore } from "@/store/snackbar";
import TheFieldInput from "@/components/common/auth/TheFieldInput.vue";

const snackbarStore = useSnackbarStore();
const profileStore = useProfileStore();
const dataPengguna = ref({
	nama: '',
	lokasi: '',
	email: '',
	alamat: '',
	tag_line: '',
	website: '',
	nomor_telepon: '',
	profil_detail: ''
});

onMounted(async () => {
	await profileStore.getProfile();
	const fetchedData = profileStore.data.data_pengguna || {};

	dataPengguna.value = {
    nama: fetchedData.nama ?? '',
    lokasi: fetchedData.lokasi ?? '',
    email: fetchedData.email ?? '',
    alamat: fetchedData.alamat ?? '',
    tag_line: fetchedData.tag_line ?? '',
    website: fetchedData.website ?? '',
    nomor_telepon: fetchedData.nomor_telepon ?? '',
    profil_detail: fetchedData.profil_detail ?? ''
  };

});

const back = () => {
	router.push('/creative-hub-admin/profile');
};

const errorNama = ref("");
const errorLokasi = ref("");
const errorAlamat = ref("");
const errorWebsite = ref("");

const saveProfile = async () => {
	try {
		if (!dataPengguna.value.nama) {
			errorNama.value = "Nama tidak boleh kosong";
		} else {
			errorNama.value = "";
		}

		if (!dataPengguna.value.lokasi) {
			errorLokasi.value = "Lokasi tidak boleh kosong";
		} else {
			errorLokasi.value = "";
		}

		if (!dataPengguna.value.alamat) {
			errorAlamat.value = "Alamat tidak boleh kosong";
		} else {
			errorAlamat.value = "";
		}

		if (!dataPengguna.value.website) {
			errorWebsite.value = "Website tidak boleh kosong";
		} else {
			errorWebsite.value = "";
		}

		// errorNama saat tidak ada valuenya string kosong, pas string kosong maka tidak ada error
		if (
			errorNama.value === "" &&
			errorLokasi.value === "" &&
			errorAlamat.value === "" &&
			errorWebsite.value === ""
		) {
			await profileStore.updateProfile(dataPengguna.value);
			await profileStore.getProfile();
			snackbarStore.showSnackbar({
				type: "success",
				message: "Data berhasil di update",
				timeout: 5000,
			});


			router.push('/creative-hub-admin/profile');
		} else {
			throw new Error();
		}
	} catch (error) {
		snackbarStore.showSnackbar({
			message: "Error updating profile",
			timeout: 5000,
		});
	}
};

function isNumber (event) {
	const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let keyPressed = event.key;

	if (!keysAllowed.includes(keyPressed)) {
		event.preventDefault()
	}
}
</script>

<style scoped>
.custom-divider {
	margin: 2rem 0;
	border-top: 2px solid;
}

.description-text {
	color: grey;
}

.button-spacing {
	margin-right: 8px;
}
</style>
