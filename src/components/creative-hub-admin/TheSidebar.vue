<template>
	<v-app-bar order="1" elevation="0" height="90" class="app-bar">
		<v-app-bar-nav-icon
			class="hamburger-app-bar"
			@click="toggleDrawer"
			v-if="!drawer"
		>
			<v-btn
				color="white"
				class="hamburger-icon"
				size="50"
				ripple
				elevation="8"
			>
				<v-icon icon="mdi-menu" color="primary"></v-icon>
			</v-btn>
		</v-app-bar-nav-icon>
		<v-app-bar-title class="title" :class="drawer ? 'app-bar-title-open-drawer' : 'app-bar-title-closed-drawer'"
			>{{ navbarTitle }}</v-app-bar-title
		>
		<div class="d-flex align-center ga-3">
			<v-avatar size="36" image="@/assets/images/default-profile-picture.png"></v-avatar>
			<p>{{ profileStore.data ? profileStore.data.data_pengguna.nama : 'New User' }}</p>
		</div>
	</v-app-bar>
	<v-navigation-drawer class="custom-drawer" v-model="drawer" :width="300">
		<v-list class="sidebar-container">
			<v-list class="menu-items">
				<v-list-item-action @click="toggleDrawer" style="display: flex">
					<v-img class="icon">
						<img
							src="@/assets/images/logo-kolab-aja-white.png"
							alt="logo"
						/>
					</v-img>
					<v-icon class="toggle-icon">{{
						drawer ? "mdi-chevron-left" : "mdi-chevron-right"
					}}</v-icon>
				</v-list-item-action>

				<template v-for="(items, header) in Menu">
					<div class="v-subheader">{{ header }}</div>
					<v-list-item
						v-for="item in items"
						:key="item.title"
						:href="item.route"
						:class="{
							selected: item.route === activeAt,
						}"
						link
						class="text-style"
					>
						<div class="icon-text">
							<v-icon class="icon">{{ item.icon }}</v-icon>
							<v-list-item-title style="font-weight: bold">{{
								item.title
							}}</v-list-item-title>
						</div>
					</v-list-item>
				</template>
			</v-list>

			<v-btn link class="sign-out" @click="logout">
				<v-icon class="icon" color="white">mdi-logout</v-icon>
				<v-list-item-title color="white">Logout</v-list-item-title>
			</v-btn>
		</v-list>
	</v-navigation-drawer>
	<v-main>
		<v-container fluid :class="drawer ? 'container-open-drawer' : 'container-closed-drawer'">
			<slot></slot>
		</v-container>
	</v-main>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import router from "@/router";
import { useProfileStore } from "@/store/profile";

const drawer = ref(true);
const authStore = useAuthStore();
const profileStore = useProfileStore();

const Menu = {
	Navigation: [
		{ title: "Profil", route: "/creative-hub-admin/profile", icon: "mdi-account" },
		{ title: "Team Saya", route: "/creative-hub-admin/my-team", icon: "mdi-account-multiple" }
	],
};

const props = defineProps({
	activeAt: {
		type: String,
		required: false,
	},
	navbarTitle: {
		type: String,
		required: false,
	}
});

const handleTambahTeam = () => {
	router.push("/")
}

const logout = async () => {
	try { await authStore.logout() }
	catch (err) {}
};

const toggleDrawer = () => {
	drawer.value = !drawer.value;
};

</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.test {
	background-color: blue;
}

.toggle-icon {
	transition: transform 0.3s ease;
	border-radius: 50%;
	background-color: #46377d;
}

.toggle-icon:active {
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 50%;
}

.hamburger-app-bar {
	transition: transform 0.3s ease;
	opacity: 0.6;
}

.hamburger-app-bar:hover {
	opacity: 1;
}

.hamburger-icon {
	transition: transform 0.3s ease;
	background-color: #8a76d456 !important;
	border-radius: 0px 5px 5px 0px;
}

.title {
	font-size: 39px;
	font-weight: bold;
	line-height: normal !important;
}

img {
	width: 150px;
}

.menu-items {
	flex-grow: 1;
}

.sidebar-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.custom-drawer {
	display: flex;
	flex-direction: column;
	transition: transform 0.3s ease, width 0.3s ease, padding 0.3s ease;
	height: 100vh;
	padding: 50px 40px;
	color: #ffffff;
	border-radius: 0 20px 20px 0;
	border: 1px solid #030405;
	background: linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(0, 0, 0, 0.2) 100%
		),
		#221943;
}

.text-style {
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: 120%;
	display: flex;
	align-items: center;
	padding: 12px;
	margin-top: 7px;
	border-radius: 10px !important;
	transition: background 0.3s ease, color 0.3s ease;
	color: #dee4f0;
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
	transform: translateX(-100%);
}

.v-subheader {
	color: #fd9326;
	font-weight: 700;
	margin-top: 30px;
	display: flex;
	align-items: center;
}

.text-style:hover {
	background: #dee4f0;
	color: #221943;
	cursor: pointer;
}

.selected {
	background: #dee4f0;
	color: #221943 !important;
	cursor: pointer;
}

.icon-text {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.icon {
	margin-right: 8px;
}

.sign-out {
	background-color: #cf455e !important;
	padding: 12px;
	border-radius: 10px !important;
	font-size: 16px !important;
	font-style: normal;
	font-weight: bold;
	line-height: 120%;
	display: flex;
	align-items: center;
	cursor: pointer;
	justify-content: center;
	color: white;
}

/* FOR RESPONSIVE NAVBAR | NOTES : TO DEBUG RECOMMEND TO ADD DIFFERENT BACKGROUND COLOR TO ALL */

.app-bar {
	padding-right: 30px !important;
}

.app-bar-title-open-drawer {
	margin-left: 60px !important;
}

.app-bar-title-closed-drawer {
	margin-left: 30px !important;
}

.container-open-drawer {
	padding-left: 60px !important;
	padding-right: 30px !important;
}

.container-closed-drawer {
	padding-left: 84px !important;
	padding-right: 30px !important;
}

@media (max-width: 1279px) {
	/* WHEN SCREEN < 1280 AND DRAWER OPEN, THE HAMBURGER MENU WILL DISAPPER AND MAKE THE SIZING CHANGING, */
	/* SO ADD THE HAMBURGER MENU WIDTH TO REPLACE THE MISSING HAMBURGER MENU SPACE */
	.app-bar-title-open-drawer {
		margin-left: 84px !important;
	}

	.container-open-drawer {
		padding-left: 84px !important;
	}
}

@media (max-width: 600px) {
	.container-closed-drawer {
		padding-left: 30px !important;
	}

	.container-open-drawer {
		padding-left: 30px !important;
	}
}

</style>
