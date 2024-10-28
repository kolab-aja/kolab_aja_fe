<template>
	<v-container>
		<!-- logo and navbar -->
		<TheVRow>
			<TheVCol>
				<v-img
					src="@/assets/images/logo-kolab-aja.png"
					alt="Kolab Aja Logo"
					contain
					max-width="9rem"
				></v-img>
			</TheVCol>
			<TheVCol class="d-flex align-center ga-3 justify-end">
				<TheButton size="s">Tambah Project</TheButton>
				<v-avatar
					size="36"
					image="@/assets/images/default-profile-picture.png"
				></v-avatar>
				<p style="color: #221943">Jeksen Lim</p>
			</TheVCol>
		</TheVRow>

		<!-- controller information section -->
		<TheVRow class="d-flex flex-column box mt-10">
			<TheButton
				size="icon-l"
				type="primary-icon-1"
				icon="mdi-arrow-left"
				class="mb-10 spacing"
			/>
			<v-card variant="text" class="outline">
				<v-card-title class="d-flex align-center">
					<v-avatar
						size="74"
						class="mr-3"
						image="@/assets/images/default-profile-picture.png"
					></v-avatar>
					<div>
						<h5>Photographers Management</h5>
						<div class="d-flex align-center ga-1">
							<v-icon icon="mdi-map-marker" size="s"></v-icon>
							<p
								class="fill-card"
								style="font-weight: 400; color: #221943"
							>
								Medan, Indonesia
							</p>
						</div>
					</div>
				</v-card-title>
			</v-card>
		</TheVRow>

		<TheVRow class="box">
			<TheVCol md="8">
				<p class="mt-5">Overview</p>
				<h4 class="mt-2">Pemotretan untuk acara pernikahan</h4>

				<!-- richtextbox value -->
				<div class="mt-2">
					<p style="color: #221943; font-weight: 400">
						Kami mencari fotografer pernikahan berbakat dan kreatif
						untuk bergabung dengan tim kami yang dinamis!
						<br />
						<br />
						Sebagai fotografer pernikahan, Anda akan bertanggung
						jawab untuk:
						<li>
							Berkonsultasi dengan klien untuk memahami visi dan
							harapan mereka untuk pernikahan.
						</li>
						<li>
							Melakukan scouting lokasi pernikahan untuk
							menentukan spot foto yang terbaik.
						</li>
						<li>
							Merancang shot list untuk memastikan semua momen
							penting pernikahan terabadikan.
						</li>
					</p>
				</div>

				<p class="mt-10">Kebutuhan Skill</p>
				<div class="mt-3">
					<v-chip class="chip">Fotografi Aerial</v-chip>
					<v-chip class="chip">Fotografi Aerial</v-chip>
					<v-chip class="chip">Fotografi Aerial</v-chip>
				</div>

				<p class="mt-10">Dokumen Lainnya</p>
				<div class="d-flex ga-3">
					<div class="d-flex ga-1 mt-3 align-center">
						<v-icon icon="mdi-attachment"></v-icon>
						<p style="color: #221943; font-weight: 400">
							project_details.pdf
						</p>
					</div>
					<div class="d-flex ga-1 mt-3 align-center">
						<v-icon icon="mdi-attachment"></v-icon>
						<p style="color: #221943; font-weight: 400">
							project_details.pdf
						</p>
					</div>
				</div>
			</TheVCol>
			<TheVCol md="4">
				<TheVRow class="d-flex flex-column outline mt-5 mb-5">
					<h6>Detail Project</h6>

					<!-- budget -->
					<div class="mt-5 mb-3">
						<p>Budget</p>
						<p style="color: #221943">500k</p>
					</div>

					<!-- estimasi -->
					<div>
						<p>Estimasi</p>
						<p style="color: #221943">3 Bulan</p>
					</div>
				</TheVRow>
				<TheVRow class="d-flex flex-column outline">
					<h6>Tentang Controllers</h6>

					<!-- rate -->
					<div class="mt-5 mb-3">
						<p>Project Rate</p>
						<p style="color: #221943">15%</p>
					</div>

					<!-- completion -->
					<div class="mb-3">
						<p>Completion</p>
						<p style="color: #221943">100%</p>
					</div>

					<!-- expertise -->
					<div class="mb-3">
						<p>Expertise</p>
						<div class="mt-1">
							<v-chip class="minichip">Fotografi Aerial</v-chip>
							<v-chip class="minichip">Fotografi Aerial</v-chip>
							<v-chip class="minichip">Fotografi Aerial</v-chip>
						</div>
					</div>

					<!-- profile info -->
					<div class="mt-5" >
						<p>Profile</p>
						<div class="d-flex align-center ga-2">
							<p style="color: #221943">Lihat Profile</p>
							<v-icon
								icon="mdi-open-in-new"
								color="#221943"
							></v-icon>
						</div>
					</div>
				</TheVRow>
			</TheVCol>
		</TheVRow>
	</v-container>
</template>
<script setup>
import TheVCol from "@/components/common/TheVCol.vue";
import TheVRow from "@/components/common/TheVRow.vue";
import TheButton from "@/components/common/TheButton.vue";
</script>
<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

/* typography */
h4,
h5 {
	color: var(--primary-purple-100, var(--primary-purple, #221943));
}
h4 {
	font-size: 31px;
}
h5 {
	font-size: 25px;
}
h6,
p {
	color: var(--secondary-desc-color, rgba(34, 25, 67, 0.2));
}
h6 {
	font-size: 20px;
}
p {
	font-size: 16px;
	font-weight: 700;
}
.box {
	width: 70vw;
	margin: auto;
}
.outline {
	padding: 30px 25px;
	border-radius: 10px;
	border: 1px solid var(--primary-gray, #dee4f0);
}
.chip,
.minichip {
	height: 27px;
	margin-right: 5px;
	border-radius: 15px;
	font-weight: 600;
	border: 1px solid var(--stroke-100, rgba(123, 97, 220, 0.25));
	background: var(--primary-purple-10, #f7f4ff);
}
.minichip {
	height: 22px;
	margin-right: 5px;
	font-size: 10px;
}
</style>
