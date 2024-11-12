<template>
	<v-app>
		<TheNavbar></TheNavbar>

		<v-container class="container">
			<v-row class="hero-text">
				<v-col cols="12" class="text-center">
					<div class="small-circle"></div>
					<div class="small-circle-bottom"></div>
					<div class="medium-circle"></div>
					<div class="big-circle"></div>
					<p>⚡ Align Vision with Expertise</p>
					<h1>
						<span>Made to <span class="highlight">Align</span></span><br />
						<span>Visions</span><br />
						<span>with Expertise</span>
					</h1>
					<TheButton customType="register" @click="redirectTo('register')">Get Started</TheButton>
				</v-col>
			</v-row>
			<v-col>
				<div class="scroll-down-animation">
					<div class="sponsor-section-container" :class="{
						show: showSponsorSection,
						hide: !showSponsorSection,
					}" ref="sponsorSection">
						<v-row class="sponsor-section" justify="center">
							<v-col cols="11">
								<div class="trusted-by">Trusted by</div>
							</v-col>
							<v-col cols="11">
								<v-row class="sponsor-logo-container">
									<img src="@/assets/images/msib.png" alt="sponsor-logo" />
									<img src="@/assets/images/lldikti1.png" alt="sponsor-logo" />
									<img src="@/assets/images/mikroskil-blue.png" alt="sponsor-logo" />
									<img src="@/assets/images/pkm.png" alt="sponsor-logo" />
									<img src="@/assets/images/kampus-merdeka.png" alt="sponsor-logo" />
								</v-row>
							</v-col>
						</v-row>
					</div>
				</div>
				<div class="cta-section section-1" ref="ctaSection">
					<span>Gimana Cara Kerjanya?</span>
				</div>
				<div class="how-it-works">
					<div class="item-container">
						<div class="item">
							<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"
								fill="none">
								<g clip-path="url(#clip0_201_52)">
									<path
										d="M54.4062 39.3125C50.0938 39.3125 46.6438 41.0375 44.0563 43.625L30.2563 36.2938C30.6875 35 30.6875 34.1375 30.6875 32.8438V31.1187L43.1937 25.5125C45.7812 28.5313 49.6625 30.6875 54.4062 30.6875C62.6 30.6875 69.5 23.7875 69.5 15.5938C69.5 7.4 62.6 0.5 54.4062 0.5C46.2125 0.5 39.3125 7.4 39.3125 15.5938V17.3188L26.8062 22.925C24.2187 19.9062 20.3375 17.75 15.5938 17.75C7.4 17.75 0.5 24.65 0.5 32.8438C0.5 41.0375 7.4 47.9375 15.5938 47.9375C19.9062 47.9375 23.3563 46.2125 25.9438 43.625L39.3125 50.9562V54.4062C39.3125 62.6 46.2125 69.5 54.4062 69.5C62.6 69.5 69.5 62.6 69.5 54.4062C69.5 46.2125 62.6 39.3125 54.4062 39.3125ZM54.4062 4.8125C60.4437 4.8125 65.1875 9.55625 65.1875 15.5938C65.1875 21.6312 60.4437 26.375 54.4062 26.375C48.3688 26.375 43.625 21.6312 43.625 15.5938C43.625 9.55625 48.3688 4.8125 54.4062 4.8125ZM15.5938 43.625C9.55625 43.625 4.8125 38.8812 4.8125 32.8438C4.8125 26.8063 9.55625 22.0625 15.5938 22.0625C21.6312 22.0625 26.375 26.8063 26.375 32.8438C26.375 38.8812 21.6312 43.625 15.5938 43.625ZM54.4062 65.1875C48.3688 65.1875 43.625 60.4437 43.625 54.4062C43.625 48.3688 48.3688 43.625 54.4062 43.625C60.4437 43.625 65.1875 48.3688 65.1875 54.4062C65.1875 60.4437 60.4437 65.1875 54.4062 65.1875Z"
										fill="black" />
								</g>
								<defs>
									<clipPath id="clip0_201_52">
										<rect width="69" height="69" fill="white" transform="translate(0.5 0.5)" />
									</clipPath>
								</defs>
							</svg>
							<p>Koneksi</p>
							<span>brings together talented creative hubs with
								clients who need their expertise.</span>
						</div>
					</div>
					<div class="item-container">
						<div class="item">
							<svg xmlns="http://www.w3.org/2000/svg" width="74" height="73" viewBox="0 0 74 73"
								fill="none">
								<g clip-path="url(#clip0_201_59)">
									<path
										d="M65.2563 56.0023C63.1913 53.9357 60.7785 52.249 58.1284 51.0194C61.8656 47.9917 64.2498 43.3719 64.2498 38.191C64.2498 29.0503 56.6269 21.5513 47.4859 21.6915C38.4853 21.8318 31.2335 29.1658 31.2335 38.191C31.2335 43.3719 33.626 47.9917 37.355 51.0194C34.7044 52.2481 32.2914 53.9349 30.2271 56.0023C25.7226 60.5149 23.1651 66.4712 23.0001 72.8235C22.9979 72.9116 23.0133 72.9992 23.0455 73.0812C23.0777 73.1631 23.126 73.2379 23.1875 73.3009C23.249 73.3639 23.3225 73.414 23.4037 73.4482C23.4848 73.4824 23.572 73.5 23.6601 73.5H28.2801C28.6348 73.5 28.9318 73.2195 28.9401 72.8648C29.0968 68.0799 31.0356 63.6003 34.4428 60.2014C36.1863 58.4486 38.2602 57.0591 40.5444 56.1131C42.8285 55.1672 45.2777 54.6837 47.7499 54.6906C52.7742 54.6906 57.5014 56.6457 61.0571 60.2014C64.4561 63.6003 66.3948 68.0799 66.5598 72.8648C66.5681 73.2195 66.8651 73.5 67.2198 73.5H71.8398C71.9279 73.5 72.0151 73.4824 72.0962 73.4482C72.1774 73.414 72.2509 73.3639 72.3124 73.3009C72.3739 73.2379 72.4222 73.1631 72.4544 73.0812C72.4865 72.9992 72.502 72.9116 72.4998 72.8235C72.3348 66.4712 69.7773 60.5149 65.2563 56.0023ZM47.7499 48.7507C44.9285 48.7507 42.272 47.6535 40.2837 45.6571C39.2859 44.6671 38.4978 43.4864 37.9662 42.1852C37.4347 40.8841 37.1707 39.4892 37.19 38.0838C37.2148 35.3779 38.2955 32.7627 40.1847 30.824C42.1647 28.7946 44.813 27.6643 47.6427 27.6313C50.4394 27.6066 53.1537 28.6956 55.1502 30.6508C57.1961 32.6554 58.3181 35.3366 58.3181 38.191C58.3181 41.0125 57.2209 43.6606 55.2244 45.6571C54.2449 46.6412 53.08 47.4214 51.797 47.9524C50.514 48.4834 49.1385 48.7548 47.7499 48.7507ZM27.0838 40.369C27.0096 39.6512 26.9683 38.9253 26.9683 38.191C26.9683 36.8793 27.0921 35.6006 27.3231 34.3549C27.3808 34.0579 27.2241 33.7527 26.9518 33.6289C25.8298 33.1257 24.7986 32.4327 23.9076 31.5582C22.8577 30.5403 22.0315 29.3146 21.4818 27.9595C20.9321 26.6045 20.6709 25.1496 20.7149 23.688C20.7891 21.0398 21.8534 18.5236 23.7096 16.6262C25.7473 14.539 28.4863 13.4005 31.3985 13.4335C34.0303 13.4583 36.5713 14.473 38.4935 16.2714C39.1453 16.8819 39.7062 17.5584 40.1765 18.2844C40.3415 18.5401 40.6632 18.6474 40.9437 18.5484C42.3957 18.0451 43.9302 17.6904 45.506 17.5254C45.968 17.4759 46.232 16.9809 46.0257 16.5684C43.3445 11.2638 37.8665 7.60093 31.5305 7.50194C22.3814 7.36169 14.7584 14.8607 14.7584 23.9932C14.7584 29.174 17.1426 33.7939 20.8799 36.8216C18.2564 38.0343 15.8391 39.709 13.7437 41.8044C9.22269 46.317 6.66521 52.2734 6.50021 58.6339C6.498 58.722 6.51345 58.8096 6.54563 58.8916C6.57781 58.9736 6.62608 59.0483 6.68758 59.1113C6.74909 59.1744 6.82259 59.2245 6.90376 59.2586C6.98493 59.2928 7.07212 59.3104 7.1602 59.3104H11.7884C12.1432 59.3104 12.4402 59.0299 12.4484 58.6752C12.6052 53.8903 14.5439 49.4107 17.9511 46.0118C20.3766 43.5864 23.3466 41.9034 26.5888 41.0867C26.9106 41.0042 27.1251 40.699 27.0838 40.369Z"
										fill="black" />
								</g>
								<defs>
									<clipPath id="clip0_201_59">
										<rect width="73" height="73" fill="white" transform="translate(0.5)" />
									</clipPath>
								</defs>
							</svg>
							<p>Kolaborasi</p>
							<span>brings together talented creative hubs with
								clients who need their expertise.</span>
						</div>
					</div>
					<div class="item-container">
						<div class="item">
							<svg xmlns="http://www.w3.org/2000/svg" width="70" height="69" viewBox="0 0 70 69"
								fill="none">
								<path
									d="M65.5037 54.625L39.3987 28.4912C42.0724 21.7637 40.7499 13.8287 35.2587 8.36623C28.6462 1.75373 18.3537 1.14998 11.0224 6.49748L22.0624 17.5662L17.9799 21.5625L6.96867 10.6087C1.62117 17.9112 2.22492 28.2325 8.83742 34.8162C14.1849 40.1637 21.9762 41.5725 28.6462 39.0712L54.8374 65.2625C55.9587 66.3837 57.7699 66.3837 58.8912 65.2625L65.5037 58.65C66.6249 57.5 66.6249 55.7462 65.5037 54.625ZM56.8787 59.1962L29.6812 31.9987C27.9274 33.2925 25.9724 34.0687 23.9312 34.3562C20.0212 34.9312 15.9099 33.7525 12.9199 30.7625C10.1887 28.06 8.92367 24.4375 9.12492 20.8725L18.0087 29.7562L30.1987 17.5662L21.3149 8.62498C24.9374 8.48123 28.4737 9.74623 31.2049 12.4487C32.6753 13.9169 33.7677 15.7196 34.3886 17.7025C35.0095 19.6854 35.1403 21.7892 34.7699 23.8337C34.411 25.8941 33.5411 27.8315 32.2399 29.4687L59.4374 56.6375L56.8787 59.1962Z"
									fill="black" />
							</svg>
							<p>Hasilkan</p>
							<span>brings together talented creative hubs with
								clients who need their expertise.</span>
						</div>
					</div>
				</div>
				<div class="cta-section section-2">
					<span>Tentukan kategorimu!</span>
				</div>
				<div class="category-container">
					<div class="categorys">
						<span class="category">Aplikasi & Pengembangan</span>
						<span class="category">Musik dan Kesenian</span>
						<span class="category">Periklanan</span>
						<span class="category">Arsitektur</span>
						<span class="category">Tv & Radion</span>
						<span class="category">Fashion</span>
						<span class="category">Desain Produk</span>
						<span class="category">Fotografi</span>
						<span class="category">Publikasi</span>
						<span class="category">Film, Animasi & Video</span>
						<span class="category">Kerajinan</span>
					</div>
				</div>
				<div class="cta-section section-3">
					<p>TESTIMONI</p>
					<span>Ini kata mereka!</span>
				</div>
				<div class="testimoni-container">
					<div class="testimoni-card">
						<div class="testimoni-text">
							<p>
								Finding the right creative partner for our
								marketing campaign had always been a struggle.
								Freelance platforms were overwhelming, and
								agencies often felt impersonal. Kolab Aja was a
								game-changer.
							</p>
						</div>
						<div class="profile">
							<img src="@/assets/images/hitler.png" alt="profile" />
							<div class="name">
								<span class="username">Kak Gem</span>
								<span class="job">Digital Marketer</span>
							</div>
						</div>
					</div>
					<div class="testimoni-card">
						<div class="testimoni-text">
							<p>
								Website ini benar-benar mengubah cara saya mencari pekerjaan. Dengan berbagai fitur yang
								memudahkan pencarian dan aplikasi pekerjaan, saya berhasil menemukan pekerjaan impian
								saya dalam waktu singkat. Terima kasih telah membuat proses ini begitu sederhana dan
								efisien!
							</p>
						</div>
						<div class="profile">
							<img src="@/assets/images/hirohito.png" alt="profile" />
							<div class="name">
								<span class="username">Yanto</span>
								<span class="job">Graphic Designer</span>
							</div>
						</div>
					</div>
					<div class="testimoni-card">
						<div class="testimoni-text">
							<p>
								Saya sangat puas dengan layanan yang diberikan oleh website ini. Selain menemukan
								peluang kerja yang relevan dengan keahlian saya, saya juga mendapatkan panduan dan tips
								berharga yang membantu saya dalam proses wawancara. Ini adalah platform yang sangat
								berguna bagi siapa saja yang serius dalam mencari pekerjaan!
							</p>
						</div>
						<div class="profile">
							<img src="@/assets/images/Timoty.jpg" alt="profile" />
							<div class="name">
								<span class="username">Timothy Ronald</span>
								<span class="job">Software Engineer</span>
							</div>
						</div>
					</div>
				</div>
				<div class="creative-register-container">
					<div class="creative-register">
						<span>ARE YOU READY?</span>
						<p>
							Connecting You With The Perfect Team Every Step Of
							The Way.
						</p>
						<the-button custom-type="creative-register" @click="redirectTo('register')">Get
							Started</the-button>
					</div>
				</div>
				<div class="cta-section" id="faq">
					<p>FAQs</p>
					<span>Mau tanya apa, nih!</span>
				</div>
				<v-container fluid class="mt-10">
					<v-row justify="center" align="center" class="gap-10">
						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Apa itu platform Kolab Aja?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Kolab Aja adalah platform kolaborasi berbasis web yang menghubungkan anggota
										Creative Hub dengan klien untuk mendorong produktivitas ekonomi kreatif di
										Indonesia.
									</p>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Cara bergabung sebagai <br />Creative Hub?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Anda dapat bergabung dengan Kolab Aja sebagai anggota Creative Hub dengan
										mendaftar melalui formulir pendaftaran yang tersedia di website kami.
									</p>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Manfaat yang didapatkan <br />melalui Kolab Aja?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Dengan menggunakan Kolab Aja, Anda akan mendapatkan akses ke proyek kolaborasi
										yang menarik, kesempatan untuk berkolaborasi dengan profesional.
									</p>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Bagaimana cara mengajukan <br />kolaborasi?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Anda dapat mengajukan proyek kolaborasi dengan mengisi formulir pengajuan proyek
										yang ada di dashboard anggota Creative Hub.
									</p>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Apakah ada biaya untuk <br />menggunakan Kolab Aja?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Tidak, platform ini dirancang untuk memfasilitasi kolaborasi yang fleksibel dan
										terbuka.
									</p>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Bagaimana proses seleksi <br />dan penentuan proyek?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Proses seleksi anggota tim dalam proyek kolaborasi di Kolab Aja dilakukan oleh
										tim pengelola proyek berdasarkan kriteria yang telah ditetapkan.
									</p>
								</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Apakah kolab aja aman?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Yap benar sekali, Kolab Aja merupakan platfom yang menggunakan enkripsi end to end sehingga user dapat merasakan kenyamanan dalam mengguanakn aplikasi tanpa takut data bocor
									</p>
								</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="12" sm="6" md="4" lg="3">
							<v-card class="faq-card" variant="text">
								<v-card-title>
									<v-img src="@/assets/images/faq_quest.png" width="35"></v-img>
									<p class="mt-4" style="font-size: 20px; font-weight: 700; color: #221943;">
										Apa keuntungan kolab aja di bandingkan website lain?
									</p>
								</v-card-title>
								<v-card-text>
									<p style="font-size: 16px; font-weight: 400; color: #221943;">
										Hmm keuntungannya sangat banyak ada <b>Product Owner</b> yang akan membuat project buat kalian dan <b>Controller</b> untuk melakukan manajemen serta proses negosiasi
									</p>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-container>

			</v-col>
		</v-container>
		<the-footer></the-footer>
	</v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheButton from "@/components/common/auth/TheButton.vue";

const typingAnimationTriggered = ref(false);
const showSponsorSection = ref(false);
const sponsorSection = ref(null);
const ctaSection = ref(null);
const router = useRouter();

const redirectTo = (routeName) => {
	router.push({ name: routeName });
};

const handleScroll = () => {
	const windowHeight = window.innerHeight;
	const sponsorSectionElement = sponsorSection.value;
	if (!sponsorSectionElement) return;
	const sponsorSectionPosition =
		sponsorSectionElement.getBoundingClientRect().top;
	showSponsorSection.value = sponsorSectionPosition < windowHeight * 0.9;

	const ctaSectionElement = ctaSection.value;
	if (!ctaSectionElement) return;

	const ctaSectionPosition = ctaSectionElement.getBoundingClientRect().top;

	if (
		ctaSectionPosition < windowHeight * 0.99 &&
		!typingAnimationTriggered.value
	) {
		typingAnimationTriggered.value = true;
		const ctaText = ctaSectionElement.querySelector("span");

		if (!ctaText.classList.contains("typing")) {
			ctaText.classList.add("typing");

			setTimeout(() => {
				ctaText.classList.remove("typing");
			}, 3500);
		}
	}

	const cardContainers = document.querySelectorAll(".item-container");
	cardContainers.forEach((container, index) => {
		const cardPosition = container.getBoundingClientRect().top;

		if (
			cardPosition < windowHeight * 0.8 &&
			!container.classList.contains("show")
		) {
			if (index === 0 && !container.classList.contains("slide-in-left")) {
				container.classList.add("slide-in-left", "show");
			} else if (
				index === 1 &&
				!container.classList.contains("fade-in")
			) {
				container.classList.add("fade-in", "show");
			} else if (
				index === 2 &&
				!container.classList.contains("slide-in-right")
			) {
				container.classList.add("slide-in-right", "show");
			}
		}
	});

	const section2 = document.querySelector(".section-2");
	if (!section2.classList.contains("blur-fade-in")) {
		const section2Position = section2.getBoundingClientRect().top;

		if (section2Position < windowHeight * 0.99) {
			section2.classList.add("blur-fade-in");
		}
	}
	const categories = document.querySelectorAll(".category");
	const categoryContainer = document.querySelector(".category-container");

	const categoryContainerPosition =
		categoryContainer.getBoundingClientRect().top;

	if (categoryContainerPosition < windowHeight * 0.99) {
		categories.forEach((category, index) => {
			setTimeout(() => {
				category.classList.add("fade-in");
			}, index * 300);
		});
		window.removeEventListener("scroll", handleScroll);
	}
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
	handleScroll();
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

img {
	width: 120px;
}

.container {
	padding-top: 200px;
	margin: 0 auto;
	position: relative;
	z-index: 1;
	text-align: center;
}

.hero-text {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: "Outfit", sans-serif;
}

h1 {
	font-size: 7.5em;
	font-weight: bold;
	text-align: center;
	line-height: 1.2;
	white-space: pre-line;
	margin: 40px 0;
}

h1 span {
	color: black;
}

h1 span.highlight {
	color: #8a76d4;
}

p {
	font-weight: bold;
	font-size: 1.5em;
}

.scroll-down-animation {
	height: 40vh;
	overflow: hidden;
	position: relative;
}

.sponsor-section-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 140px;
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.sponsor-section-container.show {
	opacity: 1;
	transform: translateY(0);
}

.sponsor-section-container.hide {
	opacity: 0;
	transform: translateY(20px);
}

.trusted-by {
	font-size: 1.2em;
	font-weight: bold;
	margin-bottom: 10px;
	align-content: flex-start;
	width: 100px;
}

.sponsor-logo-container {
	background-color: #f7f4ff;
	padding: 25px 80px;
	align-items: center;
	gap: 100px;
	flex-wrap: wrap;
	overflow-x: auto;
	border-radius: 10px;
	display: flex;
	justify-content: center;
}

.sponsor-logo-container img {
	max-width: 0 auto;
	max-height: 60px;
	height: auto;
}

.cta-section {
	margin-top: 120px;
	font-size: 3.5em;
	font-weight: bold;
	color: black;
	font-family: "Outfit", sans-serif;
}

.cta-section p {
	font-size: 14pt;
	font-family: "Outfit", sans-serif;
}

.section-1 span {
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
	border-right: 0.15em solid transparent;
	visibility: visible;
}

.section-1 span.typing {
	animation: typing 3.5s steps(40, end) forwards;
}

.section-1 span.typing::after {
	content: "";
	border-right: 0.15em solid #000000;
	animation: blink-caret 0.75s step-end infinite;
}

.how-it-works {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin-top: 40px;
}

.item-container.show {
	opacity: 1;
}

.item-container:nth-child(2) {
	opacity: 0;
}

.item-container {
	display: flex;
	width: 360px;
	height: 314px;
	padding: 70px 35px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 3px solid #f7f4ff;
	cursor: default;
	opacity: 0;
	transition: opacity 0.5s ease;
	box-shadow: 0 91px 25px 0 rgba(205, 195, 250, 0),
		0 58px 23px 0 rgba(205, 195, 250, 0.01),
		0 33px 20px 0 rgba(205, 195, 250, 0.05),
		0 15px 15px 0 rgba(205, 195, 250, 0.09),
		0 4px 8px 0 rgba(205, 195, 250, 0.1);
}

.item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}

.category-container {
	display: flex;
	flex-wrap: wrap;
	margin-top: 20px;
	gap: 1px;
	justify-content: center;
}

.categorys {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	width: 1200px;
}

.categorys .category:hover {
	transform: scale(1.01) !important;
	border-color: #8a76d4;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.category {
	background: #f7f4ff;
	margin: 10px;
	font-size: 1em;
	cursor: default;
	padding: 10px 20px;
	border: 2px solid transparent;
	border-radius: 20px;
	display: inline-block;
	transition: transform 0.3s ease, border-color 0.3s ease,
		box-shadow 0.3s ease;
}

.section-3,
.testimoni-container {
	opacity: 0;
	animation: fadeIn 1s forwards;
}

.testimoni-container {
	opacity: 0;
	animation: fadeIn 1s forwards;
	display: flex;
	justify-content: center;
	margin-top: 40px;
	gap: 10px;
	cursor: default;
}

.testimoni-card {
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	width: 510px;
	padding: 30px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 27px;
	border: 3px solid #f7f4ff;
	background: #fff;
	box-shadow: 0 91px 25px 0 rgba(205, 195, 250, 0),
		0 58px 23px 0 rgba(205, 195, 250, 0.01),
		0 33px 20px 0 rgba(205, 195, 250, 0.05),
		0 15px 15px 0 rgba(205, 195, 250, 0.09),
		0 4px 8px 0 rgba(205, 195, 250, 0.1);
}

.testimoni-text {
	width: 100%;
	font-size: small;
	color: #000;
	font-family: "Outfit", sans-serif;
	font-style: normal;
	text-align: left;
	margin: 0;
}

.testimoni-text p {
	font-weight: normal;
	font-size: 1.5em;
}

.profile {
	display: flex;
	align-items: center;
	gap: 20px;
}

.profile img {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.name {
	display: flex;
	flex-direction: column;
	text-align: left;
	font-family: "Outfit", sans-serif;
}

.name .username {
	font-size: 1.2em;
	font-weight: bold;
	font-family: "Outfit", sans-serif;
}

.name .job {
	font-size: 0.8em;
	font-family: "Outfit", sans-serif;
}

.testimoni-card:hover {
	transform: scale(1.05);
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}

.creative-register-container {
	display: flex;
	justify-content: center;
	margin: 140px 0 0 0;
}

.creative-register {
	padding: 60px 80px;
	display: block;
	background-color: #140b31;
	color: white;
	width: 1100px;
	border-radius: 20px;
}

.creative-register span {
	font-family: "Outfit", sans-serif;
}

.creative-register p {
	margin: 10px 60px 50px 60px;
	font-size: 3.5em;
	font-weight: bold;
	font-family: "Outfit", sans-serif;
}

.fade-in {
	animation: fadeIn 1s ease-in-out forwards;
}

.blur-fade-in {
	animation: blurFadeIn 1s ease-in-out;
}

.slide-in-left {
	animation: slideInLeft 1s ease-in-out forwards;
}

.slide-in-right {
	animation: slideInRight 1s ease-in-out forwards;
}

/* faq styling */
.faq-card {
	text-align: left;
	border-radius: 10px;
	border: 1px solid #dee4f0;
	background: #f7f4ff;
	width: 341px;
	height: 327px;
	padding: 30px 20px;
}

.small-circle {
	width: 345px;
	height: 345px;
	flex-shrink: 0;
	border-radius: 50%;
	background: linear-gradient(180deg, rgba(77, 28, 255, 0.70) 0%, rgba(226, 134, 244, 0.70) 100%);
	background-blend-mode: overlay;
	filter: blur(34px);
	position: absolute;
	z-index: -1;
	left: -13%;
	top: 3%;
	transform: translateY(-50%);
	animation: slideInFromLeft 2s ease-out forwards;
}

.small-circle-bottom {
	width: 345px;
	height: 345px;
	flex-shrink: 0;
	border-radius: 50%;
	background: linear-gradient(180deg, rgba(77, 28, 255, 0.70) 0%, rgba(226, 134, 244, 0.70) 100%);
	background-blend-mode: overlay;
	filter: blur(34px);
	position: absolute;
	z-index: -1;
	right: -12%;
	top: 95%;
	transform: translateY(-50%);
	animation: slideInFromRight 2s ease-out forwards;
}

.medium-circle {
	width: 520px;
	height: 520px;
	flex-shrink: 0;
	border-radius: 520px;
	background: linear-gradient(180deg, rgba(77, 28, 255, 0.70) 0%, rgba(226, 134, 244, 0.70) 100%);
	background-blend-mode: overlay;
	filter: blur(41px);
	position: absolute;
	z-index: -1;
	left: -20%;
	top: 80%;
	transform: translateY(-50%);
	animation: slideInFromLeft 2s ease-out forwards;
}

.big-circle {
	width: 690px;
	height: 690px;
	flex-shrink: 0;
	border-radius: 690px;
	background: linear-gradient(180deg, rgba(77, 28, 255, 0.70) 0%, rgba(226, 134, 244, 0.70) 100%);
	background-blend-mode: overlay;
	filter: blur(48px);
	position: absolute;
	z-index: -1;
	right: -22%;
	top: 8%;
	transform: translateY(-50%);
	animation: slideInFromRight 2s ease-out forwards;
}

@media (max-width: 1024px) {
	h1 {
		font-size: 5.5em;
	}

	p {
		font-size: 1.3em;
	}

	.trusted-by {
		font-size: 1.1em;
		width: auto;
	}

	.sponsor-logo-container {
		padding: 20px 60px;
		gap: 80px;
	}

	.sponsor-logo-container img {
		max-width: 70px;
	}

	.cta-section {
		font-size: 3em;
	}

	.section-1 span.typing {
		animation: typing 2.5s steps(40, end) forwards;
	}

	.how-it-works {
		flex-direction: column;
		align-items: center;
	}

	.item-container {
		width: 60%;
		margin-bottom: 20px;
	}

	.categorys {
		max-width: 800px;
	}

	.testimoni-card {
		width: 400px;
	}

	.creative-register {
		width: 90%;
		padding: 50px 60px;
	}

	.creative-register p {
		font-size: 3em;
		margin: 10px 40px 40px 40px;
	}
}

@media (max-width: 768px) {
	.hero-text {
		padding: 20px;
	}

	h1 {
		font-size: 4.5em;
	}

	p {
		font-size: 1.2em;
	}

	.scroll-down-animation {
		height: 30vh;
	}

	.sponsor-section-container {
		margin-top: 80px;
	}

	.trusted-by {
		font-size: 1em;
		width: auto;
	}

	.sponsor-logo-container {
		display: flex;
		justify-content: center;
		gap: 45px !important;
	}

	.sponsor-logo-container img {
		max-width: 60px;
	}

	.cta-section {
		font-size: 2em;
	}

	.section-1 span.typing {
		animation: typing 2.5s steps(40, end) forwards;
	}

	.item-container {
		width: 70%;
	}

	.categorys {
		max-width: 600px;
	}

	.testimoni-container {
		flex-direction: column;
		gap: 20px;
	}

	.testimoni-card {
		width: 90%;
		margin: 0 auto;
	}

	.container {
		padding-top: 50px;
	}

	.creative-register {
		width: 100%;
		padding: 40px 20px;
	}

	.creative-register p {
		font-size: 2em;
		margin: 10px 20px 30px 20px;
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideInFromRight {
	0% {
		transform: translateX(100%);
	}

	100% {
		transform: translateX(0);
	}
}

@keyframes slideInFromLeft {
	0% {
		transform: translateX(-100%);
	}

	100% {
		transform: translateX(0);
	}
}

@keyframes fadeOutDown {
	from {
		opacity: 1;
		transform: translateY(0);
	}

	to {
		opacity: 0;
		transform: translateY(20px);
	}
}

@keyframes slideInLeft {
	from {
		opacity: 0;
		transform: translateX(-20px);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes slideInRight {
	from {
		opacity: 0;
		transform: translateX(20px);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes blurFadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes typing {
	from {
		width: 0;
	}

	to {
		width: 100%;
	}
}

@keyframes blink-caret {

	from,
	to {
		border-color: transparent;
	}

	50% {
		border-color: #000000;
	}
}

.faq-card {
	padding: 16px;
	border-radius: 8px;
	text-align: left;
}

.faq-title {
	font-size: 20px;
	font-weight: 700;
	color: #221943;
	margin-left: 10px;
}

.faq-text {
	font-size: 16px;
	font-weight: 400;
	color: #221943;
}
</style>