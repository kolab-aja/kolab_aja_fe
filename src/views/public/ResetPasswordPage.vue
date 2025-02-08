<template>
	<v-container class="center">
		<v-card class="form-card">
			<v-card-title class="register-title">
				<h2 class="sign-in-text text-center">Reset Password</h2>
			</v-card-title>
			<p class="text-caption text-center mb-2">
				Buat kata sandi baru untuk akunmu.
			</p>
			<v-card-text>
				<v-form>
					<TheFieldInput
						id="new-password"
						label="Password Baru"
						v-model="newPassword"
						:type="showNewPassword ? 'text' : 'password'"
						:error-message="errorNewPassword"
						required
					>
						<template #append-icon>
							<v-icon
								class="append-icon"
								@click="toggleShowNewPassword"
							>
								{{ showNewPassword ? "mdi-eye-off" : "mdi-eye" }}
							</v-icon>
						</template>
					</TheFieldInput>

					<TheFieldInput
						id="confirm-password"
						label="Konfirmasi Password"
						v-model="confirmPassword"
						:type="showConfirmPassword ? 'text' : 'password'"
						:error-message="errorConfirmPassword"
						required
					>
						<template #append-icon>
							<v-icon
								class="append-icon"
								@click="toggleShowConfirmPassword"
							>
								{{ showConfirmPassword ? "mdi-eye-off" : "mdi-eye" }}
							</v-icon>
						</template>
					</TheFieldInput>

					<TheButton
						customType="primary"
						class="sign-up-button"
						@click.prevent="handleSubmit"
					>
						Reset Password
					</TheButton>
					<v-card-actions class="justify-center">
						<p class="mb-1">
							Kembali ke halaman
							<a
								href="/Login"
								class="font-weight-bold sign-up-link"
							>
								Sign In
							</a>
						</p>
					</v-card-actions>
				</v-form>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import TheFieldInput from "@/components/common/auth/TheFieldInput.vue";
import TheButton from "@/components/common/auth/TheButton.vue";
import validatePassword from "@/lib/validate/validatePassword.js";

const newPassword = ref("");
const confirmPassword = ref("");
const errorNewPassword = ref("");
const errorConfirmPassword = ref("");
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleShowNewPassword = () => {
	showNewPassword.value = !showNewPassword.value;
};

const toggleShowConfirmPassword = () => {
	showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSubmit = () => {
	if (newPassword.value === "") {
		errorNewPassword.value = "Password baru tidak boleh kosong";
	} else if (validatePassword(newPassword.value) !== "Password valid") {
		errorNewPassword.value = validatePassword(newPassword.value);
	} else {
		errorNewPassword.value = "";
	}

	if (confirmPassword.value === "") {
		errorConfirmPassword.value = "Konfirmasi password tidak boleh kosong";
	} else if (confirmPassword.value !== newPassword.value) {
		errorConfirmPassword.value = "Password tidak cocok";
	} else {
		errorConfirmPassword.value = "";
	}
};
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.form-card {
	max-width: 800px;
	width: 100%;
	padding: 2% 100px;
	border: 1px solid #8a76d4;
	box-shadow: none;
	border-radius: 10px;
}

.sign-up-button {
	width: 100%;
}

.center {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.sign-in-text {
	font-size: 2.5rem;
	font-weight: bold;
	width: 100%;
	text-align: center;
}

.register-title {
	display: flex;
	align-items: center;
	justify-content: center;
}

.text-caption {
	margin-top: -10px;
	font-size: 1rem !important;
}

.sign-up-link {
	color: #8a76d4;
	text-decoration: none;
	transition: color 0.3s ease;
}

.sign-up-link:hover {
	text-decoration: underline;
	color: black;
}

/* Mobile Responsive Styles */
@media (max-width: 600px) {
	.form-card {
		padding: 16px;
		width: 90%;
	}

	.sign-in-text {
		font-size: 1.75rem;
	}

	.sign-up-button {
		width: 100%;
		font-size: 1rem;
		padding: 12px 0;
	}

	.text-caption {
		font-size: 0.875rem !important;
	}
}
</style>
