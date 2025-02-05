<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/account" navbarTitle="Pengaturan Akun">
			<TheVRow style="margin: 30px 0">
				<v-col class="d-flex align-center">
					<v-avatar
						style="width: 100px; height: 100px; border-radius: 50%; margin-right: 16px; outline: 2px solid #d4d1ff;">
						<img :src="profileImage" alt="Profile Image" height="100%">
					</v-avatar>
					<div>
						<h2>{{ currentNama }}</h2>
						<p class="description-text">{{ currentWilayah }}</p>
					</div>
				</v-col>
			</TheVRow>

			<TheVRow max-width="800" class="ga-5">
				<v-col>
					<h3>Informasi Akun</h3>
				</v-col>
				<v-col cols="12">
					<TheInput custom-label="Nama" v-model="name" :error-messages="errorName"></TheInput>
				</v-col>
				<v-col cols="12" md="12">
					<TheInput custom-label="Alamat Email" v-model="email"></TheInput>
				</v-col>
				<v-col>
					<TheVCol cols="12" md="12" style="position: relative;" max-width="800">
						<TheInput custom-label="Password" placeholder="1234567" v-model="password" type="password" />
						<button style="z-index: 1; position: absolute; top: 75px; right: 0;"
							@click="handleClickForgotPassword">Ganti Password</button>
					</TheVCol>
				</v-col>
				<v-col cols="12" md="12">
					<TheInput custom-label="Nomor Telepon" v-model="telepon" :error-messages="errorTelepon" @keypress="isNumber($event)" maxlength="15"></TheInput>
				</v-col>
			</TheVRow>
			<v-row cols="12">
				<v-col>
					<TheButton @click="back" type="secondary" class="button-spacing">Batal</TheButton>
					<TheButton @click="handleSubmit" type="primary" :disabled="disabledButtonSubmit">Simpan</TheButton>
				</v-col>
			</v-row>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import profileImage from "@/assets/images/let-him-cook.jpg";
import TheInput from "@/components/common/TheInput.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";

import router from "@/router";
import { onMounted, ref, watch } from "vue";
import { useProfileStore } from "@/store/profile.js"
import { useSnackbarStore } from '@/store/snackbar';

let currentNama = "";
let currentWilayah = "";

const name = ref("");
const email = ref("");
const telepon = ref("");
const password	 = ref("");
const errorName = ref("");
const errorTelepon = ref("");

const disabledButtonSubmit = ref(true);

const profileStore = useProfileStore();
const snackbarStore = useSnackbarStore();

onMounted(async () => {
	await profileStore.getProfile()

	name.value = profileStore.data.data_pengguna.nama || '';
	email.value = profileStore.data.data_pengguna.email || '';
	telepon.value = profileStore.data.data_pengguna.nomor_telepon || '';
	currentNama = name.value;
	currentWilayah = profileStore.data.data_pengguna.lokasi || '';

})

const handleSubmit = async () => {
	if (!errorName.value && !errorTelepon.value) {
		try {
			await profileStore.updateProfile({
				nama: name.value,
				email: email.value,
				nomor_telepon: telepon.value,
				password: password.value
			});
			await profileStore.getProfile();

			snackbarStore.showSnackbar({
				type: "success",
				message: "Data berhasil di update",
				timeout: 5000,
			});
			router.push("/creative-hub-team/account");
		} catch (err) {
			snackbarStore.showSnackbar({
				message: err.response.data.errors,
				timeout: 5000,
			});
		}
	}
};

watch([name, telepon], ([newName, newTelepon], [oldName, oldTelepon]) => {
	if (newName && newTelepon) {
		disabledButtonSubmit.value = false;
	} else {
		disabledButtonSubmit.value = true;
	}
});

const handleClickForgotPassword = () => {
	// Blum buat
};
const back = () => {
	router.push('/creative-hub-team/account');
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
.description-text {
	color: grey;
}

.button-spacing {
	margin-right: 8px;
}
</style>
