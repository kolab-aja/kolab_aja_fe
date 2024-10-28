<template>
	<v-app class="container">
		<TheNavbar></TheNavbar>
		<v-row
			md="12"
			class="main mx-auto d-flex flex-column align-center text-center"
		>
			<v-sheet class="error">404</v-sheet>
			<v-sheet class="error-desc">
				Maaf, halaman tidak ditemukan
			</v-sheet>
			<v-sheet class="mt-7">
				<the-button custom-type="primary" @click="redirectTo(computedRoute.url)">Kembali ke {{ computedRoute.backButtonContent }}</the-button>
			</v-sheet>
		</v-row>
	</v-app>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import TheButton from "@/components/common/auth/TheButton.vue";
import router from "@/router";
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";

const redirectTo = (route) => {
	router.push(route);
};

const authStore = useAuthStore();
const userRole = authStore.userRoles;

const computedRoute = computed(() => {
	if ( ["controller", "client", "creative-hub-team"].includes(userRole) ) {
		return { url: `/${userRole}/progress`, backButtonContent: "Progress Page" }
	} else if ( userRole === "creative-hub-admin" ) {
		return { url: "/creative-hub-admin/my-team", backButtonContent: "Team Saya Page" }
	} else {
		// NOT LOGIN USER
		return { url: "/", backButtonContent: "Homepage" }
	}
})
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.container {
	padding: 0;
	width: 100vw;
	height: 100vh;
	background: #15102A;
	overflow: hidden;
}

.main {
	display: flex;
	justify-content: center;
}

.error {
	color: #dee4f0;
	text-shadow: 10px 4px 5px #65558f;
	font-size: 180px;
	font-weight: 700;
}

.error-desc {
	color: #dee4f0;
	font-size: 25px;
	font-weight: 700;
	margin-top: -2rem;
}

.v-sheet {
	background: #15102A;
}

@media (max-width: 1024px) {
	.error {
		font-size: 150px;
	}

	.error-desc {
		font-size: 20px;
	}
}

@media (max-width: 768px) {
	.error {
		font-size: 120px;
	}

	.error-desc {
		font-size: 18px;
	}
}
</style>
