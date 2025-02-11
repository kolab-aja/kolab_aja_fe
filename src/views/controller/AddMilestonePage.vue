<template>
	<v-app class="container">
		<v-container>
			<TheVCol>
				<v-img src="@/assets/images/logo-kolab-aja.png" alt="Kolab Aja Logo" contain max-width="10rem"></v-img>
			</TheVCol>
			<TheVRow class="d-flex flex-column justify-center mt-10 box">
				<TheButton size="icon-l" type="primary-icon-1" icon="mdi-arrow-left" class="mb-10 spacing"
					@click="handleGoBack" />
				<TheVRow class="d-flex align-center spacing">
					<TheVCol>
						<div md="10" class="d-flex align-center ga-3">
							<v-avatar size="50" :image="DefaultTeamProfile" style="border: 2px solid #8a76d4" />
							<p style="font-weight: 400">
								{{ mileStoneData?.team_nama }}
							</p>
						</div>
						<div>
							<h3 class="mt-2">
								{{ mileStoneData?.proyek_judul_proyek }}
							</h3>
						</div>
					</TheVCol>
					<TheVCol md="2" class="text-right">
						<TheButton suffix-icon="mdi-open-in-new" size="text-icon-m"
							style="height: 55px !important; font-size: 16px !important;">
							Detail Project
						</TheButton>
					</TheVCol>

					<v-divider class="custom-divider"></v-divider>

					<TheVRow>
						<TheVCol md="8">
							<div class="d-flex align-center ga-3">
								<TheButton size="icon-m" type="primary-icon-2" icon="mdi-plus" />
								<p><strong>Tambah Milestone</strong></p>
							</div>
							<form @submit.prevent="handleSubmitForm">
								<div class="taskInput ml-11 mt-5">
									<TheVRow>
										<TheInput max-width="800" custom-label="Task"
											placeholder="Persiapkan Roles Team" bg-color="white" v-model="task"
											:error-messages="errorTask" />
									</TheVRow>
									<TheVRow>
										<TheInput max-width="800" custom-label="Deskripsi Task"
											placeholder="Tambahkan Deskripsi" bg-color="white" v-model="deskripsi"
											:error-messages="errorDeskripsi" />
									</TheVRow>
									<TheVRow>
										<TheInput max-width="800" custom-label="Tautan" placeholder="Link Meeting"
											bg-color="white" v-model="tautan" :error-messages="errorTautan" />
									</TheVRow>
									<TheVRow class="d-flex ga-5">
										<TheVCol>
											<TheInput append-inner-icon="mdi-percent" max-width="700"
												custom-label="Presentase" placeholder="20" bg-color="white"
												v-model="persentase" :error-messages="errorPersentase"
												@keypress="isNumber($event)" />
										</TheVCol>
										<TheVCol class="d-flex flex-column pa-0" style="height: min-content">
											<label class="mb-2">Deadline</label>
											<v-date-input density="compact" color="lightPrimary" variant="outlined"
												append-inner-icon="mdi-calendar-month" rounded="lg" bg-color="white"
												v-model="selectedDate" :error-messages="errorSelectedDate" />
										</TheVCol>
									</TheVRow>
								</div>
								<div class="mt-10">
									<TheButton size="l" type="primary" style="width: 126px; font-weight: 700"
										@click="handlePublishButtonClick" button-type="submit">
										Publish
									</TheButton>
								</div>
							</form>
						</TheVCol>
						<v-divider class="mr-10" vertical></v-divider>
						<TheVCol md="3">
							<h6>Tentang Project</h6>
							<div class="mt-7">
								<p class="secondaryP">Project Price</p>
								<h6 style="font-weight: 400">
									<!-- Perbaikan: konversi ke string sebelum slice -->
									{{ mileStoneData?.proyek_anggaran ?
									mileStoneData.proyek_anggaran.toString().slice(0, -3) + 'k' : '' }}
								</h6>
							</div>
							<div class="mt-7">
								<p class="secondaryP">Close Date</p>
								<h6 style="font-weight: 400">
									{{ formatDate(mileStoneData?.proyek_tanggal_tegat) }}
								</h6>
							</div>
							<h6 class="mt-10">Progression</h6>
							<div>
								<v-progress-linear :model-value="mileStoneData?.milestone_persentase"
									color="var(--secondary--purple, #46377D)" height="25" class="mt-5" rounded="round">
									<template v-slot:default="{ value }">
										<strong>{{ Math.ceil(value) }}%</strong>
									</template>
								</v-progress-linear>
							</div>
						</TheVCol>
					</TheVRow>
				</TheVRow>
			</TheVRow>
		</v-container>
	</v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheInput from "@/components/common/TheInput.vue";
import router from "@/router";
import DefaultTeamProfile from "@/assets/images/default-profile-team.png";
import { useControllerMilestone } from "@/store/controller/milestone";
import formatDate from "@/lib/formatDate";
import { useSnackbarStore } from "@/store/snackbar";

const route = useRoute();
const projectId = route.params.id;
const controllerMilestone = useControllerMilestone();
const snackbarStore = useSnackbarStore();

const mileStoneData = ref(null);

const task = ref("");
const deskripsi = ref("");
const tautan = ref("");
const persentase = ref(null);
const selectedDate = ref(null);

const errorTask = ref("");
const errorDeskripsi = ref("");
const errorTautan = ref("");
const errorPersentase = ref("");
const errorSelectedDate = ref("");

const handleGoBack = () => {
	router.back();
};

onMounted(async () => {
	try {
		await controllerMilestone.GetMilestone({ id_proyek: projectId });
		mileStoneData.value = controllerMilestone.data;
	} catch (error) {
		// console.error("Error fetching milestone data:", error);
	}
});

const handlePublishButtonClick = () => {
	if (!task.value) {
		errorTask.value = "Task tidak boleh kosong";
	} else {
		errorTask.value = "";
	}

	if (!deskripsi.value) {
		errorDeskripsi.value = "Deskripsi tidak boleh kosong";
	} else {
		errorDeskripsi.value = "";
	}

	if (!tautan.value) {
		errorTautan.value = "Tautan tidak boleh kosong";
	} else {
		errorTautan.value = "";
	}

	if (!persentase.value) {
		errorPersentase.value = "Persentase tidak boleh kosong";
	} else if (isNaN(persentase.value)) {
		errorPersentase.value = "Persentase hanya boleh angka";
	} else if (parseInt(persentase.value) === 0) {
		errorPersentase.value = "Persentase tidak boleh 0";
	} else if (
		parseInt(persentase.value) + parseInt(mileStoneData.value.milestone_persentase) > 100
	) {
		const maksPersentase = 100 - parseInt(mileStoneData.value.milestone_persentase);
		errorPersentase.value = `Persentase hanya bisa maksimal ${maksPersentase} %`;
	} else {
		errorPersentase.value = "";
	}

	if (!selectedDate.value) {
		errorSelectedDate.value = "Deadline tidak boleh kosong";
	} else {
		errorSelectedDate.value = "";
	}
};

function isNumber(event) {
	const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let keyPressed = event.key;

	if (!keysAllowed.includes(keyPressed)) {
		event.preventDefault()
	}
}


const handleSubmitForm = async () => {
	if (
		!errorTask.value &&
		!errorDeskripsi.value &&
		!errorTautan.value &&
		!errorPersentase.value &&
		!errorSelectedDate.value
	) {
		try {
			const date = new Date(selectedDate.value);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			const formattedDate = `${year}-${month}-${day}`;

			await controllerMilestone.TambahMilestone({
				id_proyek: projectId,
				topik: task.value,
				deskripsi: deskripsi.value,
				tautan: tautan.value,
				persentase: parseInt(persentase.value),
				tanggal_tegat: formattedDate,
			});

			snackbarStore.showSnackbar({
				type: "success",
				message: "Data berhasil di update",
				timeout: 5000,
			});

			router.push("/controller/progress");
		} catch (error) {
			console.error("Error in handleSubmitForm:", error);
		}
	}
};
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

/* Typography */
h3,
h6,
p {
	color: var(--primary-purple-100, var(--primary-purple, #221943));
	line-height: 120%;
}

.secondaryP {
	color: var(--primary-purple-80, var(--secondary--purple, #46377d));
	margin-bottom: 0.5rem;
	font-weight: 700;
}

h6 {
	font-size: 20px;
}

h3 {
	font-size: 39px;
	font-weight: 700;
}

/* Spacing */
.box {
	width: 70vw;
	margin: auto;
}

.custom-divider {
	margin: 2rem 0;
}

.taskInput {
	width: 40vw;
	padding: 20px 24px;
	border-radius: 10px;
	background: rgba(221, 221, 221, 0.25);
}
</style>
