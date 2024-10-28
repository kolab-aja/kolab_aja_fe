<template>
	<v-app>
		<v-container class="center">
			<v-card class="form-card">
				<v-card-title class="login-title">
					<h2 class="sign-in-text text-center">Sign In</h2>
				</v-card-title>
				<p class="text-caption text-center mb-2">
					Masuk untuk melanjutkan
				</p>
				<v-card-text>
					<v-form @submit.prevent="handleLogin">
						<TheFieldInput
							id="email"
							label="Alamat Email"
							v-model="email"
							:error-message="emailError"
							required
						>
						</TheFieldInput>
						<TheFieldInput
							id="password"
							label="Password"
							v-model="password"
							:type="showPassword ? 'text' : 'password'"
							:error-message="passwordError"
							required
						>
							<template #append-icon>
								<v-icon
									class="append-icon"
									@click="toggleShowPassword"
								>
									{{
										showPassword ? "mdi-eye-off" : "mdi-eye"
									}}
								</v-icon>
							</template>
						</TheFieldInput>
						<div class="text-right mb-4">
							<a href="#" class="forgot-password"
								>Lupa Password?</a
							>
						</div>
						<TheButton
							@emits-click="handleButtonClick"
							v-bind="{
								type: 'submit',
								customType: 'primary',
								otherStyle: {
									width: '100%',
								},
							}"
							>Sign in</TheButton
						>
					</v-form>
				</v-card-text>
				<v-card-actions class="justify-center">
					<p class="mb-1">
						Belum punya akun?
						<a
							href="/Register"
							class="sign-up-link font-weight-bold"
							style="color: #8a76d4"
							>Sign Up</a
						>
					</p>
				</v-card-actions>
			</v-card>
		</v-container>
	</v-app>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import TheFieldInput from "@/components/common/auth/TheFieldInput.vue";
import TheButton from "@/components/common/auth/TheButton.vue";
import { useSnackbarStore } from "@/store/snackbar";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const emailError = ref("");
const passwordError = ref("");

const handleButtonClick = () => {
	if (email.value == "") {
		emailError.value = "Email tidak boleh kosong";
	} else {
		emailError.value = "";
	}

	if (password.value == "") {
		passwordError.value = "Password tidak boleh kosong";
	} else {
		passwordError.value = "";
	}
};

const handleLogin = async () => {
	if (!emailError.value && !passwordError.value) {
		try {
			await authStore.login({
				email: email.value,
				password: password.value,
			});
			authStore.redirectAfterLogin();
		} catch (error) {
			const snackbarStore = useSnackbarStore();
			snackbarStore.showSnackbar({
				message: error.response.data.errors,
				timeout: 5000,
			});
		}
	}
};

const toggleShowPassword = () => {
	showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.sign-in-text {
	font-size: 2.5rem;
	font-weight: bold;
	width: 100%;
}

.center {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.login-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 16px;
}

.outlined-card {
	max-width: 800px;
	width: 100%;
	padding: 50px 100px;
	border: 1px solid #8a76d4;
	border-radius: 10px;
}

.login-title {
	display: flex;
	align-items: center;
	justify-content: center;
}

.form-card {
	max-width: 800px;
	width: 100%;
	padding: 50px 100px;
	border: 1px solid #8a76d4;
	box-shadow: none;
	border-radius: 10px;
}

.forgot-password {
	margin-top: 8px;
	text-align: right;
	color: black;
	text-decoration: none;
	transition: border-bottom 0.3s ease;
}

.forgot-password:hover {
	border-bottom: 1px solid black;
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

.text-center {
	text-align: center;
}

.text-caption {
	margin-top: -10px;
	font-size: 1rem !important;
}

.append-icon {
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-50%);
	cursor: pointer;
}

@media (max-width: 600px) {
	.form-card {
		padding: 16px;
	}

	.sign-in-text {
		font-size: 2rem;
	}

	.outlined-card {
		padding: 16px;
	}
}
</style>
