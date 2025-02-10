<template>
	<v-app>
		<TheSidebar active-at="/creative-hub-team/profile" navbarTitle="Pengaturan Profil">
			<TheVCol class="d-flex flex-column ga-8" max-width="1200" style="margin-bottom: 100px">
				<TheVRow class="d-flex align-center ga-4">
					<v-avatar size="80" image="@/assets/images/default-profile-picture.png"
							  style="border: 2px solid #8A76D4"/>
					<TheVCol class="d-flex flex-column justify-center">
						<p style="font-size: 20px; font-weight: bold;">{{ nama }}</p>
						<p style="font-size: 16px; color: #87868B; font-weight: 500;">{{ wilayah }}</p>
					</TheVCol>
				</TheVRow>
				<v-divider/>
				<form class="d-flex flex-column ga-9" @submit.prevent="handleClickSubmit">
					<h2 style="font-size: 20px;">Detail Team</h2>
					<TheVRow class="d-block">
						<p class="mb-4">Deskripsi Team</p>
						<TheRichTextBox max-width="800" v-model="deskripsi"></TheRichTextBox>
					</TheVRow>
					<h2 style="font-size: 20px;">Detail Lainnya</h2>
					<TheVRow class="ga-4">
						<TheInput custom-label="Website" v-model="website"/>
						<TheInput custom-label="Media Sosial" v-model="mediaSosial"/>
					</TheVRow>
					<TheInputNumber custom-label="Team Fee" v-model="teamFee" :error-messages="errorTeamFee"/>
					<TheInputDropDown custom-label="Expertise"
									  :result="expertise"
									  @update:result="expertise = $event" :options="dialogOptions"
									  :error-messages="errorExpertise" multiple/>
					<v-divider/>
					<h2 style="font-size: 20px;">Tambah Member</h2>
					<TheVRow>
						<TheVCol v-for="(member, index) in members" :key="index" cols="12" md="6" class="pa-2">
							<v-card class="mx-auto"
									style="max-width: 800px; padding: 15px 20px; outline: 1px solid #b2adff; border-radius: 10px">
								<TheVRow no-gutters>
									<TheVCol cols="2" class="d-flex align-center">
										<v-avatar size="86" :image="member.image"></v-avatar>
									</TheVCol>
									<TheVCol cols="9">
										<v-card-title class="align-center">
											<h3>{{ member.name }}</h3>
											<p>{{ member.role }}</p>
										</v-card-title>
									</TheVCol>
								</TheVRow>
								<v-divider class="custom-divider"></v-divider>
								<v-card-text class="d-flex align-center">
									<TheVRow class="d-flex justify-space-between align-center">
										<TheVCol class="d-flex">
											<h3 style="font-weight: unset">
												Expertise:
												<span class="black-text">{{ member.expertise }}</span>
											</h3>
										</TheVCol>
									</TheVRow>
								</v-card-text>
							</v-card>
						</TheVCol>
					</TheVRow>
					<TheVRow class="ga-2 d-flex align-center cursor-pointer" @click="openDialog">
						<TheButton size="icon-m" type="primary-icon-2" icon="mdi-plus"/>
						<p class="opacity-50">Tambah Member</p>
					</TheVRow>
					<v-divider/>
					<TheVRow class="ga-2">
						<TheButton @click="handleClickSubmit" button-type="submit">Save</TheButton>
						<TheButton @click="handleBatal" type="secondary">Cancel</TheButton>
					</TheVRow>
				</form>
			</TheVCol>
			<v-dialog v-model="dialog" max-width="800px">
				<v-card>
					<v-card-title>
						<TheVRow class="d-flex justify-md-space-between">
							<v-card-title class="text-h5">
								<v-icon>mdi-account-multiple-plus</v-icon>
								Tambah Member
							</v-card-title>
							<v-btn icon @click="closeDialog">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</TheVRow>
						<v-divider></v-divider>
					</v-card-title>
					<v-card-text>
						<TheVRow>
							<TheVCol>
								<TheInput custom-label="Nama" max-width="800" v-model="namaMember"/>
								<TheInputDropDown custom-label="Role" max-width="800" v-model="roleMember"
												  :options="dialogOptions"/>
								<TheInput custom-label="Expertise" max-width="800" v-model="expertiseMember"/>
							</TheVCol>
						</TheVRow>
						<div class="d-flex justify-end">
							<TheButton prefix-icon="mdi-plus" size="text-icon-m" button-type="submit"
									   @click="addMember">Tambah
							</TheButton>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</TheSidebar>
	</v-app>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {useProfileStore} from "@/store/profile";
import {useMemberStore} from "@/store/member";
import {useSnackbarStore} from "@/store/snackbar";
import router from "@/router";
import TheInput from "@/components/common/TheInput.vue";
import TheInputDropDown from "@/components/common/TheInputDropDown.vue";
import TheRichTextBox from "@/components/common/TheRichTextBox.vue";
import TheButton from "@/components/common/TheButton.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import TheSidebar from "@/components/creative-hub-team/TheSidebar.vue";
import StaticProfile from "@/assets/images/William.png";
import TheInputNumber from '@/components/common/TheInputNumber.vue';

// States for form fields
const nama = ref("");
const deskripsi = ref("");
const wilayah = ref("");
const website = ref("");
const mediaSosial = ref("");
const teamFee = ref("");
const expertise = ref([]);
const namaMember = ref("");
const expertiseMember = ref("");
const roleMember = ref("");
const dialog = ref(false);
const disabledButtonSubmit = ref(true);

// States for error
const errorDeskripsiTeam = ref("");
const errorExpertise = ref("");
const errorTeamFee = ref("");

const profileStore = useProfileStore();
const memberStore = useMemberStore();
const snackbarStore = useSnackbarStore();

onMounted(async () => {
	try {
		await memberStore.getMember()
		const memberData = memberStore.data || [];
		memberData.value = memberStore.data;
		await profileStore.getProfile();
		const profileData = profileStore.data.data_pengguna || {};

		nama.value = profileData.nama || "Belum mengisi nama";
		wilayah.value = profileData.lokasi || '';
		deskripsi.value = profileData.profil_detail || "Tidak ada deskripsi";
		namaMember.value = profileData.nama || 'Belum mengisi nama';
		website.value = profileData.website || '';
		mediaSosial.value = profileData.media_sosial || '';
		teamFee.value = profileData.fee || '';
		expertise.value = profileData.spesialisasi || [];

		if (Array.isArray(memberData)) {
			members.value = memberData.map(member => ({
				name: member.nama || '',
				role: member.role_team || '',
				expertise: member.jabatan || '',
				image: StaticProfile,
			}));
		} else {
			members.value = [];
		}
		dialogOptions.value = profileStore.data.spesialisasi.map(item => ({
			title: item.nama,
			value: item.nama
		}));
	} catch (error) {
	}
});


watch([deskripsi, teamFee, expertise], () => {
	disabledButtonSubmit.value = !deskripsi.value || !teamFee.value || !expertise.value.length;
});

const handleSubmit = async () => {
	try {
		await profileStore.updateProfile({
			profil_detail: deskripsi.value,
			fee: teamFee.value,
			spesialisasi: expertise.value,
			wilayah: wilayah.value,
			website: website.value,
			media_sosial: mediaSosial.value,
			nama: nama.value,
		});
		await profileStore.getProfile();

		snackbarStore.showSnackbar({
			type: "success",
			message: "Data berhasil diupdate",
			timeout: 5000,
		});

		router.push("/creative-hub-team/profile");
	} catch (error) {
		snackbarStore.showSnackbar({
			message: error.response?.data?.errors || "Terjadi kesalahan",
			timeout: 5000,
		});
	}
};

const handleClickSubmit = () => {
	errorDeskripsiTeam.value = deskripsi.value ? "" : "Deskripsi team tidak boleh kosong";
	errorTeamFee.value = teamFee.value ? "" : "Fee tidak boleh kosong";

	if (!errorDeskripsiTeam.value && !errorTeamFee.value) {
		handleSubmit();
	}
};

const handleBatal = () => {
	router.push("/creative-hub-team/profile");
};

const openDialog = () => {
	dialog.value = true;
};

const closeDialog = () => {
	dialog.value = false;
};

const addMember = async () => {
	try {
		await memberStore.insertMember({
			nama: namaMember.value,
			jabatan: expertiseMember.value,
			role_team: roleMember.value.value,
			image: StaticProfile,
		});
		members.value.push({
			name: namaMember.value,
			role: roleMember.value.value,
			expertise: expertiseMember.value,
			image: StaticProfile,
		});
		snackbarStore.showSnackbar({
			type: "success",
			message: "Data berhasil menambah member",
			timeout: 5000,
		});
		dialog.value = false;
		resetDialogForm();
	} catch (error) {
		snackbarStore.showSnackbar({
			message: `Gagal menambahkan member: ${error.response?.data?.message || "Terjadi kesalahan pada server"}`,
			timeout: 5000,
		});
	}
};

const resetDialogForm = () => {
	namaMember.value = "";
	expertiseMember.value = "";
	roleMember.value = "";
};

const dialogOptions = ref([]);
const members = ref([]);
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
</style>
