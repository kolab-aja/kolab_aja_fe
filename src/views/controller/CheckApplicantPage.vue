<template>
	<v-container>
		<TheVRow>
			<TheVCol>
				<v-img src="@/assets/images/logo-kolab-aja.png" alt="Kolab Aja Logo" contain max-width="9rem"></v-img>
			</TheVCol>
			<TheVCol class="d-flex align-center ga-3 justify-end">
				<v-avatar size="36" image="@/assets/images/default-profile-picture.png"></v-avatar>
				<p style="color: #221943">{{ profileStore.data ? profileStore.data.data_pengguna.nama : 'New User' }}</p>
			</TheVCol>
		</TheVRow>
		<v-container class="form-container d-flex justify-center" style="margin-top: 40px">
			<TheVRow class="mx-auto" style="max-width: 1200px; margin-bottom: 150px">
				<TheVCol cols="12">
					<TheButton size="icon-l" type="primary-icon-1" icon="mdi-arrow-left" @click="back"/>
				</TheVCol>
				<TheVCol cols="12" style="margin-top: 30px">
					<h3>Overview</h3>
				</TheVCol>
				<TheVCol cols="8">
					<h1>{{ detailProject.proyek?.judul_proyek }}</h1>
					<br>
					<p v-html="detailProject.proyek?.deskripsi_proyek"></p>
				</TheVCol>
				<TheVCol cols="4" style="margin-top: 30px">
					<v-card style="padding: 10px 10px; outline: 1px solid #b2adff">
						<v-card-title>Detail Project</v-card-title>
						<v-card-text class="ga-5">
							<div>Budget</div>
							<div class="black-text mb-4">{{ formatCurrency(detailProject.proyek?.anggaran) }}</div>
							<div>Tanggal Tenggat</div>
							<p style="color: #221943">{{ detailProject.proyek.tanggal_tegat }}</p>
						</v-card-text>
					</v-card>
				</TheVCol>
				<TheVCol cols="12" style="margin-top: 30px">
					<h3>Kebutuhan Skill</h3>
					<div v-for="skill in detailProject.proyek?.spesialisasi" :key="skill">
						<v-chip outlined color="primary" class="my-1">
							{{ skill }}
						</v-chip>
					</div>
				</TheVCol>

				<TheVCol cols="12" style="margin-top: 30px">
					<h3>Dokumen Lainnya</h3>
					<div class="d-flex align-center">
						<a :href="`https://rest.kolabaja.cloud/${detailProject.proyek?.lokasi_dokumen}`">Dokumen</a>
					</div>
				</TheVCol>

				<TheVCol cols="12" style="margin-top: 30px">
					<h3>Project Applications</h3>
					<br>
					<!-- Check if there are no applications -->
					<div v-if="detailProject.lamaran_proyek.length === 0" class="text-center">
						<p>Tidak ada pendaftaran</p>
					</div>
					<!-- Render application cards if applications are available -->
					<v-row v-else>
						<v-col v-for="(application, index) in detailProject.lamaran_proyek" :key="index" cols="12"
							md="6">
							<v-card class="mx-auto"
								style="max-width: 800px; padding: 15px 20px; outline: 1px solid #b2adff; border-radius: 10px">
								<v-row no-gutters>
									<v-col cols="2">
										<v-avatar size="86"
											:src="`https://example.com/path-to-image/${application.cha_id}.jpg`"></v-avatar>
									</v-col>
									<v-col cols="9">
										<v-card-title class="d-flex justify-space-between align-center">
											<span>{{ application.team_nama }}</span>
										</v-card-title>
										<v-card-subtitle class="d-flex align-center">
											<v-icon>mdi-home</v-icon>
											<span>{{ application.team_lokasi }}</span>
										</v-card-subtitle>
									</v-col>
								</v-row>
								<v-divider class="custom-divider"></v-divider>
								<v-card-text class="d-flex align-center">
									<v-row class="d-flex justify-space-between align-center">
										<v-col class="d-flex">
											<!-- Add any additional information if needed -->
										</v-col>
										<v-col class="d-flex justify-end ga-4">
											<TheButton size="icon-l" type="primary-icon-2" icon="mdi-check"
												@click="acceptApplication(application.team_id)" />
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</TheVCol>
			</TheVRow>
		</v-container>
	</v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/layouts/default/Navbar.vue';
import TheButton from '@/components/common/TheButton.vue';
import TheVRow from '@/components/common/TheVRow.vue';
import TheVCol from '@/components/common/TheVCol.vue';
import { useRouter, useRoute } from 'vue-router';
import { useProjectStore } from '@/store/project';
import { useSnackbarStore } from '@/store/snackbar';
import {useProfileStore} from "@/store/profile";

const detailProject = ref({ proyek: {}, lamaran_proyek: [] });
const router = useRouter();
const route = useRoute();
const projectStore = useProjectStore();
const snackbarStore = useSnackbarStore();
const profileStore = useProfileStore();

onMounted(async () => {
	const idProyek = route.params.id;
	try {
		await projectStore.getProjectDetail(idProyek);
		detailProject.value = projectStore.dataProjectDetail;
		if (detailProject.value.proyek && detailProject.value.proyek.spesialisasi) {
			detailProject.value.proyek.spesialisasi = JSON.parse(detailProject.value.proyek.spesialisasi);
		}
	} catch (error) {
		console.error('Failed to fetch project details', error);
	}
});

const back = () => {
	router.push('/controller/progress');
};

const formatCurrency = (value) => {
	return `Rp. ${Number(value).toLocaleString()}`;
};

const acceptApplication = async (idTeam) => {
	const idProyek = route.params.id;
	await projectStore.acceptTeamProject({
		'id_user': idTeam,
		'id_proyek': idProyek
	});
	snackbarStore.showSnackbar({
		message: 'Berhasil Mengundang Team',
		timeout: 5000,
		type: "success"
	});
	router.push('/controller/progress');
}
</script>

<style scoped>
.custom-divider {
	margin: 2rem 0;
	border-top: 2px solid;
}

.stats-wrapper {
	outline: 1px solid #b2adff;
	padding: 20px;
	border-radius: 16px;
}

.black-text {
	color: black;
	font-size: 20px;
	font-weight: bold;
}

.custom-divider {
	margin: 1rem 0 0 0;
	border-top: 2px solid;
}
</style>
