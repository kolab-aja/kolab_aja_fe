<template>
	<v-app>
		<Navbar custom-color="white"></Navbar>
		<v-container fluid style="padding: 0">
			<!-- <TheNavbar></TheNavbar> -->
			<TheVRow class="d-flex flex-column align-center nocth" style="padding: 100px 70px">
				<h2 style="color: white; font-size: 35px">Rekomedasi Team</h2>
				<TheVCol class="d-flex align-center justify-center ga-3 mt-3">
					<TheVCol max-width="800">
						<TheInput prepend-inner-icon="mdi-search-web" placeholder="Cari Team" bg-color="white"
								  style="height: 50px" />
					</TheVCol>
					<TheButton size="s" type="primary" style="width: 90px">Cari</TheButton>
				</TheVCol>
			</TheVRow>

			<!-- card -->
			<TheVRow style="margin: 60px 130px" class="d-flex align-stretch">
				<!-- filter -->
				<TheVCol md="3" class="pr-10 v-col--stretch">
					<p class="fill-card" style="font-size: 16px">Budget</p>
					<v-checkbox v-for="(checkbox, index) in budgetCheckboxes" :key="'budget-' + index" :label="checkbox.label" class="check"></v-checkbox>
					<v-divider class="custom-divider"></v-divider>
					<p class="fill-card" style="font-size: 16px">Category</p>
					<v-checkbox v-for="(checkbox, index) in categoryCheckboxes" :key="'category-' + index" :label="checkbox.label" class="check"></v-checkbox>
				</TheVCol>

				<!-- Konten Tim -->
				<TheVCol md="9" class="pl-5 v-col--stretch">
					<v-card variant="text" v-for="(team, index) in teams" :key="index">
						<v-card-title class="d-flex">
							<v-row no-gutters>
								<v-col cols="1">
									<v-avatar size="86" image="@/assets/images/let-him-cook.jpg"></v-avatar>
								</v-col>
								<v-col cols="11">
									<v-card-title class="d-flex justify-space-between align-center">
										<span>{{ team.name }}</span>
										<span>{{ formattedPrice(team.price) }}/Project</span>
									</v-card-title>
									<v-card-subtitle class="d-flex align-center">
										<v-icon>mdi-home</v-icon>
										<span>{{ team.location }}</span>
									</v-card-subtitle>
								</v-col>
								<TheVCol cols="auto" v-for="skill in skills" :key="skill" style="margin-top: 30px">
									<v-chip outlined color="primary" class="my-1" style="margin-right: 10px; margin-bottom: 10px;">
										{{ skill }}
									</v-chip>
								</TheVCol>
							</v-row>
						</v-card-title>
						<v-card-item>
							<TheVCol class="mt-2 mb-2">
								<span>{{ team.description }}</span>
							</TheVCol>
							<TheVCol class="d-flex align-center justify-end ga-3">
								<v-col class="d-flex">
									<div>
										<span class="black-text">
											{{ team.projects }}
										</span>
										Projects
									</div>
									<span class="black-text ml-2 mr-2">|</span>
									<div>
										<span class="black-text">
											{{ team.completion }}
										</span>
										% completion
									</div>
								</v-col>
								<TheButton size="icon-l" type="primary-icon-2" icon="mdi-bookmark-outline" />
								<TheButton size="l" type="primary">Apply</TheButton>
							</TheVCol>
						</v-card-item>
						<v-divider :thickness="2" class="mt-4 mb-4"></v-divider>
					</v-card>
				</TheVCol>
			</TheVRow>
		</v-container>
	</v-app>
</template>
<script setup>
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheInput from "@/components/common/TheInput.vue";
import TheButton from "@/components/common/TheButton.vue";
import Navbar from "@/layouts/default/Navbar.vue";
import {ref} from "vue";

const budgetCheckboxes = [
	{ label: 'Semua' },
	{ label: '< 50k' },
	{ label: '50k - 300k' },
	{ label: '> 300k' }
];

const categoryCheckboxes = [
	{ label: 'Aplikasi & Pengembangan' },
	{ label: 'Kerajinan' },
	{ label: 'Fashion' },
	{ label: 'Periklanan' },
	{ label: 'Fotografi' },
	{ label: 'Musik & Kesenian' },
	{ label: 'Tv & Radio' },
	{ label: 'Arsitektur' },
	{ label: 'Publikasi' },
	{ label: 'Desain Produk' },
	{ label: 'Film, Animasi & Video' }
];

const teams = ref([
	{
		name: 'Tim Fotografer Pernikahan',
		location: 'Jeksen Creative Hub, Medan, Indonesia',
		description: 'Kami mencari individu yang kreatif, teliti, dan berorientasi pada detail untuk bergabung dengan tim kami sebagai Pencetak dan Penyusun Venue Pernikahan. Sebagai Pencetak dan...',
		price: 100000,
		projects: 10,
		completion: 100
	},
	{
		name: 'Tim Fotografer Pernikahan',
		location: 'Jeksen Creative Hub, Medan, Indonesia',
		description: 'Kami mencari individu yang kreatif, teliti, dan berorientasi pada detail untuk bergabung dengan tim kami sebagai Pencetak dan Penyusun Venue Pernikahan. Sebagai Pencetak dan...',
		price: 100000,
		projects: 10,
		completion: 100
	}
]);

const skills = [
	'Fotografi Aerial',
	'Fotografi Aerial',
	'Fotografi Aerial',
	'Fotografi Aerial',
	'Fotografi Aerial',
	'Fotografi Aerial',
];

const formattedPrice = (price) => {
	return `${(price / 1000).toFixed(0)}k`;
};
</script>
<style scoped>


.nocth {
	border-radius: 0 0 20px 20px;
	background: linear-gradient(0deg,
	rgba(0, 0, 0, 0.2) 0%,
	rgba(0, 0, 0, 0.2) 100%),
	linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
	#221943;
}

.fill-card {
	font-size: 13px;
	font-weight: 700;
}

.v-col--stretch {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.check {
	height: 2rem !important;
	font-weight: 400 !important;
}

.custom-divider {
	margin: 2rem 0;
}

.black-text {
	color: black;
	font-size: 20px;
	font-weight: bold;
}
</style>
