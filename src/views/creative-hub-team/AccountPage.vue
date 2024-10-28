<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/account" navbarTitle="Pengaturan Akun">
			<TheVRow style="margin-top: 30px" max-width="800">
				<v-col>
					<div class="profile-flex-container" v-if="!loading">
						<v-avatar
							style="width: 100px; height: 100px; border-radius: 50%; margin-right: 16px; outline: 2px solid #d4d1ff;">
							<img :src="profileImage" alt="Profile Image" height="100%">
						</v-avatar>
						<v-row>
							<v-col cols="12">
								<strong>Nama</strong>
								<div>{{ nama }}</div>
							</v-col>
							<v-col cols="12">
								<strong>Alamat Email</strong>
								<div>{{ email }}</div>
							</v-col>
							<v-col cols="12">
								<strong>Password</strong>
								<div v-if="statusGantiPassword === '1'">*****</div>
								<div v-else>isi password</div>
							</v-col>
							<v-col cols="12">
								<strong>Nomor Telepon</strong>
								<div>{{ telepon }}</div>
							</v-col>
						</v-row>
					</div>
					<v-row v-else>
						<v-col>
							<v-skeleton-loader class="avatar-skeleton" height="100px" width="100px"
								circle></v-skeleton-loader>
						</v-col>
						<v-col>
							<v-skeleton-loader card height="20px" width="150px"></v-skeleton-loader>
							<v-skeleton-loader card height="20px" width="150px"
								style="margin-top: 16px;"></v-skeleton-loader>
							<v-skeleton-loader card height="20px" width="150px"
								style="margin-top: 16px;"></v-skeleton-loader>
							<v-skeleton-loader card height="20px" width="150px"
								style="margin-top: 16px;"></v-skeleton-loader>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="auto">
					<TheButton size="s" @click="editAccount" :disabled="loading">
						<v-icon left>mdi-pencil</v-icon> Edit
					</TheButton>
				</v-col>
			</TheVRow>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import profileImage from "@/assets/images/let-him-cook.jpg";
import TheButton from "@/components/common/TheButton.vue";
import router from "@/router";
import { useProfileStore } from "@/store/profile";
import { onMounted, ref } from "vue";

const loading = ref(true);
const profileStore = useProfileStore();
const nama = ref('');
const email = ref('');
const telepon = ref('');
const statusGantiPassword = ref(0);

onMounted(async () => {
	try {
		await profileStore.getProfile();
		nama.value = profileStore.data.data_pengguna.nama || "Belum mengisi nama";
		email.value = profileStore.data.data_pengguna.email || "Belum mengisi email";
		telepon.value = profileStore.data.data_pengguna.nomor_telepon || "Belum mengisi nomor telepon";
		statusGantiPassword.value = profileStore.data.data_pengguna.status_ganti_password || 0;
		loading.value = false;
	} catch (error) {
		console.error('Failed to fetch profile data:', error);
		loading.value = false;
	}
});

const editAccount = () => {
	router.push('/creative-hub-team/edit-account');
};
</script>

<style scoped>
.profile-flex-container {
	display: flex;
	align-items: center;
}

.avatar-skeleton {
	margin-right: 16px;
}
</style>