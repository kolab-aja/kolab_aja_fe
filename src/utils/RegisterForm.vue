<template>
	<v-container class="center">
		<v-card class="form-card">
			<v-card-title class="register-title">
				<h2 class="sign-in-text text-center">Sign Up</h2>
			</v-card-title>
			<p class="text-caption text-center mb-2">
				Lengkapi data pribadimu!
			</p>
			<v-card-text>
				<v-form>
					<TheFieldInput
						id="nama"
						v-model="name"
						:errorMessage="errorNama"
						label="Nama"
						required
					/>
					<TheFieldInput
						id="email"
						v-model="email"
						:error-message="errorEmail"
						label="Alamat Email"
						required
					/>
					<TheFieldInput
						id="password"
						label="Password"
						v-model="password"
						:type="showPassword ? 'text' : 'password'"
						:error-message="errorPassword"
						required
					>
						<template #append-icon>
							<v-icon
								class="append-icon"
								@click="toggleShowPassword"
							>
								{{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
							</v-icon>
						</template>
					</TheFieldInput>

					<TheFieldInput
						id="Wilayah"
						v-model="lokasi"
						:error-message="lokasiError"
						label="Wilayah"
						dynamic-placeholder="Format : Kota, Provinsi"
						required
					/>

					<v-checkbox
						v-model="termsAccepted"
						label="Ya, saya mengerti syarat & ketentuan"
						:error="errorTermsAccepted === false"
						required
					/>
					<TheButton
						customType="primary"
						class="sign-up-button"
						@click.prevent="handleSubmit"
						>Sign Up</TheButton
					>
					<v-card-actions class="justify-center">
						<p class="mb-1">
							Sudah punya akun?
							<a
								href="/Login"
								class="font-weight-bold"
								style="color: #8a76d4"
								>Sign In</a
							>
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
import validateEmail from "@/lib/validate/validateEmail.js";

const name = ref("");
const errorNama = ref("");
const email = ref("");
const errorEmail = ref("");
const password = ref("");
const errorPassword = ref("");
const lokasi = ref("");
const lokasiError = ref("");
const termsAccepted = ref(false);
const errorTermsAccepted = ref(null);

const showPassword = ref(false);

const emit = defineEmits(["emits-submit"]);

const toggleShowPassword = () => {
	showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
	if (name.value == "") {
		errorNama.value = "Nama tidak boleh kosong";
	} else {
		errorNama.value = "";
	}

	if (email.value == "") {
		errorEmail.value = "Email tidak boleh kosong";
	} else if (!validateEmail(email.value)) {
		errorEmail.value = "Email tidak valid";
	} else {
		errorEmail.value = "";
	}

	if (password.value == "") {
		errorPassword.value = "Password tidak boleh kosong";
	} else if (validatePassword(password.value) != "Password valid") {
		errorPassword.value = validatePassword(password.value);
	} else {
		errorPassword.value = "";
	}

	if (lokasi.value == "") {
		lokasiError.value = "Wilayah tidak boleh kosong";
	} else if (lokasi.value.split(", ").length != 2) {
        lokasiError.value = "Format wilayah salah"
	} else {
		lokasiError.value = "";
	}

	errorTermsAccepted.value = termsAccepted.value;

	// errorNama saat tidak ada valuenya string kosong, pas string kosong maka tidak ada error
	if (
		errorNama.value === "" &&
		errorEmail.value === "" &&
		errorPassword.value === "" &&
		lokasiError.value === "" &&
		errorTermsAccepted.value
	) {
		emit("emits-submit", {
			nama: name.value,
			email: email.value,
			password: password.value,
			lokasi: lokasi.value,
		});
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

.sign-in-button {
	width: 100%;
}

.login-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 16px;
}

.outlined-card {
	border: 1px solid #ccc;
	padding: 25px;
	height: 100%;
	border-radius: 10px;
}

.register-title {
	display: flex;
	align-items: center;
	justify-content: center;
}

.forgot-password {
	margin-top: 8px;
	text-align: right;
	color: black;
	text-decoration: none;
	transition: border-bottom 0.3s ease;
}

.append-icon {
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-50%);
	cursor: pointer;
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

/* Mobile Responsive Styles */
@media (max-width: 600px) {
	.form-card {
		padding: 16px;
		width: 90%;
	}

	.sign-in-text {
		font-size: 1.75rem;
	}

	.append-icon {
		right: 8px;
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
