<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/account" navbarTitle="Pengaturan Akun">
			<TheVRow style="margin-top: 30px" max-width="800">
				<TheVCol class="d-flex align-center">
					<v-avatar
						style="width: 100px; height: 100px; border-radius: 50%; margin-right: 16px; outline: 2px solid #d4d1ff;">
						<template v-if="!loading">
							<img :src="profileImage" alt="Profile Image" height="100%">
						</template>
						<template v-else>
							<v-skeleton-loader type="avatar" height="100px" width="100px" />
						</template>
					</v-avatar>
					<div>
						<h2 v-if="!loading">{{ nama }}</h2>
						<v-skeleton-loader v-else type="heading" width="200px" />
						<p class="description-text" v-if="!loading">{{ email }}</p>
						<v-skeleton-loader v-else type="text" width="150px" />
					</div>
				</TheVCol>

			
				<TheVCol class="d-flex align-center" cols="auto">
					<TheButton size="s" @click="editAccount" :disabled="loading">
						<v-icon left>mdi-pencil</v-icon> Edit
					</TheButton>
				</TheVCol>
			</TheVRow>

			<v-divider class="custom-divider"></v-divider>

			<!-- Personal Information Section -->
			<TheVRow max-width="800">
				<TheVCol cols="12" style="margin-bottom: 25px">
					<h2>Personal Information</h2>
				</TheVCol>

				<!-- Left Column for Personal Info -->
				<TheVCol cols="6">
					<v-row>
						<v-col cols="12">
							<strong>Nama</strong>
							<div v-if="!loading">{{ nama }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Alamat Email</strong>
							<div v-if="!loading">{{ email }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Password</strong>
							<div v-if="statusGantiPassword === '1'">*****</div>
							<div v-else>isi password</div>
						</v-col>
						<v-col cols="12">
							<strong>Nomor Telepon</strong>
							<div v-if="!loading">{{ telepon }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
					</v-row>
				</TheVCol>
			</TheVRow>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
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

.custom-divider {
	margin: 2rem 0;
	max-width: 800px;
	border-top: 2px solid;
}

.description-text {
	color: grey;
}
</style>
