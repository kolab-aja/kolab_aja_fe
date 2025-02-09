<template>
	<v-app>
		<TheSidebar active-at="/controller/progress" navbarTitle="Pengaturan Project">
			<v-row>
				<v-col cols="12" md="8">
					<slot name="center">
						<v-tabs v-model="activeTab" background-color="transparent" color="orange">
							<v-tab value="invite-request">
								<v-icon left>mdi-email-open-outline</v-icon>
								Invite Request
							</v-tab>
							<v-tab value="project-setup">
								<v-icon left>mdi-cog</v-icon>
								Project Setup
							</v-tab>
							<v-tab value="on-going">
								<v-icon left>mdi-sync</v-icon>
								On Going
							</v-tab>
						</v-tabs>
					</slot>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						density="compact"
						placeholder="Cari Team"
						prepend-inner-icon="mdi-magnify"
						rounded
						variant="outlined"
					></v-text-field>
				</v-col>
			</v-row>

			<v-divider class="custom-divider"></v-divider>

			<v-tabs-window v-model="activeTab">

				<InviteRequest :list-data="inviteRequestItems"/>
				<ProjectSetup :fetch-table-data-func="FetchTableData" :list-data="projectSetupItems"/>
				<onGoing :list-data="projectOnGoing	"/>
			</v-tabs-window>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import TheSidebar from "@/components/controller/TheSidebar.vue";
import {useProjectListStore} from '@/store/projectList';
import InviteRequest from '@/utils/controller/progress-page/invite-request/invite-request.vue';
import ProjectSetup from '@/utils/controller/progress-page/project-setup/project-setup.vue';
import onGoing from '@/utils/controller/progress-page/on-going/on-going.vue';

const activeTab = ref('invite-request');
const projectListStore = useProjectListStore();

const inviteRequestItems = ref([])
const projectSetupItems = ref([])
const projectOnGoing = ref([])

onMounted(async () => {
	FetchTableData();
})

const FetchTableData = async () => {
	try {
		await projectListStore.getProjectList();
		inviteRequestItems.value = projectListStore.data.setup.filter(project => {
			return project.proyek_id_status_proyek == "1" && project.status_terima_proyek == "0"
		})
		;
		projectSetupItems.value = projectListStore.data.setup.filter(project =>
			project.proyek_id_status_proyek == "1" || project.proyek_id_status_proyek == "2" || project.proyek_id_status_proyek == "3"
		);
		projectOnGoing.value = projectListStore.data.setup.filter(project =>
			project.proyek_id_status_proyek == "4"
		);
	} catch (error) {}
}
</script>

<style scoped>
.custom-divider {
	margin: 2rem 0;
}

</style>
