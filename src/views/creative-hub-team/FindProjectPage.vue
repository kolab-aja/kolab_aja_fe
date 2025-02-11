<template>
	<v-app>
		<Navbar custom-color="white"></Navbar>
		<v-container fluid style="padding: 0px">
			<TheVRow class="d-flex flex-column align-center nocth" style="padding: 100px 70px">
				<h2 style="color: white; font-size: 35px">Temukan Projectmu</h2>
				<TheVCol class="d-flex align-center justify-center ga-3 mt-3">
					<TheVCol max-width="800">
						<TheInput prepend-inner-icon="mdi-search-web" placeholder="Cari project" bg-color="white"
							v-model="keyword" style="height: 50px" />
					</TheVCol>
					<TheButton size="s" type="primary" @click="filterAction()" style="width: 90px">
						Cari
					</TheButton>
				</TheVCol>
			</TheVRow>

			<TheVRow style="margin: 20px 130px">
				<TheVCol class="d-flex align-start">
					<TheButton size="L" type="secondary" @click="goBack" style="width: 90px">
						Back
					</TheButton>
				</TheVCol>
			</TheVRow>

			<!-- Card Section -->
			<TheVRow style="margin: 60px 130px">
				<!-- Filter Section -->
				<TheVCol md="3" class="pr-10">
					<p class="fill-card" style="font-size: 16px">Budget</p>
					<v-checkbox multiple id="anggaran_semua" label="Semua" @click="checkBoxSemuaAction('anggaran')"
						v-model="anggaran" value="%" class="check"></v-checkbox>
					<v-checkbox multiple id="anggaran" @click="checkBoxSingleAction('anggaran')" label="< 50k"
						v-model="anggaran" value="50000|lte" class="check"></v-checkbox>
					<v-checkbox multiple id="anggaran" @click="checkBoxSingleAction('anggaran')" label="50k - 300k"
						v-model="anggaran" value="50000|hayo|300000" class="check"></v-checkbox>
					<v-checkbox multiple id="anggaran" @click="checkBoxSingleAction('anggaran')" label="> 300k"
						v-model="anggaran" value="300000|gte" class="check"></v-checkbox>
					<v-divider class="custom-divider"></v-divider>

					<!-- Bagian Spesialisasi hanya tampil jika device bukan mobile -->
					<template v-if="!smAndDown">
						<p class="fill-card" style="font-size: 16px">Spesialisasi</p>
						<v-checkbox multiple id="spesialisasi_semua" label="Semua"
							@click="checkBoxSemuaAction('spesialisasi')" v-model="spesialisasi" value="%"
							class="check"></v-checkbox>
						<v-checkbox multiple id="spesialisasi" v-for="filter in filterSpesialisasi" :key="filter.nama"
							:label="filter.nama" @click="checkBoxSingleAction('spesialisasi')" v-model="spesialisasi"
							:value="filter.nama" class="check"></v-checkbox>
						<v-divider class="custom-divider"></v-divider>
					</template>

					<TheButton size="s" type="primary" @click="filterAction()" style="width: 70px">
						Filter
					</TheButton>
				</TheVCol>

				<TheVCol md="9" class="pl-5">
					<!-- Jika tidak ada project -->
					<div v-if="items.length === 0" class="text-center">
						<p>Belum ada project</p>
					</div>
					<!-- Render project cards jika data tersedia -->
					<v-card v-else variant="text" v-for="item in items" :key="item.proyek_id">
						<v-card-title class="d-flex">
							<TheVCol md="1">
								<v-avatar size="80" image="@/assets/images/default-profile-controller.png"
									style="border: 2px solid #8a76d4" />
							</TheVCol>
							<TheVRow class="d-flex flex-column ml-9">
								<TheVCol class="d-flex justify-space-between">
									<TheVCol>
										<p class="fill-card">{{ item.controller_nama }}</p>
										<h5 style="font-size: 23px">{{ item.proyek_judul_proyek }}</h5>
									</TheVCol>
									<p class="fill-card">
										Budget: {{ item.proyek_anggaran ? `Rp.${item.proyek_anggaran}` : 'N/A' }}
									</p>
								</TheVCol>
								<TheVCol class="d-flex align-center ga-1">
									<v-icon icon="mdi-map-marker" size="s"></v-icon>
									<p class="fill-card" style="font-weight: 400">
										{{ item.controller_lokasi }}
									</p>
								</TheVCol>
							</TheVRow>
						</v-card-title>
						<v-card-text style="padding: 0px 16px;">
							<div id="app">
								<!-- Tampilkan proyek_deskripsi_proyek yang telah dipangkas jika panjang -->
								<div
									v-html="item.proyek_deskripsi_proyek ? truncateText(item.proyek_deskripsi_proyek, 500) : 'No details available'">
								</div>
							</div>
							<div>
								<v-chip class="fill-card chip" v-for="chip in item.proyek_spesialisasi" :key="chip">
									{{ chip }}
								</v-chip>
							</div>
						</v-card-text>
						<v-card-actions class="mt-2" style="padding: 0px 16px">
							<TheVCol>
								<p></p>
							</TheVCol>
							<TheVCol class="d-flex align-center justify-end ga-3">
								<TheButton size="icon-l" type="primary-icon-2" icon="mdi-bookmark-outline" />
								<TheButton size="l" type="primary" @click="goToDetail(item.proyek_id)">
									Apply
								</TheButton>
							</TheVCol>
						</v-card-actions>
					</v-card>
				</TheVCol>
			</TheVRow>
		</v-container>
	</v-app>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjectListStore } from "@/store/projectList";
import { useProjectStore } from "@/store/project";
import { useDisplay } from "vuetify";
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheInput from "@/components/common/TheInput.vue";
import TheButton from "@/components/common/TheButton.vue";
import Navbar from "@/layouts/default/Navbar.vue";

const { smAndDown } = useDisplay();

const route = useRoute();
const router = useRouter();
const projectListStore = useProjectListStore();
const projectStore = useProjectStore();

const keyword = ref("");
const anggaran = ref([]);
const spesialisasi = ref([]);
const filterSpesialisasi = ref([
	{ nama: "asda" }
]);

onMounted(async () => {
	filterAction();
});

const props = defineProps({
	items: Array
});

const idProject = route.params.id;
const params = {};

function goToDetail(id) {
	router.push({
		path: `/creative-hub-team/find-project-detail/${id}`,
	});
}

const goBack = () => {
	router.push({
		path: `/creative-hub-team/progress`,
	});
};

// Dummy data for example
const items = ref([]);

function checkBoxSemuaAction(filterType) {
	if (filterType == "anggaran") {
		if (anggaran.value.includes("%")) {
			anggaran.value = [];
		} else {
			anggaran.value = ["50000|lte", "50000|hayo|300000", "300000|gte"];
		}
	}

	if (filterType == "spesialisasi") {
		if (spesialisasi.value.includes("%")) {
			spesialisasi.value = [];
		} else {
			spesialisasi.value = filterSpesialisasi.value.map((x) => x.nama);
		}
	}
}

function checkBoxSingleAction(filterType) {
	if (filterType == "anggaran") {
		if (anggaran.value.includes("%")) {
			let index = anggaran.value.indexOf("%");
			if (index != -1) {
				anggaran.value.splice(index, 1);
			}
		}
	}

	if (filterType == "spesialisasi") {
		if (spesialisasi.value.includes("%")) {
			let index = spesialisasi.value.indexOf("%");
			if (index != -1) {
				spesialisasi.value.splice(index, 1);
			}
		}
	}
}

function getFilter() {
	params.value = {};
	if (keyword.value != "") {
		params.value["keyword"] = keyword.value;
	}
	if (anggaran.value != null) {
		if (
			Object.keys(anggaran.value).length &&
			!anggaran.value.includes("%")
		) {
			params.value["anggaran"] = anggaran.value;
		}
	}
	if (spesialisasi.value != null) {
		if (
			Object.keys(spesialisasi.value).length &&
			!spesialisasi.value.includes("%")
		) {
			params.value["spesialisasi"] = spesialisasi.value;
		}
	}
}

async function filterAction() {
	getFilter();
	await projectListStore.getProjectList(params.value, 0);
	items.value = projectListStore.data.setup;
	filterSpesialisasi.value = projectListStore.data.filter_spesialisasi;
}

// Fungsi untuk memotong teks jika terlalu panjang
function truncateText(text, limit) {
	if (text.length > limit) {
		return text.substring(0, limit) + '...';
	}
	return text;
}
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.navbar {
	position: sticky;
	top: 0;
	width: 100%;
	z-index: 1000;
	background: linear-gradient(0deg,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(0, 0, 0, 0.2) 100%),
		linear-gradient(0deg,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(0, 0, 0, 0.2) 100%),
		var(--primary-purple, #221943);
}

.nocth {
	border-radius: 0px 0px 20px 20px;
	background: linear-gradient(0deg,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(0, 0, 0, 0.2) 100%),
		linear-gradient(0deg,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(0, 0, 0, 0.2) 100%),
		var(--primary-purple, #221943);
}

.card {
	height: 25vh;
}

.fill-card {
	font-size: 13px;
	font-weight: 700;
}

.chip {
	height: 27px;
	margin-right: 5px;
	border-radius: 15px;
	border: 1px solid var(--stroke-100, rgba(123, 97, 220, 0.25));
	background: var(--primary-purple-10, #f7f4ff);
}

.check {
	height: 2rem !important;
	font-weight: 400 !important;
}

.custom-divider {
	margin: 2rem 0;
}
</style>
