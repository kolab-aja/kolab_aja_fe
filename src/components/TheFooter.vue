<template>
	<v-container>
		<v-footer class="footer" id="footer">
			<v-container class="container">
				<v-row class="footer-content">
					<v-col class="footer-logo-container" cols="12" md="4">
						<v-row align="center" class="footer-logo">
							<h2>About Us</h2>
						</v-row>
						<p class="text-subtitle-1">
							Crafted with the aim of aligning visions with expertise, ensuring
							that profound understanding and skills are in harmony with the
							goals to be achieved.
						</p>
						<v-row class="d-flex justify-left mt-4">
							<v-col cols="auto">
								<v-btn icon>
									<v-icon>mdi-facebook</v-icon>
								</v-btn>
							</v-col>
							<v-col cols="auto">
								<v-btn icon>
									<v-icon>mdi-twitter</v-icon>
								</v-btn>
							</v-col>
							<v-col cols="auto">
								<v-btn icon>
									<v-icon>mdi-instagram</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
					<v-col class="footer-links" cols="12" md="4">
						<h2>Contact Info</h2>
						<ul>
							<li>
								<v-icon size="24px" class="mr-2">mdi-map-marker</v-icon>
								<span>Jl. M.H Thamrin No.140, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212</span>
							</li>
							<li>
								<a href="#">
									<v-icon size="24px" class="mr-2">mdi-email</v-icon>
									kolab.aja@gmail.com
								</a>
							</li>
							<li>
								<a href="#">
									<v-icon size="24px" class="mr-2">mdi-phone</v-icon>
									08967884309
								</a>
							</li>
						</ul>
					</v-col>
					<v-col class="footer-links" cols="12" md="4">
						<h2>Quick Links</h2>
						<ul>
							<li><a href="#">About</a></li>
							<li><a href="#">Forum</a></li>
							<li><a href="#">FaQ</a></li>
						</ul>
					</v-col>
				</v-row>
				<br>
				<v-divider class="divider"></v-divider>
				<div class="footer-bottom">
					<p>&copy; 2024 Kolab Aja</p>
				</div>
			</v-container>
		</v-footer>
	</v-container>
</template>

<script setup>
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.footer {
	color: #000000;
	margin-top: 8rem;
	padding: 60px 0 60px 0;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
}

.footer-content {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
}

.footer-logo {
	display: flex;
	align-items: center;
	width: 200px;
	padding: 10px;
}

.footer-logo-container {
	display: block;
	align-items: center;
	width: 300px;

}

.footer-logo-container p {
	margin-top: 36px;
	font-size: 12px;
}

.footer-logo-container img {
	width: 30px;
	margin-right: 10px;
}

.logo-text h1 {
	font-size: 24px;
	margin: 0;
}

.footer-links ul {
	list-style: none;
	padding: 0;
	margin: 30px 0;
}

.footer-links ul li {
	margin-bottom: 20px;
	font-size: 1rem;
}

.footer-links a {
	color: #000000;
	text-decoration: none;
}

.footer-bottom {
	margin-top: 30px;
	text-align: center;
}

.footer-bottom p {
	font-size: 14px;
}
</style>
