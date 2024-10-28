<template>
	<v-container
		class="mt-auto mb-auto custom-container d-flex flex-column ga-10"
	>
        <v-img src="@/assets/images/logo-kolab-aja.png" position="left" height="40" class="mt-n16 mb-16  ml-md-n10 ml-sm-0" />
		<v-col>
			<h1 class="text-h3 font-weight-bold">Pilih Peranmu!</h1>
			<p class="desc text-h5">Masuk sebagai?</p>
		</v-col>

		<v-row>
			<v-col v-for="item in roleList">
				<v-card
					v-if="selectedRoleId != item.roleId"
					variant="flat"
					class="pa-5 border role-card fixed-width h-100"
					@click="changeRole(item.roleId)"
				>
					<v-card-title class="d-flex justify-left pb-12">
						<v-icon :icon="item.icon" size="x-large"></v-icon>
					</v-card-title>
					<v-card-title class="text-h5">{{ item.name }}</v-card-title>
					<v-card-text class="role-desc">{{
						item.description
					}}</v-card-text>
				</v-card>
                <v-card
					v-if="selectedRoleId == item.roleId"
					variant="flat"
					class="pa-5 border role-card fixed-width h-100 active-card"
					@click="changeRole(item.roleId)"
				>
					<v-card-title class="d-flex justify-left pb-12">
						<v-icon :icon="item.icon" size="x-large" color="white"></v-icon>
					</v-card-title>
					<v-card-title class="text-h5 text-white">{{ item.name }}</v-card-title>
					<v-card-text class="role-desc-active">{{
						item.description
					}}</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Action Button and Sign In Link -->
		<v-col class="action-section">
			<v-btn class="btn-role text-h6 text-capitalize mb-3" @click="handleNext">
				<p class="text-white">Masuk Sebagai {{ selectedRoleName }}</p>
				<v-icon class="ml-1" color="white" icon="mdi-arrow-right" />
			</v-btn>
			<p class="ml-5">
				Sudah punya akun?
				<a
					href="/Login"
					class="sign-up-link font-weight-bold"
					style="color: #8a76d4"
					>Sign In</a
				>
			</p>
		</v-col>
	</v-container>
</template>

<script setup>
import { computed } from "vue";
import { ref } from "vue";

const roleList = [
	{
		roleId: 3,
		name: "Client",
		icon: "mdi-account",
		description: "Tinggal tambahkan proyek dan tunggu notifikasi selesai!",
	},
	{
		roleId: 2,
		name: "Controller",
		icon: "mdi-cogs",
		description:
			"Ciptakan alur kerja yang lebih baik untuk klien dan creative hub.",
	},
	{
		roleId: 1,
		name: "Creative Hub",
		icon: "mdi-lightbulb",
		description: "Kami menyediakan agensi dan tim terbaik untuk Anda.",
	},
];

const selectedRoleId = ref(3);

const selectedRoleName = computed(() => {
	return roleList.find((arr) => arr.roleId === selectedRoleId.value).name;
});

const emit = defineEmits(["emits-click"]);

const changeRole = (roleId) => {
	selectedRoleId.value = roleId;
};

const handleNext = () => {
    emit("emits-click", selectedRoleId.value)
}
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

@media (min-width: 1920px) {
	.custom-container {
		max-width: 1200px;
	}
}

.center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 7rem;
	height: 100vh;
}

.border {
	border: 0.5vw solid rgba(123, 97, 220, 0.25);
    border-radius: 8px;
}

.desc {
	font-size: 1vw;
	line-height: 1.5;
	color: rgba(34, 25, 67, 0.5);
}

.role-desc {
	font-size: 14px;
	color: rgba(34, 25, 67, 0.5) !important;
}

.role-desc-active {
	color: rgba(222, 228, 240, 1) !important;
}

.active-card {
	background: rgba(34, 25, 67, 1);
}

.sign-in {
	text-decoration: underline;
	padding-left: 0.5vw;
}

.btn-role {
	height: 4vw !important;
	color: #fff;
	text-transform: capitalize;
	padding: 0.7vw 2vw;
	border-radius: 500vw;
	background: #46377d;
}

h1,
p,
.v-icon {
	color: #221943;
}

.v-card-title {
	font-weight: 600;
}

.v-card-text {
	font-size: 1vw;
	color: rgba(34, 25, 67, 0.2);
}

@media (max-width: 600px) {
	.text-center.text-sm-left {
		text-align: center;
	}
}
</style>
