<template>
	<v-window-item value="on-going">
		<v-data-table :items="props.listData" :headers="headers" item-class="data-table-row">
			<template v-slot:item="{ item }">
				<tr v-on:click="detailMilestone(item.proyek_id)">
					<td>
						<div class="d-flex flex-row align-center">
							<img :src="item.team_nama ? profileImage : defaultImage" alt="Profile Image" class="profile-picture"> {{ item.team_nama ? item.team_nama : "-" }}
						</div>
					</td>
					<td>{{ item.proyek_judul_proyek }}</td>
					<td>{{ item.proyek_perkembangan }}%</td>
					<td>{{ item.proyek_tanggal_tegat }}</td>
					<td>{{ formatRupiah(item.proyek_anggaran) }}</td>
				</tr>
			</template>
		</v-data-table>
	</v-window-item>
</template>

<script setup>
import profileImage from '@/assets/images/let-him-cook.jpg';
import defaultImage from '@/assets/images/defaultProfile.png';
import formatRupiah from "@/lib/formatRupiah";
import router from "@/router";

const props = defineProps({
	listData: {
		type: Array,
		required: false
	}
})

const headers = [
	{ title: "Team" },
	{ title: "Project" },
	{ title: "Progress" },
	{ title: "Deadline" },
	{ title: "Amount" }
]

function detailMilestone (id) {
	router.push('/client/detail-milestone/' + id)
}
</script>

<style scoped>

.profile-picture {
	width: 36px !important;
	height: 36px !important;
	border-radius: 50%;
	margin-right: 10px;
	border: 1px solid #8A76D4;

}

</style>
