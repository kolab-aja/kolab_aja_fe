<template>
	<TheVRow class="navbar d-flex align-center justify-end" :style="{ color: customColor }">
		<TheVCol class="text-center">
			<v-img
				:src="logoSrc"
				alt="Kolab Aja Logo"
				contain
				max-width="10rem"
			></v-img>
		</TheVCol>
		<TheVCol class="profile-container">
			<div class="d-flex align-center justify-center">
				<v-avatar size="36" image="@/assets/images/default-profile-picture.png"></v-avatar>
				<p class="ml-2">{{ profileStore.data ? profileStore.data.data_pengguna.nama : 'New User' }}</p>
			</div>
		</TheVCol>
	</TheVRow>
</template>

<script setup>
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import { useProfileStore } from "@/store/profile";
import { computed, defineProps } from 'vue';

// Define the props for customColor
const props = defineProps({
	customColor: {
		type: String,
		default: 'black'
	}
});

const profileStore = useProfileStore();

// Import images based on the color prop
const logoWhite = new URL('@/assets/images/logo-kolab-aja-white.png', import.meta.url).href;
const logoBlack = new URL('@/assets/images/logo-kolab-aja.png', import.meta.url).href;

// Computed property to determine the logo source based on customColor
const logoSrc = computed(() => {
	return props.customColor === 'white'
		? logoWhite
		: logoBlack;
});

// Computed property for the profile avatar source
const profileAvatarSrc = computed(() => {
	return new URL('@/assets/images/default-profile-picture.png', import.meta.url).href;
});
</script>

<style scoped>
.navbar {
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	background-color: transparent;
	padding: 30px 50px;
	z-index: 1000; /* Navbar tetap di atas konten lainnya */
	display: flex;
	justify-content: flex-end;
}

.profile-container {
	display: flex;
	justify-content: flex-end; /* Memastikan profil berada di pojok kanan */
	align-items: center;
}

.content {
	margin-top: 130px; /* Menyesuaikan margin konten agar tidak tertutup navbar */
}

@media (max-width: 600px) {
	.navbar {
		padding: 15px 30px; /* Mengurangi padding untuk perangkat kecil */
	}
	.profile-container {
		justify-content: flex-end;
	}
	.text-center p {
		display: none; /* Menyembunyikan nama pengguna pada perangkat kecil */
	}
	.v-avatar {
		width: 30px;
		height: 30px; /* Mengurangi ukuran avatar pada perangkat kecil */
	}
}
</style>
