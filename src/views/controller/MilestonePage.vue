<template>
	<v-app>
		<TheSidebar active-at="/controller/milestone" navbarTitle="Pantau Project">

			<!-- Header Section -->
			<v-row>
				<v-col cols="12" md="8" class="d-flex align-center">
					<h2>Aktivitas Project</h2>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						prepend-inner-icon="mdi-magnify"
						placeholder="Cari Team"
						variant="outlined"
						density="compact"
						rounded
					></v-text-field>
				</v-col>
			</v-row>

			<v-divider class="custom-divider"></v-divider>

			<!-- Data Table -->
			<v-data-table :items="data" :headers="headers" item-class="data-table-row">
				<template v-slot:item="{ item }">
					<tr v-on:click="detailMilestone(item.proyek_id)" @mouseover="" @mouseleave="">
						<td class="padded-td">
							<div class="flex-center">
								<img :src="profileImage" alt="Profile Image" class="profile-picture"> {{ item.team_nama }}
							</div>
						</td>
						<td class="padded-td">{{ item.proyek_judul_proyek }}</td>
						<td class="padded-td">{{ item.proyek_perkembangan }}%</td>
						<td class="padded-td">{{ formatDate(item.proyek_tanggal_tegat) }}</td>
						<td class="padded-td">{{ formatRupiah(item.proyek_anggaran) }}</td>
					</tr>
				</template>
			</v-data-table>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import profileImage from '@/assets/images/let-him-cook.jpg';
import TheSidebar from "@/components/controller/TheSidebar.vue";
import formatDate from '@/lib/formatDate';
import { useProjectListStore } from '@/store/projectList';
import { onMounted, ref } from 'vue';
import router from "@/router";

const headers = [
	{ title: "Team" },
	{ title: "Project" },
	{ title: "Project" },
	{ title: "Deadline" },
	{ title: "Amount" }
]

function detailMilestone (id) {
	router.push('/controller/detail-milestone/' + id)
}

function formatRupiah(amount) {
	const formatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	});
	return formatter.format(amount).replace(",00", ",-");
}

const projectListStore = useProjectListStore();

const data = ref([])

onMounted( async () => {
	try {
		await projectListStore.getProjectList();
		data.value = projectListStore.data.ongoing;
	} catch(error) {}
})

</script>

<style scoped>
.custom-divider {
	margin: 2rem 0;
}

.flex-center {
	display: flex;
	align-items: center;
}

.padded-td {
	padding: 8px;
}

.profile-picture {
	width: 36px !important;
	height: 36px !important;
	border-radius: 50%;
	margin-right: 10px;
	border: 1px solid #8A76D4;
}

tr {
	cursor: pointer; /* Makes the row look clickable */
	transition: background-color 0.2s ease-in-out;
}

tr:hover {
	background-color: rgba(0, 0, 0, 0.1); /* Slightly darker background on hover */
}
</style>
