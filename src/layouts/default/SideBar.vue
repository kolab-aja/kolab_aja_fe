<template>
  <v-app>
    <v-app-bar-nav-icon class="toggle-icon" @click="toggleDrawer">
      <v-icon>{{ drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
    </v-app-bar-nav-icon>
    <transition name="slide">
      <v-navigation-drawer
        class="custom-drawer"
        v-model="drawer"
        app
        permanent
        width="0"
      >
        <v-list class="sidebar-container">
          <v-list class="menu-items">
            <v-list-item class="img-container">
              <v-list-item-action @click="toggleDrawer">
                <v-img class="icon">
                  <img src="@/assets/images/logo-kolab-aja-white.png" alt="logo" />
                </v-img>
                <v-icon class="toggle-icon">{{ drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-subheader class="v-subheader">Navigation</v-subheader>
            <v-list-item
              v-for="item in navigationMenu"
              :key="item.title"
              :href="item.route"
              :class="{
                'selected': item.route === activeAt
              }"
              link
              class="text-style"
            >
              <v-list-item-content class="icon-text">
                <v-icon class="icon">{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-list-item link class="sign-out" @click="logout">
            <v-list-item-content class="icon-text">
              <v-icon class="icon">mdi-logout</v-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </transition>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const drawer = ref(true);
const authStore = useAuthStore();
const router = useRouter();

const navigationMenu = ref([
  { title: 'Profile', route: '/profile', icon: 'mdi-account' },
  { title: 'Progress', route: '/progress', icon: 'mdi-chart-line' },
  { title: 'Pembayaran', route: '/payment-method', icon: 'mdi-cash' }
]);


const props = defineProps({
  activeAt: {
    type: String,
    required: false,
  }
})

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped>
* {
  font-family: "Outfit", sans-serif;
}

.toggle-icon {
  transition: transform 0.3s ease;
  border-radius: 50%;
  background-color: #46377D;
}

.toggle-icon:active {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.img-container {
  width: 100%;
  margin-bottom: 50px;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  display: flex;
  align-items: center;
  padding: 12px;
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
  width: 16vw;
  height: 100vh;
  padding: 50px 40px;
  color: #FFFFFF;
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
  border-radius: 10px !important;
  transition: background 0.3s ease, color 0.3s ease;
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
  color: #221943;
  cursor: pointer;
}

.icon-text {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 8px;
}

.sign-out {
  background-color: #cf455e;
  padding: 12px;
  border-radius: 10px !important;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}
</style>
