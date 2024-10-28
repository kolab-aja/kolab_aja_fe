<template>
	<v-app-bar app flat>
		<v-container>
			<v-row align="center" justify="space-between">
				<v-col cols="3" class="text-center">
					<slot name="left">
						<v-img><img src="@/assets/images/logo-kolab-aja.png" alt="logo"
								@click="redirectTo('/')" /> </v-img>
					</slot>
				</v-col>
				<v-col cols="6" class="text-center center">
					<slot name="center">
						<div class="navbar-links" :class="{ 'navbar-links-mobile': showMenu }">
							<a class="navbar-link" @click="redirectTo('/about-us')">About Us</a>
							<a class="navbar-link" @click="scrollToFooter">Layanan</a>
							<a class="navbar-link" @click="scrollToFaq">FAQ</a>
						</div>
					</slot>
				</v-col>
				<v-col cols="3" class="text-center">
					<slot name="right">
						<div class="navbar-links" v-if="computedItem == 'public'">
							<TheButton customType="sign-in" @click="redirectTo('/login')">Login</TheButton>
							<TheButton customType="sign-up" @click="redirectTo('/register')">Sign Up</TheButton>
						</div>
						<div class="navbar-links" v-else-if="computedItem == 'progress'">
							<TheButton customType="sign-up" @click="redirectTo(`/${userRole}/progress`)">Progress Page
							</TheButton>
						</div>
						<div class="navbar-links" v-else-if="computedItem == 'my-team'">
							<TheButton customType="sign-up" @click="redirectTo(`/creative-hub-admin/my-team`)">My Team
								Page</TheButton>
						</div>
						<v-menu>
							<template v-slot:activator="{ props }">
								<v-btn icon="mdi-dots-vertical" v-bind="props" class="hamburger-icon"
									@click="showMenu = !showMenu"></v-btn>
							</template>

							<v-list>
								<v-list-item v-for="(item, i) in items" :key="i" @click="redirectTo(item.route)">
									<v-list-item-title>{{ item.title }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</slot>
				</v-col>
			</v-row>
		</v-container>
	</v-app-bar>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, nextTick } from 'vue';
import TheButton from "@/components/common/auth/TheButton.vue";
import { useAuthStore } from "@/store/auth";

const showMenu = ref(false);
const router = useRouter();
const route = useRoute();

// scrollto
const scrollToFooter = () => {
	const footerElement = document.getElementById('footer');
	footerElement.scrollIntoView({ behavior: 'smooth' });
}

const scrollToFaq = async () => {
	if (route.path === '/about-us') {
		await router.push({ path: '/', hash: '#faq' });
		await nextTick();
		const faqElement = document.getElementById('faq');
		if (faqElement) {
			faqElement.scrollIntoView({ behavior: 'smooth' });
		}
	} else {
		const faqElement = document.getElementById('faq');
		if (faqElement) {
			faqElement.scrollIntoView({ behavior: 'smooth' });
		}
	}
}

const fixRoute = [
	{ title: 'About Us', route: '/about-us' },
	// { title: 'Forum', route: '/forum' },
	// { title: 'FAQ', route: '/faq' },
]

const items = ref(fixRoute);

const authStore = useAuthStore();
const userRole = authStore.userRoles;

const computedItem = computed(() => {
	if (["controller", "client", "creative-hub-team"].includes(userRole)) {
		items.value = [...items.value, { title: "Progress", route: `/${userRole}/progress` }]
		return "progress"
	} else if (userRole === "creative-hub-admin") {
		items.value = [...items.value, { title: "My Team", route: "/creative-hub-admin/my-team" }]
		return "my-team"
	} else {
		// NOT LOGIN USER
		items.value = [
			...items.value,
			{ title: "Login", route: "/login" },
			{ title: "Sign Up", route: "/register" }
		]
		return "public"
	}
})

const redirectTo = (route) => {
	router.push(route);
};
</script>

<style scoped>
* {
	font-family: 'Outfit', sans-serif;
}

img {
	width: 120px;
	cursor: pointer;
}

.navbar-links {
	display: flex;
	justify-content: center;
	gap: 20px;
}

.navbar-link {
	color: black;
	font-weight: bold;
	text-decoration: none !important;
	margin: 0 20px;
}

.navbar-link:hover {
	text-decoration: underline;
	color: #464646;
	cursor: pointer;
}

.hamburger-icon {
	display: none;
}

@media (max-width: 768px) {
	.navbar-links {
		display: none;
		flex-direction: column;
		background-color: white;
		position: absolute;
		top: 70px;
		right: 10px;
		border-radius: 8px;
		overflow: hidden;
		z-index: 1000;
	}

	.navbar-links.navbar-links-mobile {
		display: flex;
	}

	.hamburger-icon {
		display: flex;
		margin-left: auto;
	}
}
</style>
