<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/progress" navbarTitle="Pengaturan Project">

			<!-- Header Section -->
			<v-row>
				<v-col cols="12" md="8">
					<slot name="center">
						<v-tabs v-model="activeTab" background-color="transparent" color="orange">
							<v-tab value="project-setup">
								<v-icon left>mdi-cog</v-icon> Project Setup
							</v-tab>
							<v-tab value="on-going">
								<v-icon left>mdi-sync</v-icon> On Going
							</v-tab>
						</v-tabs>
					</slot>
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
			<v-window v-model="activeTab">
				<ProjectSetup :list-data="projectSetupItems" />
				<OnGoing :list-data="projectOngoingItems" />
			</v-window>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import ProjectSetup from '@/utils/creative-hub-team/project-setup.vue';
import OnGoing from "@/utils/creative-hub-team/on-going.vue";
import { useProjectListStore } from '@/store/projectList';
import { useSnackbarStore } from "@/store/snackbar";

const activeTab = ref('project-setup');
const projectListStore = useProjectListStore();
const projectSetupItems = ref([])
const projectOngoingItems = ref([])

onMounted(async () => {
	try {
		await projectListStore.getProjectList();
		projectSetupItems.value = projectListStore.data.setup
		projectOngoingItems.value = projectListStore.data.ongoing
	} catch (error) {
		const snackbarStore = useSnackbarStore();
		snackbarStore.showSnackbar({
			message: error.response.data.errors,
			timeout: 5000,
		});
	}
})
</script>

<style scoped>
.custom-divider {
	margin: 2rem 0;
}
</style>
