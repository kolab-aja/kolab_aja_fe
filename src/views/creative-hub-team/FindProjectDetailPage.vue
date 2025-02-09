<template>
	<v-container>
		<!-- logo and navbar -->
		<TheVRow>
			<TheVCol>
				<v-img src="@/assets/images/logo-kolab-aja.png" alt="Kolab Aja Logo" contain max-width="9rem"></v-img>
			</TheVCol>
			<TheVCol class="d-flex align-center ga-3 justify-end">
				<v-avatar size="36" image="@/assets/images/default-profile-picture.png"></v-avatar>
				<p style="color: #221943">{{ profileStore.data ? profileStore.data.data_pengguna.nama : 'New User' }}
				</p>
			</TheVCol>
		</TheVRow>

		<!-- controller information section -->
		<TheVRow class="d-flex flex-column box mt-10">
			<TheButton size="icon-l" type="primary-icon-1" icon="mdi-arrow-left" class="mb-10 spacing"
				@click="back()" />
			<v-card variant="text" class="outline">
				<v-card-title class="d-flex align-center">
					<TheVRow>
						<TheVCol>
							<v-avatar size="74" class="mr-3"
								image="@/assets/images/default-profile-picture.png"></v-avatar>
							<div v-if="dataLoaded">
								<h5>{{ dataDetail.controller.nama_controller }}</h5>

								<div class="d-flex align-center ga-1">
									<v-icon icon="mdi-map-marker" size="s"></v-icon>
									<p class="fill-card" style="font-weight: 400; color: #221943">
										{{ dataDetail.controller.lokasi }}
									</p>
								</div>

							</div>
							<div v-else>
								<v-skeleton-loader type="heading, text"></v-skeleton-loader>
							</div>

						</TheVCol>
						<TheButton color="primary" @click="applyProject">Apply</TheButton>
					</TheVRow>

				</v-card-title>
			</v-card>
		</TheVRow>

		<TheVRow class="box">
			<TheVCol md="8">
				<p class="mt-5">Overview</p>
				<h4 v-if="dataLoaded" class="mt-2">{{ dataDetail.proyek.judul_proyek }}</h4>
				<v-skeleton-loader v-else type="heading"></v-skeleton-loader>

				<!-- richtextbox value -->
				<div class="mt-2" v-if="dataLoaded">
					<p style="color: #221943; font-weight: 400" v-html="dataDetail.proyek.deskripsi_proyek"></p>
				</div>
				<v-skeleton-loader v-else type="text, text"></v-skeleton-loader>

				<p class="mt-10">Kebutuhan Skill</p>
				<div class="mt-3" v-if="dataLoaded">
					<v-chip v-for="(item, index) in proyekSpesialisasi" :key="index" class="chip">
						{{ item }}
					</v-chip>
				</div>
				<v-skeleton-loader v-else type="chip, chip, chip"></v-skeleton-loader>

				<p class="mt-10">Dokumen Lainnya</p>
				<div class="d-flex ga-3" v-if="dataLoaded">
					<div class="d-flex ga-1 mt-3 align-center">
						<v-icon icon="mdi-attachment"></v-icon>
						<p style="color: #221943; font-weight: 400">
							<a :href="backendUrl + '/' + dataDetail.proyek.lokasi_dokumen"
								target="_blank">Download Dokumen</a>
						</p>
					</div>
				</div>
				<v-skeleton-loader v-else type="list-item, list-item"></v-skeleton-loader>
			</TheVCol>
			<TheVCol md="4">
				<TheVRow class="d-flex flex-column outline mt-5 mb-5">
					<h6>Detail Project</h6>

					<!-- budget -->
					<div class="mt-5 mb-3" v-if="dataLoaded">
						<p>Budget</p>
						<p style="color: #221943">Rp. {{ dataDetail.proyek.anggaran }}</p>
					</div>
					<v-skeleton-loader v-else type="text"></v-skeleton-loader>

					<!-- estimasi -->
					<div v-if="dataLoaded">
						<p>Tanggal Tenggat</p>
						<p style="color: #221943">{{ dataDetail.proyek.tanggal_tegat }}</p>
					</div>
					<v-skeleton-loader v-else type="text"></v-skeleton-loader>
				</TheVRow>
				<TheVRow class="d-flex flex-column outline">
					<h6>Tentang Controllers</h6>

					<!-- rate -->
					<div class="mt-5 mb-3" v-if="dataLoaded">
						<p>Project Rate</p>
						<p style="color: #221943">{{ dataDetail.controller.completion_rate }}%</p>
					</div>
					<v-skeleton-loader v-else type="text"></v-skeleton-loader>

					<!-- expertise -->
					<div class="mb-3" v-if="dataLoaded">
						<p>Expertise</p>
						<v-chip v-for="(item, index) in controllerSpesialisasi" :key="index" class="minichip">
							{{ item }}
						</v-chip>
					</div>
					<v-skeleton-loader v-else type="chip, chip, chip"></v-skeleton-loader>

					<!-- profile info -->
					<div class="mt-5" v-if="dataLoaded">
						<p>Profile</p>
						<div class="d-flex align-center ga-2">
							<p style="color: #221943">Lihat Profile</p>
							<v-icon icon="mdi-open-in-new" color="#221943"></v-icon>
						</div>
					</div>
					<v-skeleton-loader v-else type="text"></v-skeleton-loader>
				</TheVRow>
			</TheVCol>
		</TheVRow>
	</v-container>
</template>

<script setup>
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheButton from "@/components/common/TheButton.vue";
import { useRoute } from 'vue-router';
import { useProjectStore } from "@/store/project";
import { onMounted, ref } from "vue";
import { useSnackbarStore } from "@/store/snackbar";
import router from "@/router";
import { useProfileStore } from "@/store/profile";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();
const projectStore = useProjectStore();
const profileStore = useProfileStore();
const snackbarStore = useSnackbarStore();

const dataDetail = ref('');
const dataLoaded = ref(false);

const controllerSpesialisasi = ref([]);
const proyekSpesialisasi = ref([]);

onMounted(async () => {
	const idProyek = route.params.id;
	await projectStore.getProjectDetail(idProyek);

	const dataProjectDetail = projectStore.dataProjectDetail;

	dataDetail.value = dataProjectDetail;

	// Parse spesialisasi for both controller and project
	controllerSpesialisasi.value = JSON.parse(dataDetail.value.controller.spesialisasi);
	proyekSpesialisasi.value = JSON.parse(dataDetail.value.proyek.spesialisasi);

	dataLoaded.value = true;
});

const applyProject = async () => {
	const idProyek = route.params.id;
	const pesan = await projectStore.applyProject(idProyek);
	snackbarStore.showSnackbar({
		message: 'Berhasil Mendaftar',
		timeout: 5000,
		type: "success"
	});
	router.push('/creative-hub-team/progress')
}

const back = () => {
	router.push('/creative-hub-team/progress')
}
</script>


<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

/* typography */
h4,
h5 {
	color: var(--primary-purple-100, var(--primary-purple, #221943));
}

h4 {
	font-size: 31px;
}

h5 {
	font-size: 25px;
}

h6,
p {
	color: var(--secondary-desc-color, rgba(34, 25, 67, 0.2));
}

h6 {
	font-size: 20px;
}

p {
	font-size: 16px;
	font-weight: 700;
}

.box {
	width: 70vw;
	margin: auto;
}

.outline {
	padding: 30px 25px;
	border-radius: 10px;
	border: 1px solid var(--primary-gray, #b2adff);
}

.chip,
.minichip {
	height: 27px;
	margin-right: 5px;
	border-radius: 15px;
	font-weight: 600;
	border: 1px solid var(--stroke-100, rgba(123, 97, 220, 0.25));
	background: var(--primary-purple-10, #f7f4ff);
}

.minichip {
	height: 22px;
	margin-right: 5px;
	font-size: 10px;
}
</style>
