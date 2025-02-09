<template>
	<v-container class="custom-container d-flex flex-column align-center py-10">
		<v-img src="@/assets/images/logo-kolab-aja.png" height="40" class="my-8" />
		<v-col class="text-center">
			<h1 class="text-h3 font-weight-bold">Pilih Peranmu!</h1>
			<p class="desc text-h5">Masuk sebagai?</p>
		</v-col>

		<v-row class="gap-4">
			<v-col v-for="item in roleList" :key="item.roleId" cols="12" md="4">
				<v-card :class="{ 'active-card': selectedRoleId === item.roleId }" class="pa-5 border role-card"
					variant="flat" @click="changeRole(item.roleId)">
					<v-card-title class="d-flex justify-left pb-6">
						<v-icon :icon="item.icon" size="x-large"
							:color="selectedRoleId === item.roleId ? 'white' : ''"></v-icon>
					</v-card-title>
					<v-card-title :class="{ 'text-white': selectedRoleId === item.roleId }" class="text-h5">{{ item.name }}</v-card-title>
					<v-card-text :class="selectedRoleId === item.roleId ? 'role-desc-active' : 'role-desc'">
						{{ item.description }}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Action Button and Sign In Link -->
		<v-col class="action-section mt-8 text-center">
			<v-btn class="btn-role text-h6 text-capitalize mb-4" @click="handleNext">
				<p class="text-white m-0">Masuk Sebagai {{ selectedRoleName }}</p>
				<v-icon class="ml-1" color="white" icon="mdi-arrow-right" />
			</v-btn>
			<p>
				Sudah punya akun?
				<a href="/Login" class="sign-up-link font-weight-bold" style="color: #8a76d4">Sign In</a>
			</p>
		</v-col>
	</v-container>
</template>

<script setup>
import { ref, computed } from "vue";

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
		description: "Ciptakan alur kerja yang lebih baik untuk klien dan creative hub.",
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
	return roleList.find((role) => role.roleId === selectedRoleId.value)?.name;
});

const emit = defineEmits(["emits-click"]);

const changeRole = (roleId) => {
	selectedRoleId.value = roleId;
};

const handleNext = () => {
	emit("emits-click", selectedRoleId.value);
};
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.custom-container {
	max-width: 1200px;
	padding: 2rem;
}

.border {
	border: 0.2rem solid rgba(123, 97, 220, 0.25);
	border-radius: 8px;
}

.desc {
	font-size: 1.2rem;
	color: rgba(34, 25, 67, 0.6);
}

.role-desc {
	font-size: 1rem;
	color: rgba(34, 25, 67, 0.7);
}

.role-desc-active {
	color: #dee4f0;
}

.active-card {
	background-color: #221943;
	color: #fff;
}

.btn-role {
	min-height: 3rem;
	padding: 0.5rem 2rem;
	border-radius: 50px;
	background-color: #46377d;
	color: #fff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.text-white {
	color: #ffffff !important;
}

.m-0 {
	margin: 0;
}

h1,
p,
.v-icon {
	color: #221943;
}

.v-card-title {
	font-weight: 600;
}

@media (max-width: 600px) {
	.text-center {
		text-align: center;
	}
}
</style>
