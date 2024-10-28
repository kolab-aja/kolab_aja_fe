<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-admin/profile" navbarTitle="Pengaturan Profile">
			<TheVRow style="margin-top: 30px" max-width="800">
				<TheVCol class="d-flex align-center">
					<v-avatar
						style="width: 100px; height: 100px; border-radius: 50%; margin-right: 16px; outline: 2px solid #d4d1ff;">
						<template v-if="!isLoading">
							<img :src="profileImage" alt="Profile Image" height="100%">
						</template>
						<template v-else>
							<v-skeleton-loader type="avatar" height="100px" width="100px" />
						</template>
					</v-avatar>
					<div>
						<h2 v-if="!isLoading">{{ dataPengguna.nama }}</h2>
						<v-skeleton-loader v-else type="heading" width="200px" />
						<p class="description-text" v-if="!isLoading">{{ dataPengguna.lokasi }}</p>
						<v-skeleton-loader v-else type="text" width="150px" />
					</div>
				</TheVCol>
				<TheVCol cols="auto">
					<TheButton size="s" @click="editProfile"> <v-icon left>mdi-pencil</v-icon> Edit</TheButton>
				</TheVCol>
			</TheVRow>

			<v-divider class="custom-divider"></v-divider>

			<TheVRow max-width="800">
				<TheVCol cols="12" style="margin-bottom: 25px">
					<h2>Personal Information</h2>
				</TheVCol>
				<TheVCol cols="6">
					<v-row>
						<v-col cols="12">
							<strong>Nama Team</strong>
							<div v-if="!isLoading">{{ dataPengguna.nama }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Alamat Email</strong>
							<div v-if="!isLoading">{{ dataPengguna.email }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Password</strong>
							<div v-if="!isLoading">*********</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Nomor Telepon</strong>
							<div v-if="!isLoading">{{ dataPengguna.nomor_telepon || '-' }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
					</v-row>
				</TheVCol>
				<TheVCol cols="6">
					<v-row>
						<v-col cols="12">
							<strong>Wilayah</strong>
							<div v-if="!isLoading">{{ dataPengguna.lokasi || '-' }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Alamat</strong>
							<div v-if="!isLoading">{{ dataPengguna.alamat }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Website</strong>
							<div v-if="!isLoading">{{ dataPengguna.website || '-' }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
						<v-col cols="12">
							<strong>Jumlah Team</strong>
							<div v-if="!isLoading">{{ dataPengguna.team || '-' }}</div>
							<v-skeleton-loader v-else type="text" width="200px" />
						</v-col>
					</v-row>
				</TheVCol>
			</TheVRow>

			<v-divider class="custom-divider"></v-divider>

			<TheVRow max-width="800" class="ga-5">
				<h2 class="purple--text">Tentang Creative Hub</h2>
				<v-col cols="12">
					<h3>Deskripsi</h3>
					<div v-if="!isLoading" v-html="dataPengguna.profil_detail || '-'"></div>
					<v-skeleton-loader v-else type="paragraph" width="100%" />
				</v-col>
			</TheVRow>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/creative-hub-admin/TheSidebar.vue";
import profileImage from "@/assets/images/let-him-cook.jpg";
import TheButton from "@/components/common/TheButton.vue";
import router from "@/router";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import { useProfileStore } from "@/store/profile";
import { onMounted, ref } from "vue";

const profileStore = useProfileStore();
const isLoading = ref(true);
const dataPengguna = ref({});

onMounted(async () => {
	await profileStore.getProfile();
	dataPengguna.value = profileStore.data.data_pengguna;
	isLoading.value = false;
});

const editProfile = () => {
	router.push('/creative-hub-admin/edit-profile');
};
</script>

<style scoped>
.custom-divider {
	margin: 2rem 0;
	max-width: 800px;
	border-top: 2px solid;
}

.description-text {
	color: grey;
}
</style>