<template>
	<v-app>
		<TheSidebar
			active-at="/controller/profile"
			navbar-title="Pengaturan Profil"
		>
			<TheVCol class="d-flex flex-column ga-8" max-width="1200">
				<TheVRow class="d-flex align-center ga-4">
					<v-avatar
						size="80"
						image="@/assets/images/default-profile-picture.png"
						style="border: 2px solid #8a76d4"
					/>
					<TheVCol class="d-flex flex-column justify-center">
						<p style="font-size: 20px; font-weight: bold">
							{{ nama }}
						</p>
						<p
							style="
								font-size: 16px;
								color: #87868b;
								font-weight: 500;
							"
						>
							{{ wilayah }}
						</p>
					</TheVCol>
					<TheButton
						prefix-icon="mdi-pencil"
						size="text-icon-m"
						@click="handleEditProfile"
						>Edit</TheButton
					>
				</TheVRow>

				<v-divider />

				<h2 style="font-size: 20px; font-family: 500">
					Informasi Pengguna
				</h2>

				<TheVRow max-width="800">
					<TheVCol>
						<p>Nama</p>
						<p class="content">{{ nama }}</p>
					</TheVCol>
					<TheVCol>
						<p>Alamat Email</p>
						<p class="content">{{ email }}</p>
					</TheVCol>
				</TheVRow>
				<TheVRow max-width="800">
					<TheVCol>
						<p>Nomor Telepon</p>
						<p class="content">{{ telepon }}</p>
					</TheVCol>
					<TheVCol>
						<p>Controller Fee</p>
						<p class="content">{{ controllerFee }}</p>
					</TheVCol>
				</TheVRow>

				<v-divider />

				<h2 style="font-size: 20px; font-family: 500">
					Detail Profile
				</h2>
				<div v-html="deskripsi"></div>

				<v-divider />
				<h2 style="font-size: 20px; font-family: 500">Expertise</h2>
				<TheVRow max-width="600">
					<v-chip v-for="index in expertise" :key="index" style="padding-right: 4px">{{
						index
					}}</v-chip>
				</TheVRow>
			</TheVCol>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/controller/TheSidebar.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import router from "@/router";
import { useProfileStore } from "@/store/profile";

const profileStore = useProfileStore();

let nama, email, telepon, controllerFee, deskripsi, expertise, wilayah;

nama = profileStore.data.data_pengguna.nama || "Belum mengisi nama";
email = profileStore.data.data_pengguna.email || "Belum mengisi email";
telepon = profileStore.data.data_pengguna.nomor_telepon || "Belum mengisi nomor telepon";
controllerFee = profileStore.data.data_pengguna.fee || "Belum menentukan Fee";
deskripsi = profileStore.data.data_pengguna.profil_detail || "Tidak ada deskripsi";
expertise = profileStore.data.data_pengguna.spesialisasi || [];
wilayah = profileStore.data.data_pengguna.lokasi || "";

const handleEditProfile = () => {
	router.push("/controller/edit-profile");
};
</script>

<style scoped>
.content {
	font-weight: bold;
	font-size: 20px;
}
</style>
