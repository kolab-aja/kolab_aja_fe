<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/profile" navbarTitle="Pengaturan Profil">
			<TheVCol class="d-flex flex-column ga-8" max-width="1200">
				<TheVRow class="d-flex align-center ga-4">
					<v-avatar size="80" style="border: 2px solid #8A76D4">
						<img :src="profileImage" alt="Profile Image" height="100%" />
					</v-avatar>
					<TheVCol class="d-flex flex-column justify-center">
						<p class="profile-name">{{ nama }}</p>
						<p class="profile-location">{{ wilayah }}</p>
					</TheVCol>
					<TheButton prefix-icon="mdi-pencil" size="text-icon-m" @click="handleEditTeam">Edit</TheButton>
				</TheVRow>
				<v-divider />
				<h2 style="font-size: 20px;">Detail Team</h2>
				<div v-html="deskripsi"></div>
				<v-divider />
				<h2 class="section-title">Member</h2>
				<v-row style="padding: 10px">
					<v-col v-for="(team, index) in teams" :key="team.id || index" cols="12" md="6">
						<v-card class="team-card">
							<TheVRow no-gutters>
								<TheVCol cols="2" class="d-flex align-center">
									<v-avatar size="86" image="@/assets/images/William.png"></v-avatar>
								</TheVCol>
								<TheVCol cols="9">
									<v-card-title class="align-center">
										<h3>{{ team.name }}</h3>
										<p>{{ team.role }}</p>
									</v-card-title>
								</TheVCol>
							</TheVRow>
							<v-divider class="custom-divider"></v-divider>
							<v-card-text class="d-flex align-center">
								<TheVRow class="d-flex justify-space-between align-center">
									<TheVCol class="d-flex">
										<h3 style="font-weight: unset">
											Expertise:
											<span class="black-text">{{ team.expertise }}</span>
										</h3>
									</TheVCol>
								</TheVRow>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				<v-divider />
				<h2 class="section-title">Skillset</h2>
				<TheVRow>
					<TheVCol cols="auto" v-for="skill in expertise" :key="skill" style="margin-bottom: 100px;">
						<v-chip outlined color="primary" class="skill-chip">
							{{ skill }}
						</v-chip>
					</TheVCol>
				</TheVRow>
			</TheVCol>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import { useProfileStore } from "@/store/profile";
import { useMemberStore } from "@/store/member";
import router from "@/router";

const profileStore = useProfileStore();
const memberStore = useMemberStore();

const nama = ref("");
const wilayah = ref("");
const deskripsi = ref("");
const expertise = ref([]);
const teams = ref([]);

onMounted(async () => {
	try {
		await memberStore.getMember()
		const memberData = memberStore.data || [];
		memberData.value = memberStore.data
		await profileStore.getProfile();
		const profileData = profileStore.data.data_pengguna || {};
		nama.value = profileData.nama || "Belum mengisi nama";
		deskripsi.value = profileData.profil_detail || "Tidak ada deskripsi";
		wilayah.value = profileData.lokasi || '';
		expertise.value = profileData.spesialisasi || [];

		if (Array.isArray(memberData)) {
			teams.value = memberData.map(member => ({
				name: member.nama || '',
				role: member.role_team || '',
				expertise: member.jabatan || '',
				image: "@/assets/images/default-profile-picture.png",
			}));
		} else {
			teams.value = [];
		}
	} catch (error) {
	}
});

const handleEditTeam = () => {
	router.push("/creative-hub-team/edit-profile");
};
</script>

<style scoped>
.custom-divider {
	margin: 1.5rem 0 0.5rem 0;
	border-top: 2px solid;
}

.black-text {
	color: black;
	font-size: 16px;
	font-weight: bold;
}

.profile-name {
	font-size: 20px;
	font-weight: bold;
}

.profile-location {
	font-size: 16px;
	color: #87868B;
	font-weight: 500;
}

.section-title {
	font-size: 20px;
}

.team-card {
	max-width: 800px;
	padding: 15px 20px;
	outline: 1px solid #b2adff;
	border-radius: 10px;
}

.skill-chip {
	margin-right: 10px;
	margin-bottom: 10px;
}
</style>