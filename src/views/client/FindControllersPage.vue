<template>
	<v-app>
		<Navbar custom-color="white"></Navbar>
		<v-container fluid style="padding: 0px">
			<TheVRow class="d-flex flex-column align-center nocth" style="padding: 100px 50px">
				<h2 style="color: white; font-size: 35px">Rekomendasi Controllers</h2>
				<TheVCol class="d-flex align-center justify-center ga-3 mt-3">
					<TheVCol max-width="800">
						<TheInput prepend-inner-icon="mdi-search-web" placeholder="Cari project" bg-color="white"
							v-model="keyword" style="height: 50px" />
					</TheVCol>
					<TheButton size="s" type="primary" @click="filterAction()" style="width: 90px">Cari</TheButton>
				</TheVCol>
			</TheVRow>

			<TheVRow style="margin: 20px 130px">
				<TheVCol class="d-flex align-start">
					<TheButton size="L" type="secondary" @click="goBack" style="width: 90px">Back</TheButton>
				</TheVCol>
			</TheVRow>

			<!-- Cards Section -->
			<TheVRow style="margin: 60px 130px">
				<TheVCol md="3" class="pr-10">
					<p class="fill-card" style="font-size: 16px">Budget</p>
					<v-checkbox multiple=multiple id="anggaran_semua" label="Semua" @click="checkBoxSemuaAction('anggaran')" v-model="fee" value="%" class="check"></v-checkbox>
					<v-checkbox multiple=multiple id="anggaran" @click="checkBoxSingleAction('anggaran')" label="5%" v-model="fee" value="5|equ" class="check"></v-checkbox>
					<v-checkbox multiple=multiple id="anggaran" @click="checkBoxSingleAction('anggaran')" label="15%" v-model="fee" value="15|equ" class="check"></v-checkbox>
					<v-checkbox multiple=multiple id="anggaran" @click="checkBoxSingleAction('anggaran')" label="25%" v-model="fee" value="25|equ" class="check"></v-checkbox>
					<v-divider class="custom-divider"></v-divider>
					<p class="fill-card" style="font-size: 16px">Spesialisasi</p>
					<v-checkbox multiple=multiple id="spesialisasi_semua" label="Semua" @click="checkBoxSemuaAction('spesialisasi')" v-model="spesialisasi" value="%" class="check"></v-checkbox>
					<v-checkbox multiple=multiple id="spesialisasi" v-for="filter in filterSpesialisasi" :key="filter.nama" :label="filter.nama" @click="checkBoxSingleAction('spesialisasi')" v-model="spesialisasi" :value="filter.nama" class="check"></v-checkbox>
					<v-divider class="custom-divider"></v-divider>
					<TheButton size="s" type="primary" @click="filterAction()" style="width: 70px">Filter</TheButton>
				</TheVCol>
				<TheVCol md="9" class="pl-5">
					<v-card variant="text" v-for="item in items" :key="item.id_user">
						<v-card-title class="d-flex">
							<TheVCol md="1">
								<v-avatar size="80" image="@/assets/images/default-profile-controller.png"
									style="border: 2px solid #8a76d4" />
							</TheVCol>
							<TheVRow class="d-flex flex-column ml-9">
								<TheVCol class="d-flex justify-space-between">
									<h5 style="font-size: 23px">{{ item.nama }}</h5>
									<p class="fill-card">Budget: {{ item.fee ? `${item.fee} %` : 'N/A' }}</p>
								</TheVCol>
								<TheVCol class="d-flex align-center ga-1">
									<v-icon icon="mdi-map-marker" size="s"></v-icon>
									<p class="fill-card" style="font-weight: 400">{{ item.lokasi }}</p>
								</TheVCol>
							</TheVRow>
						</v-card-title>
						<v-card-text style="padding: 0px 16px;">
							<div id="app">
								<div v-html="item.profil_detail ? item.profil_detail : 'No details available'"></div>
							</div>
							<div>
								<v-chip class="fill-card chip" v-for="chip in item.spesialisasi" :key="chip">{{ chip
									}}</v-chip>
							</div>
						</v-card-text>
						<v-card-actions class="mt-2" style="padding: 0px 16px">
							<TheVCol>
								<p style="font-size: 13px"><strong>{{ item.projects_handled }}</strong> Handled Project | <strong>{{ item.completion_rate }}</strong>% Completion
								</p>
							</TheVCol>
							<TheVCol class="d-flex align-center justify-end ga-3">
								<TheButton size="icon-l" type="primary-icon-2" icon="mdi-bookmark-outline" />
								<TheButton size="l" type="primary" @click="goToDetail(item.id_user)">Apply</TheButton>
							</TheVCol>
						</v-card-actions>
					</v-card>
				</TheVCol>
			</TheVRow>
		</v-container>
	</v-app>
</template>
<script setup>
import { defineProps, ref, onMounted } from 'vue';
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheInput from "@/components/common/TheInput.vue";
import TheButton from "@/components/common/TheButton.vue";
import Navbar from "@/layouts/default/Navbar.vue";
import { useRouter, useRoute } from 'vue-router';
import { useControllerListStore } from "@/store/controllerList";
import { useProjectStore } from '@/store/project';

const route = useRoute();
const router = useRouter();
const controllerListStore = useControllerListStore();
const projectStore = useProjectStore();

const keyword = ref("");
const fee = ref([]);
const spesialisasi = ref([]);
const filterSpesialisasi = ref([
	{
		nama: "asda",
	},
]);

onMounted(async () => {
	filterAction();
});

const props = defineProps({
	items: Array
});

const idProject = route.params.id;

const params = {

};

function goToDetail(id) {
	projectStore.updateIdProject(idProject)
	router.push({ name: 'client-controller-detail', params: { id } });
}

const goBack = () => {
	router.push({
		path: `/client/progress`,
	});
}

// Dummy data for example
const items = ref([]);

function checkBoxSemuaAction(filterType) {
	if (filterType == "anggaran") {
		if (fee.value.includes('%')) {
			fee.value = [];
		} else {
			fee.value = [
				'5|equ',
				'15|equ',
				'25|equ'
			];
		}
	}

	if (filterType == "spesialisasi") {
		if (spesialisasi.value.includes('%')) {
			spesialisasi.value = [];
		} else {
			spesialisasi.value = filterSpesialisasi.value.map(x => x.nama);
		}
	}
}

function checkBoxSingleAction(filterType) {
	if (filterType == "anggaran") {
		if (fee.value.includes('%')) {
			let index = fee.value.indexOf('%');
			if (index != -1) {
				fee.value.splice(index, 1)
			}
		}
	}

	if (filterType == "spesialisasi") {
		if (spesialisasi.value.includes('%')) {
			let index = spesialisasi.value.indexOf('%');
			if (index != -1) {
				spesialisasi.value.splice(index, 1)
			}
		}
	}
}

function getFilter() {
	params.value = {};
	if (keyword.value != "") {
		params.value["keyword"] = keyword.value
	}
	if (fee.value != null) {
		if (Object.keys(fee.value).length && !fee.value.includes('%')
			// && fee.value.sort().join("") != ['5|equ', '15|equ', '25|equ'].sort().join("")
		) {
			params.value["fee"] = fee.value
		}
	}
	if (spesialisasi.value != null) {
		if (Object.keys(spesialisasi.value).length && !spesialisasi.value.includes('%')
			// && spesialisasi.value.join("") != filterSpesialisasi.value.map(x => x.nama).sort().join("")
		) {
			params.value["spesialisasi"] = spesialisasi.value
		}
	}
}

async function filterAction() {
	getFilter();
	await controllerListStore.getControllerList(params.value);
	items.value = controllerListStore.data.list_controller;
	filterSpesialisasi.value = controllerListStore.data.filter_spesialisasi;
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
		linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
		var(--primary-purple, #221943);
}

.nocth {
	border-radius: 0px 0px 20px 20px;
	background: linear-gradient(0deg,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(0, 0, 0, 0.2) 100%),
		linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
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
