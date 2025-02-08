<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-admin/my-team" navbar-title="Manajemen Team">
			<v-container>

				<v-row>
					<v-col cols="12" md="6">
						<slot name="center">
							<h1>Status</h1>
						</slot>
					</v-col>
					<v-col cols="12" md="4">
						<v-text-field prepend-inner-icon="mdi-magnify" placeholder="Cari Team" variant="outlined"
							density="compact" rounded></v-text-field>
					</v-col>
					<v-col>
						<TheButton size="m" @click="addTeamDialog = true">
							<v-icon left class="icon-spacing">mdi-plus</v-icon> Tambah Team
						</TheButton>
					</v-col>
				</v-row>

				<v-dialog v-model="addTeamDialog" persistent max-width="600px">
					<v-card>
						<v-card-title class="text-h5">
							<v-icon>mdi-account-plus</v-icon> Tambah Team
						</v-card-title>
						<v-divider></v-divider>
						<v-card-text>
							<TheInput v-model="form.email" dense label="Email" placeholder="Masukkan Email"></TheInput>
							<TheInput v-model="form.nama_team" dense label="Nama Team" placeholder="Masukkan Nama Team"></TheInput>
							<TheInput v-model="form.temp_password" dense label="Temp Password" placeholder="Masukkan Temp Password"></TheInput>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-spacer></v-spacer>
							<TheButton type="secondary" @click="addTeamDialog = false">Batal</TheButton>
							<TheButton @click="addTeam">Tambah</TheButton>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-divider class="custom-divider"></v-divider>

				<v-window>
					<v-window-item value="invite-request">
						<v-data-table v-if="!loading && items.length > 0" :items="items">
							<template v-slot:item="{ item }">
								<tr>
									<td>{{ item.akun }}</td>
									<td>{{ item["Team Name"] }}</td>
									<td class="padded-td">
										<span
											:class="{ 'activated-password': item['Temp Password'] === 'Sudah Aktivasi' }">{{
												item["Temp Password"] }}</span>
									</td>
									<td>
										<v-icon v-if="item.Action === 0" class="action-icon">mdi-delete-outline</v-icon>
									</td>
								</tr>
							</template>
						</v-data-table>
						<v-skeleton-loader v-else-if="loading" type="table"></v-skeleton-loader>
						<p v-else>Tidak ada data</p>
					</v-window-item>
				</v-window>
			</v-container>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import TheSidebar from "@/components/creative-hub-admin/TheSidebar.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheInput from "@/components/common/TheInput.vue";
import { onMounted, ref } from "vue";
import { useTeamStore } from "@/store/team";

const addTeamDialog = ref(false);
const loading = ref(true);
const items = ref([]);
const form = ref({
	email: '',
	nama_team: '',
	temp_password: ''
});

const teamStore = useTeamStore();

async function addTeam() {
	try {
		await teamStore.insertTeam(form.value);
		addTeamDialog.value = false;
		await teamStore.getTeam();
		items.value = (teamStore.data || []).map(item => ({
			akun: item.email,
			"Team Name": item.nama,
			"Temp Password": item.temp_password,
			Action: item.status_ganti_password === "1" ? 1 : 0,
		}));
	} catch (error) {
	}
}

onMounted(async () => {
	await teamStore.getTeam();

	items.value = (teamStore.data || []).map(item => ({
		akun: item.email,
		"Team Name": item.nama,
		"Temp Password": item.temp_password,
		Action: item.status_ganti_password === "1" ? 1 : 0,
	}));

	loading.value = teamStore.isLoading;
});
</script>

<style scoped>
.custom-divider {
	margin: 2rem 0;
}

.padded-td {
	padding: 8px;
}

.icon-spacing {
	margin-right: 8px;
}

.activated-password {
	background-color: #4DA298;
	border-radius: 8px;
	color: white;
	padding: 6px 12px;
	display: inline-block;
	min-width: 100px;
	text-align: center;
}

.action-icon {
	background-color: #BF4F60;
	border-radius: 20px;
	padding: 20px;
	color: white;
}
</style>