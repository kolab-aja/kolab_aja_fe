<template>
	<v-container class="form-container">
		<v-row>
			<v-dialog v-model="toggle_date_pocker" persistent @click:outside="toggle_date_pocker = false">
				<v-date-picker color="primary" v-model="date" @update:model-value="toggle_date_pocker = false; formattedDate = formattedDateFunc(date); console.log(date)" style="margin: auto; display: block;"></v-date-picker>
			</v-dialog>

			<v-col cols="12" class="text-center mb-9 mt-2">
				<v-img src="@/assets/images/logo-kolab-aja.png" alt="Kolab Aja Logo" contain max-width="10rem"></v-img>
			</v-col>
			<v-col cols="12" md="8">
				<h1 class="form-title">Yuk, Mulai Project Pertamamu!</h1>
				<p class="form-subtitle text-h5 mb-5">Ikuti langkah-langkah di bawah ini!</p>
			</v-col>
			<v-col cols="12" md="9">
				<v-card class="px-10 py-10 mb-15" variant="flat">
					<v-card-title>1. Keterangan Project</v-card-title>
					<v-card-text>
						<TheFieldInput id="projecttitle" v-model="projectTitle" outlined dense
							class="mb-4 TheFieldInput-color" clearable autocomplete="off" label="" required />
						<p class="text-subtitle-1">Contoh:</p>
						<ul class="text-subtitle-1 pl-5 mb-8">
							<li>Membangun Situs WordPress Responsif dengan Fungsi Booking/Pembayaran</li>
							<li>Dibutuhkan Desainer Grafis untuk Membuat Kreasi Iklan untuk Beberapa Kampanye</li>
							<li>Spesialis Iklan Facebook Dibutuhkan untuk Peluncuran Produk</li>
						</ul>
						<TheRichTextBox v-model="projectDescription" required />
					</v-card-text>
				</v-card>

				<v-card class="px-10 py-10 mb-15" variant="flat">
					<v-card-title>2. Spesialisasi Project</v-card-title>
					<v-card-text>
						<v-select label="Kebutuhan Skill" v-model="projectSkill" :items="skills" variant="outlined"
							chips multiple dense clearable required />
					</v-card-text>
				</v-card>

				<v-card class="px-10 py-10 mb-15" variant="flat">
					<v-card-title>3. Budget & Estimasi</v-card-title>
					<v-card-text>
						<p class="mt-5">Tentukan estimasi pengerjaan projectnya</p>
						<v-text-field v-model="formattedDate" label="Tanggal Tenggat (YYYY-MM-DD)" @click="toggle_date_pocker = true;"
							prepend-icon="mdi-calendar" :rules="dateRules" required />

						<p>Tentukan budget projectnya</p>
						<v-text-field type="number" v-model="projectBudget" label="Budget (Rp)" prepend-icon="mdi-cash"
							required />
					</v-card-text>
				</v-card>

				<v-card class="px-10 py-10 mb-15" variant="flat">
					<v-card-title>4. Dokumentasi Lainnya</v-card-title>
					<v-card-text>
						<p>Dokumen Pendukung, file yang di dukung (jpeg, jpg, png, doc, docx, pdf, xls, xlsx, zip)</p>
						<v-file-input label="Drag your files here or browse" v-model="projectFiles" variant="outlined"
							class="v-file-input mt-4" clearable show-size multiple required />
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="3" class="form-sidebar">
			<v-card class="side-desc p-4" elevation="0">
				<v-col class="d-flex flex-column p-0">
					<TheButton class="mr-2 mb-3 btn-success" @click="submitForm">Lanjut</TheButton>
					<TheButton class="mr-2 mb-4 btn-cancel" @click="resetForm">Batal</TheButton>
				</v-col>

				<div class="divider"></div>

				<v-card-title class="text-h5 font-weight-bold">Cara Kerja Form</v-card-title>
				<v-card-text>
					Tujuan surat ini untuk pemberitahuan kepada client sebagai ajakan meeting.
				</v-card-text>
			</v-card>
		</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import TheFieldInput from "@/components/common/auth/TheFieldInput.vue";
import TheButton from "@/components/common/auth/TheButton.vue";
import TheRichTextBox from "@/components/common/TheRichTextBox.vue";
import router from "@/router";
import { useProjectStore } from "@/store/project";
import { useSnackbarStore } from "@/store/snackbar";
import { useSpesialisasiStore } from "@/store/spesialisasi";

const projectStore = useProjectStore();
const snackbarStore = useSnackbarStore();

const projectTitle = ref("");
const projectDescription = ref("");
const projectSkill = ref([]);
const projectDuration = ref(new Date());
const projectBudget = ref("");
const projectFiles = ref([]);
const toggle_date_pocker = ref(false);

const skills = ref([]);
const date = ref();

const formattedDate = ref(projectDuration.value.toISOString().slice(0, 10));
const dateRules = [date => !!date.match(/^\d{4}-\d{2}-\d{2}$/) || 'The date format must be YYYY-MM-DD'];

onMounted(async () => {
	const spesialisasiStore = useSpesialisasiStore();
	await spesialisasiStore.getSpesialisasi();
	skills.value = spesialisasiStore.data.map(values => values.nama);
});

function formattedDateFunc(date) {
	if (date) {
		let date_tmp = new Date(date);
		date_tmp.setMinutes(date_tmp.getMinutes() - date_tmp.getTimezoneOffset());
		return date_tmp.toISOString().split('T')[0];
	}
}

const submitForm = async () => {
	try {
		const formData = new FormData();
		formData.append('judul_proyek', projectTitle.value);
		formData.append('deskripsi_proyek', projectDescription.value);
		formData.append("spesialisasi", JSON.stringify(projectSkill.value));
		formData.append('anggaran', projectBudget.value);
		formData.append('tanggal_tegat', formattedDate.value);
		formData.append('file_dokumen', projectFiles.value[0]);

		const response = await projectStore.insertProject(formData);
		snackbarStore.showSnackbar({ type: 'success', message: 'Berhasil memasukan project' });
		resetForm();
	} catch (error) {
		snackbarStore.showSnackbar({ type: 'error', message: error.data.error | 'Terjadi kesalahan' });
	}
};

const resetForm = () => {
	projectTitle.value = "";
	projectDescription.value = "";
	projectSkill.value = [];
	projectDuration.value = new Date();
	projectBudget.value = "";
	projectFiles.value = [];
	router.push("/client/progress");
};
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
	color: #221943;
}

.form-title {
	font-size: 2.5vw;
	font-weight: bold;
}

.form-subtitle {
	font-size: 1.5vw;
}

.form-section {
	margin-bottom: 2vw;
	padding: 2vw;
	border: 1px solid #e0e0e0;
	border-radius: 0.5vw;
}

.TheFieldInput-color {
	background-color: #fff !important;
}

.skill-tags {
	margin-top: 1vw;
}

.skill-tags .v-chip {
	margin-right: 0.5vw;
	margin-bottom: 0.5vw;
}

.form-sidebar {
	display: flex;
	padding-left: 3rem;
	align-items: start;
	justify-content: center;
}

.side-desc {
	border-radius: 10px;
	border: none;
	background: #FFFFFF !important;
}

.form-sidebar .v-card {
	width: 100%;
}

.v-file-input input[type="file"] {
	border-radius: 10px;
	background: #dee4f0;
}

.divider {
	width: 50vw;
	height: 1px;
	margin-bottom: 2rem;
	background: rgba(123, 97, 220, 0.25);
}

.border {
	border: 0.5vw solid rgba(123, 97, 220, 0.25);
}

.v-card-title {
	font-weight: 550;
	margin-bottom: 0.5rem;
}

.v-radio {
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.6;
	letter-spacing: 0.0071428571em;
}

p {
	font-size: 1.1rem;
	font-weight: normal;
	line-height: 1.75;
	letter-spacing: 0.009375em;
}

.v-card {
	border-radius: 20px;
	background: rgba(221, 221, 221, 0.25);
}

.btn-success {
	background: #46377d;
	color: #fff;
	font-size: 1.3rem;
}

.btn-cancel {
	background: #fff;
	color: #46377d;
	font-size: 1.3rem;
	border: 1px solid #46377d;
}

.btn-success:hover {
	background: #46377d;
	color: #fff;
	font-size: 1.3rem;
}

.btn-cancel:hover {
	background: #cf455e;
	color: #fff;
	font-size: 1.3rem;
	border: 1px solid #cf455e;
}
</style>
