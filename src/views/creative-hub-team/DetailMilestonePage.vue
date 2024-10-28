<template>
	<v-app>
		<v-container>
			<TheVCol>
				<v-img src="@/assets/images/logo-kolab-aja.png" alt="Kolab Aja Logo" contain max-width="10rem"></v-img>
			</TheVCol>
			<TheVRow class="d-flex flex-column justify-center mt-10 box">
				<TheButton size="icon-l" type="primary-icon-1" icon="mdi-arrow-left" class="mb-10 spacing" @click="back"/>
				<TheVRow class="d-flex align-center spacing">
					<TheVCol md="10">
						<div class="d-flex align-center ga-3">
							<v-avatar size="50" image="@/assets/images/default-profile-team.png"
									  style="border: 2px solid #8a76d4"/>
							<p style="font-weight: 400">
								{{ items.team_nama }}
							</p>
						</div>
						<div>
							<h3 class="mt-2">
								{{ items.proyek_judul_proyek }}
							</h3>
						</div>
					</TheVCol>
					<TheVCol md="2" class="text-right">
						<TheButton suffix-icon="mdi-open-in-new" size="text-icon-m" style="
								height: 55px !important;
								font-size: 16px !important;
							">Detail Project
						</TheButton>
					</TheVCol>

					<v-divider class="custom-divider"></v-divider>

					<TheVRow>
						<TheVCol md="8">
							<TheVRow v-for="milestone in milestoneList" :key="milestone.id">
								<TheVCol md="1">
									<div class="number">{{ milestone.milestone_counter }}</div>
								</TheVCol>
								<TheVCol md="10" class="ml-2 mr-2 mb-8">
									<div>
										<h6 style="font-weight: 400">
											{{ milestone.milestone_topik }}
										</h6>
										<div class="mt-2">
											<v-chip v-if="milestone.milestone_status == 3" class="mr-1 accepted"
													size="small">accepted
											</v-chip>
											<v-chip v-if="milestone.milestone_status == 4" class="paid" size="small">
												paid
											</v-chip>
										</div>
										<p class="desc mt-3 mb-5">
											{{ milestone.milestone_deskripsi }}
										</p>
										<div class="precentage" style="
												font-weight: 600;
												font-size: 17px;
											">
											{{ milestone.milestone_persentase }}% | Rp. {{ milestone.payment }}
										</div>
										<div class="d-flex align-center ga-2 mt-2">
											<v-icon icon="mdi-calendar-month" size="large" color="#b8b8b8"></v-icon>
											<p class="desc" style="
													font-weight: 400;
													font-size: 17px;
												">
												{{ milestone.milestone_tanggal_tegat }}
											</p>
										</div>
										<v-textarea v-if="!(userRole == 'creative-hub-team' && milestone.milestone_status == 1)" class="resultLog mt-7 desc"
													style="padding: 20px 20px 20px 20px; font-family: 'Outfit', sans-serif;"
													bg-color="#fff"
													v-model="milestone.milestone_info_perkembangan"
													hide-details="true" disabled/>
										<v-textarea v-if="userRole == 'creative-hub-team' && milestone.milestone_status == 1" class="resultLog mt-7 desc"
													style="padding: 20px 20px 20px 20px; font-family: 'Outfit', sans-serif;"
													bg-color="#fff"
													v-model="milestone.milestone_info_perkembangan"
													hide-details="true"/>
										<div class="link-disabled mt-3">
											<a class="desc" :href="milestone.milestone_tautan" target="_blank">
												{{ milestone.milestone_tautan }}
											</a>
										</div>
										<TheButton
											v-if="userRole == 'creative-hub-team' && milestone.milestone_status == 1"
											class="mt-2"
											@click="selesaiAction(milestone.milestone_id, milestone.milestone_info_perkembangan)">
											Selesai
										</TheButton>
										<TheButton v-if="userRole == 'controller' && milestone.milestone_status == 3"
												   class="mt-2"
												   @click="bayarAction(milestone.milestone_id)">
											Bayar
										</TheButton>
										<TheButton v-if="userRole == 'client'  && milestone.milestone_status == 2"
												   class="mt-2"
												   @click="acceptAction(milestone.milestone_id)">
											Accept
										</TheButton>
									</div>
								</TheVCol>
							</TheVRow>
						</TheVCol>
						<v-divider class="mr-10" vertical></v-divider>
						<TheVCol md="3">
							<h6>Tentang Project</h6>
							<div class="mt-7">
								<p class="secondaryP">Project Price</p>
								<h6 style="font-weight: 400">Rp. {{ items.proyek_anggaran }}</h6>
							</div>
							<div class="mt-7">
								<p class="secondaryP">Tanggal Tenggat</p>
								<h6 style="font-weight: 400">{{ items.proyek_tanggal_tegat }}</h6>
							</div>
							<h6 class="mt-10">Progression</h6>
							<div>
								<v-progress-linear v-model="skill" color="var(--secondary--purple, #46377D);"
												   height="25" class="mt-5" rounded="true" rounded-bar="true"
												   :buffer-value="items.proyek_perkembangan" buffer-color="#46377D"
												   buffer-opacity="1">
									<template v-slot:default="">
										<strong>{{ Math.ceil(items.proyek_perkembangan) }}%</strong>
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
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheButton from "@/components/common/TheButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useProjectStore} from "@/store/project";
import {defineProps, onMounted, ref} from "vue";
import {useMilestoneListStore} from "@/store/milestoneList";
import {useAuthStore} from "@/store/auth";

const route = useRoute();
const router = useRouter();
const milestoneListStore = useMilestoneListStore();
const projectStore = useProjectStore();
const authStore = useAuthStore();

const userRole = ref()
userRole.value = authStore.userRoles;

onMounted(async () => {
	getMilestoneAction();
});

const back = () => {
	router.back();
};

const props = defineProps({
	items: Array
});

const idProject = route.params.id;

// Dummy data for example
const items = ref([
	{
		proyek_id: 1,
		team_id: 1,
		team_nama: 'Hayo Tidak Jalan Apinya',
		proyek_judul_proyek: "Photographers Management",
		proyek_anggaran: "500k",
		proyek_tanggal_tegat: "2024-01-01",
		proyek_perkembangan: 0,
	},
]);

const milestoneList = ref([
	{
		milestone_counter: 1,
		milestone_id: 1,
		milestone_topik: "Hayo Api Gak Jalan",
		milestone_deskripsi: "Hayo Api Gak Jalan",
		milestone_persentase: 100,
		milestone_tanggal_tegat: "2024-01-01",
		payment: 1000000,
		milestone_status: 1,
		milestone_info_perkembangan: "Hayo William Buat Api Down",
		milestone_tautan: "https://www.youtube.com/watch?v=M0cSIZ0wUio"
	}
]);

async function getMilestoneAction() {
	await milestoneListStore.getMilestoneList({
		id_proyek: idProject
	});
	items.value = milestoneListStore.data;
	milestoneList.value = milestoneListStore.data.milestone;
	for (let i = 0; i < milestoneList.value.length; i++) {
		milestoneList.value[i].milestone_counter = i + 1
		milestoneList.value[i].milestone_info_perkembangan = ref(milestoneList.value[i].milestone_info_perkembangan)
	}
}

async function selesaiAction(id_milestone, info_perkembangan) {
	await milestoneListStore.updateSelesaiMilestone({
		id_proyek: idProject,
		id_milestone: id_milestone,
		info_perkembangan: info_perkembangan
	});
	await getMilestoneAction();
}

async function bayarAction(id_milestone) {
	await milestoneListStore.updateTerbayarMilestone({
		id_proyek: idProject,
		id_milestone: id_milestone,
	});
	await getMilestoneAction();
}

async function acceptAction(id_milestone) {
	await milestoneListStore.updateAcceptMilestone({
		id_proyek: idProject,
		id_milestone: id_milestone,
	});
	await getMilestoneAction();
}
</script>
<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

/* typography */
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

/* spacing */
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

.number {
	width: 44px;
	height: 44px;
	padding: 10px 10px;
	font-size: 16px;
	font-weight: 700;
	text-align: center;
	border-radius: 500px;
	background: var(--primary-purple-10, #f7f4ff);
}

.accepted,
.paid {
	color: white;
	font-size: 12px;
}

.accepted {
	padding: 0px 20px;
	background: var(--primary-tosca, #19a598);
}

.paid {
	padding: 0px 30px;
	background: var(--primary-tosca-100, #016158);
}

.desc {
	color: var(--wireframe-ddd, var(--wireframe, #b8b8b8));
	font-size: 16px;
	font-weight: 400;
	line-height: 22.4px;
}

.precentage {
	color: var(--primary-purple-50, #8a76d4);
}

.resultLog,
.link-disabled,
.link-active {
	padding: 20px 20px 30px 20px;
	border-radius: 10px;
}

.resultLog {
	border: 1px solid var(--primary-gray, #dee4f0);
	background: #fff;
}

.link-disabled {
	border: 1px solid var(--wireframe, #b8b8b8);
	background: var(--wireframe, #b8b8b8);
}

.link-active {
	background: var(--primary-gray, #dee4f0);
}

.link-active a,
.link-disabled a {
	color: #000;
}
</style>
