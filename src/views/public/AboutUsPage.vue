<template>
	<v-app>
		<TheNavbar />
		<v-container class="mt-16 sort">
			<v-col class="text-center mb-10 mt-10">
				<p
					style="
						font-size: 20px;
						font-weight: 700;
						color: var(
							--secondary-desc-color,
							rgba(34, 25, 67, 0.2)
						);
					"
				>
					Kolab Aja
				</p>
				<h3>Our Information</h3>
			</v-col>
			<v-row class="d-flex justify-center">
				<v-col cols="auto" sm="10" class="d-flex justify-center">
					<v-img
						src="@/assets/images/aboutus-thumb.png"
						class="picture"
					></v-img>
				</v-col>
				<v-row class="section">
					<h5>Kolab Aja</h5>
					<h6 class="mt-3">
						Kolab Aja adalah platform kolaborasi berbasis web yang
						bertujuan untuk menghubungkan anggota Creative Hub
						dengan klien, mendorong produktivitas dan inovasi dalam
						ekonomi kreatif di Indonesia. Kami percaya bahwa dengan
						menggabungkan bakat dan kreativitas dari berbagai
						bidang, kita dapat menciptakan solusi dan karya yang
						luar biasa.
					</h6>
				</v-row>
				<v-row class="section">
					<h5>Creative Hub</h5>
					<h6 class="mt-3">
						Creative Hub adalah komunitas digital di mana para
						profesional kreatif, seperti desainer, fotografer,
						penulis, dan pengembang, dapat bertemu, berkolaborasi,
						dan bekerja sama dalam berbagai proyek. Creative Hub
						menyediakan ruang untuk berbagi ide, sumber daya, dan
						inspirasi, serta kesempatan untuk membangun jaringan
						profesional yang kuat.
					</h6>
				</v-row>
			</v-row>
			<v-row class="section d-flex flex-column align-center">
				<v-col md="12" class="d-flex align-center">
					<v-img
						src="@/assets/images/contohCH1.jpg"
						class="mr-5 picture"
					></v-img>
					<v-img
						src="@/assets/images/contohCH2.jpg"
						class="picture"
					></v-img>
				</v-col>
				<v-col md="12"
					><v-img
						src="@/assets/images/contohCH3.jpg"
						class="picture"
					></v-img
				></v-col>
			</v-row>
			<v-row class="d-flex justify-center">
				<v-row class="section">
					<h5>Mengapa Kolab Aja?</h5>
					<h6 class="mt-3">
						Banyak profesional kreatif yang kesulitan menemukan
						proyek yang sesuai dengan keahlian mereka, sementara
						klien juga mengalami kesulitan dalam menemukan tim
						kreatif yang dapat mewujudkan visi mereka. Dengan Kolab
						Aja, kami ingin mengatasi masalah ini dengan menyediakan
						platform yang memfasilitasi koneksi dan kolaborasi
						antara kreator dan klien, serta memberikan dukungan
						untuk meningkatkan kualitas karya dan efisiensi kerja.
					</h6>
				</v-row>
			</v-row>

			<v-row class="aside d-flex flex-column align-center text-center">
				<h3>Kenalan dengan tim kami!</h3>
				<h6 class="mt-2">
					Mereka yang berada di balik layar pengembangan Kolab Aja!!
				</h6>
			</v-row>
			<v-row class="section d-flex justify-center">
				<v-col cols="auto" class="text-center">
					<v-img
						src="@/assets/images/Sugiharto1.png"
						width="10rem"
					></v-img>
					<p class="title mt-4">Sugiharto</p>
					<p class="desc">Ketua Tim</p>
				</v-col>
				<v-col cols="auto" class="text-center">
					<v-img
						src="@/assets/images/William1.png"
						width="9.7rem"
					></v-img>
					<p class="title mt-4">William</p>
					<p class="desc">Backend Team</p>
				</v-col>
				<v-col cols="auto" class="text-center">
					<v-img
						src="@/assets/images/Stevanny1.png"
						width="10rem"
					></v-img>
					<p class="title mt-4">Stevanny Holanda</p>
					<p class="desc">UI/UX Designer</p>
				</v-col>
				<v-col cols="auto" class="text-center">
					<v-img
						src="@/assets/images/Jeksen1.png"
						width="10rem"
					></v-img>
					<p class="title mt-4">Jeksen</p>
					<p class="desc">Frontend Team</p>
				</v-col>
				<v-col cols="auto" class="text-center">
					<v-img
						src="@/assets/images/Edbert1.png"
						width="10rem"
					></v-img>
					<p class="title mt-4">Edbert Fortino</p>
					<p class="desc">Backend Team</p>
				</v-col>
			</v-row>
		</v-container>
		<TheFooter></TheFooter>
	</v-app>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.v-img {
	border-radius: 10px;
}

.picture {
	border: 4px solid #dee4f0;
}

.section {
	margin: 50px 100px;
}

.section h6 {
	font-weight: 400;
	align-self: stretch;
	line-height: 150%;
}

h3 {
	color: #221943;
	font-size: 39px;
	font-weight: 700;
	line-height: 120%;
}

h5 {
	color: #221943;
	font-size: 25px;
	font-weight: 700;
	line-height: 120%;
}

h6 {
	color: #221943;
	font-size: 20px;
	font-weight: 700;
	line-height: 120%;
}

.aside {
	margin: 120px 0 60px;
}

.aside h6 {
	color: #221943;
	font-weight: 400;
}

.title,
.desc {
	color: #221943;
	font-size: 18px;
}

.title {
	font-weight: 700;
}
@media (max-width: 1024px) {
	.section {
		margin: 50px 50px;
	}
}

@media (max-width: 768px) {
	.section {
		margin: 50px 20px;
	}

	.aside {
		margin: 80px 0 40px;
	}
}
</style>
