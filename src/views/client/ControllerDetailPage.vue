<template>
	<v-app>
		<v-container fluid style="max-width: 1200px; margin: auto;">
			<TheButton size="icon-l" type="primary-icon-1" icon="mdi-arrow-left" @click="back" />
			<TheVRow style="margin-top: 30px">
				<TheVCol class="d-flex align-center">
					<v-avatar
						style="width: 100px; height: 100px; border-radius: 50%; margin-right: 16px; outline: 2px solid #d4d1ff;">
						<img :src="profileImage" alt="Profile Image" height="100%">
					</v-avatar>
					<div>
						<h2>{{ item.nama }}</h2>
						<p class="description-text">{{ item.lokasi }}</p>
					</div>
				</TheVCol>
				<TheVCol cols="auto">
					<TheButton size="icon-l" type="primary-icon-2" icon="mdi-bookmark-outline" />
					<TheButton size="l" style="margin-left: 10px" @click="invite()">Invite</TheButton>
				</TheVCol>
			</TheVRow>

			<TheVRow class="stats-wrapper" style="margin-top: 30px">
				<v-row>
					<v-col cols="4">
						<div class="d-flex flex-column align-center">
							<span class="text-h6">Controller Fee</span>
							<span>{{ item.fee }} %</span>
						</div>
					</v-col>
					<v-col cols="4">
						<div class="d-flex flex-column align-center">
							<span class="text-h6">Handled Project</span>
							<span>{{ item.projects_handled }}</span>
						</div>
					</v-col>
					<v-col cols="4">
						<div class="d-flex flex-column align-center">
							<span class="text-h6">Completion</span>
							<span>{{ item.completion_rate }}%</span>
						</div>
					</v-col>
				</v-row>
			</TheVRow>

			<TheVRow class="ga-5" style="margin-top: 30px">
				<v-col cols="12">
					<h3>Detail Profile</h3>
					<br>
					<div v-html="item.profil_detail ? item.profil_detail : 'No details available'"></div>
					<v-divider class="custom-divider"></v-divider>
				</v-col>

				<v-col cols="12">
					<h3>Expertise</h3>
				</v-col>

				<v-col cols="12">
					<v-row>
						<v-col cols="auto" v-for="expertise in expertises" :key="expertise">
							<v-chip outlined color="primary" class="my-1">
								{{ expertise }}
							</v-chip>
						</v-col>
					</v-row>
				</v-col>
			</TheVRow>

		</v-container>
	</v-app>
</template>

<script setup>
import { onMounted, ref, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheButton from "@/components/common/TheButton.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import profileImage from "@/assets/images/let-him-cook.jpg";
import { useProfileStore } from '@/store/profile';
import { useProjectStore } from '@/store/project';
import { useSnackbarStore } from '@/store/snackbar';


const route = useRoute();
const router = useRouter();
const profileStore = useProfileStore()
const projectStore = useProjectStore()
const snackbarStore = useSnackbarStore()

const profileImagePath = ref(profileImage);

const item = ref('')
const expertises = ref('')
const id = route.params.id;

onMounted(async () => {
	await profileStore.getControllerProfile(id)
	item.value = profileStore.dataController.data_pengguna
	expertises.value = profileStore.dataController.data_pengguna.spesialisasi
	if (!projectStore.idProject) {
		router.push("/client/progress");
	}
})

const invite = async () => {
	try {
		await projectStore.inviteController({
			'id_user': id,
			'id_proyek': projectStore.idProject

		})
		snackbarStore.showSnackbar({
			type: "success",
			message: "Data berhasil di update",
			timeout: 5000,
		});
		router.push("/client/progress");
	} catch (error) {
		snackbarStore.showSnackbar({
			message: error.response.data.errors,
			timeout: 5000,
		});
	}

};

const back = () => {
	router.back();
};

defineComponent({
	name: 'PhotographerManagement',
	data() {
		return {
			profileImage: profileImagePath,
			expertises,
		};
	},
	methods: {
		invite,
	},
});
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
</style>
