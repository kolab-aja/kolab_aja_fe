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
						<TheInput v-model="dataPengguna.nama" custom-label="Nama"></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.lokasi" custom-label="Wilayah"></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.email" custom-label="Alamat Email"></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.alamat" custom-label="Alamat"></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.tag_line" custom-label="Tagline"></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.website" custom-label="Website"></TheInput>
					</v-col>
					<v-col cols="12" md="6">
						<TheInput v-model="dataPengguna.nomor_telepon" custom-label="Nomor Telepon"></TheInput>
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
	dataPengguna.value = profileStore.data.data_pengguna
});

const back = () => {
	router.push('/creative-hub-admin/profile');
};

const saveProfile = async () => {
	try {
		await profileStore.updateProfile(dataPengguna.value);
		snackbarStore.showSnackbar({
			type: "success",
			message: "Data berhasil di update",
			timeout: 5000,
		});
		router.push('/creative-hub-admin/profile');
	} catch (error) {
		console.error('Error updating profile');
		snackbarStore.showSnackbar({
			message: "Error updating profile",
			timeout: 5000,
		});
	}
};
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