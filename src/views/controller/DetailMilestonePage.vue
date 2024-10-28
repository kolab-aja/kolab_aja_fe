<template>
	<v-app>
		<v-container>
			<TheVCol>
				<v-img src="@/assets/images/logo-kolab-aja.png" alt="Kolab Aja Logo" contain max-width="10rem"></v-img>
			</TheVCol>
			<TheVRow class="d-flex flex-column justify-center mt-10 box">
				<TheButton size="icon-l" type="primary-icon-1" icon="mdi-arrow-left" class="mb-10 spacing" />
				<TheVRow class="d-flex align-center spacing">
					<TheVCol>
						<div md="10" class="d-flex align-center ga-3">
							<v-avatar size="50" image="@/assets/images/default-profile-team.png"
								style="border: 2px solid #8a76d4" />
							<p style="font-weight: 400">
								Tim Fotografer Pernikahan
							</p>
						</div>
						<div>
							<h3 class="mt-2">
								Pemotretan Untuk Acara Pernikahan
							</h3>
						</div>
					</TheVCol>
					<TheVCol md="2" class="text-right">
						<TheButton suffix-icon="mdi-open-in-new" size="text-icon-m" style="
								height: 55px !important;
								font-size: 16px !important;
							">Detail Project</TheButton>
					</TheVCol>

					<v-divider class="custom-divider"></v-divider>

					<TheVRow>
						<TheVCol md="8">
							<div class="d-flex align-center ga-3">
								<TheButton size="icon-m" type="primary-icon-2" icon="mdi-plus" />
								<p><strong>Tambah Milestone</strong></p>
							</div>
							<div>
								<form class="taskInput ml-11 mt-5">
									<TheVRow>
										<TheInput max-width="800" custom-label="Task"
											placeholder="Persiapkan Roles Team" bg-color="white" />
									</TheVRow>
									<TheVRow>
										<TheInput max-width="800" custom-label="Deskripsi Task"
											placeholder="Tambahkan Deskripsi" bg-color="white" />
									</TheVRow>
									<TheVRow>
										<TheInput max-width="800" custom-label="Tautan" placeholder="Link Meeting"
											bg-color="white" />
									</TheVRow>
									<TheVRow class="d-flex ga-5">
										<TheVCol>
											<TheInput append-inner-icon="mdi-percent" max-width="700"
												custom-label="Presentase" placeholder="20" bg-color="white" />
										</TheVCol>
										<TheVCol>
											<div>
												<TheInput append-inner-icon="mdi-calendar-month" max-width="700"
													custom-label="Deadline" placeholder="20 April 2023" bg-color="white"
													@click="dateTimePicker" />
											</div>
										</TheVCol>
									</TheVRow>
									<div class="float-right">
										<v-date-picker v-if="showPicker" width="300" color="primary"></v-date-picker>
									</div>
								</form>
							</div>
							<div class="mt-10">
								<TheButton size="l" type="primary" style="width: 126px; font-weight: 700">Publish
								</TheButton>
							</div>
						</TheVCol>
						<v-divider class="mr-10" vertical></v-divider>
						<TheVCol md="3">
							<h6>Tentang Project</h6>
							<div class="mt-7">
								<p class="secondaryP">Project Price</p>
								<h6 style="font-weight: 400">500K</h6>
							</div>
							<div class="mt-7">
								<p class="secondaryP">Pengerjaan</p>
								<h6 style="font-weight: 400">3 Bulan</h6>
							</div>
							<div class="mt-7">
								<p class="secondaryP">Close Date</p>
								<h6 style="font-weight: 400">
									19 Agustus 2023
								</h6>
							</div>
							<h6 class="mt-10">Progression</h6>
							<div>
								<v-progress-linear v-model="skill" color="var(--secondary--purple, #46377D);"
									height="25" class="mt-5" rounded="round">
									<template v-slot:default="{ value }">
										<strong>{{ Math.ceil(value) }}%</strong>
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
import TheInput from "@/components/common/TheInput.vue";
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

.v-container {
	/* background-color: beige; */
}

/* spacing */
.box {
	width: 70vw;
	/* padding: 50px 50px; */
	margin: auto;
	/* background-color: bisque; */
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
</style>
