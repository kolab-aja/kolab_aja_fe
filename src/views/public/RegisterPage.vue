<template>
	<v-app>
		<ChooseRoleForm
			v-if="currentStep == 'choose-role'"
			@emits-click="handleNext"
		/>
		<RegisterForm
			v-else-if="currentStep == 'register-account'"
			@emits-submit="handleSubmit"
		/>
	</v-app>
</template>

<script setup>
import { ref } from "vue";
import ChooseRoleForm from "@/utils/ChooseRoleForm.vue";
import RegisterForm from "@/utils/RegisterForm.vue";
import { useAuthStore } from "@/store/auth";
import router from "@/router";

const authStore = useAuthStore();

const selectedRoleId = ref(null);

const currentStep = ref("choose-role");

const handleNext = (roleId) => {
	selectedRoleId.value = roleId;
	currentStep.value = "register-account";
};

const handleSubmit = async ({ nama, email, password, lokasi }) => {
	try {
		// ERROR SNACKBAR REGISTER SUDAH TERHANDLE DI fetchApi.js
		await authStore.register({
			nama: nama,
			email: email,
			password: password,
			lokasi: lokasi,
			id_role: selectedRoleId.value,
		});
		router.push(`/${authStore.userRoles}/edit-profile`);
	} catch (error) {
		// TIDAK AKAN ADA ERROR YANG TEMBUS DISINI
	}
};
</script>

<style scoped></style>
