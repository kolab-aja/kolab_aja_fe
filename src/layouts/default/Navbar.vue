<template>
	<TheVRow class="navbar d-flex align-center justify-center" :style="{ color: customColor }">
		<TheVCol class="text-center" cols="11">
			<v-img
				:src="logoSrc"
				alt="Kolab Aja Logo"
				contain
				max-width="10rem"
			></v-img>
		</TheVCol>
		<TheVCol>
			<div class="d-flex align-center ga-3 justify-center">
				<v-avatar size="36" image="@/assets/images/default-profile-picture.png"></v-avatar>
				<p>{{ profileStore.data ? profileStore.data.data_pengguna.nama : 'New User' }}</p>
			</div>
		</TheVCol>
	</TheVRow>
</template>

<script setup>
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import {useProfileStore} from "@/store/profile";
import {computed, defineProps} from 'vue';

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
	left: 0;
	width: 100%;
	background-color: transparent;
	padding: 30px 50px;
	z-index: 1000; /* Make sure navbar is above other content */
}

.content {
	margin-top: 130px; /* Adjust this value to fit your navbar height */
}
</style>
