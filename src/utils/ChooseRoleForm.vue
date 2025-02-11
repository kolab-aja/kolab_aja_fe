<template>
  <!-- Jika device berukuran kecil (mobile) -->
  <template v-if="smAndDown">
    <div class="mobile-view">
      <v-container class="custom-container d-flex flex-column align-center py-10">
        <v-img src="@/assets/images/logo-kolab-aja.png" height="40" class="my-8" />
        <v-col>
          <h1 class="text-h3 font-weight-bold">Pilih Peranmu!</h1>
          <p class="desc text-h5">Masuk sebagai?</p>
        </v-col>

        <v-row class="gap-4">
          <v-col v-for="item in roleList" :key="item.roleId" cols="12" md="4">
            <v-card :class="{ 'active-card': selectedRoleId === item.roleId }" class="pa-5 border role-card"
              variant="flat" @click="changeRole(item.roleId)">
              <v-card-title class="d-flex justify-left pb-6">
                <v-icon :icon="item.icon" size="x-large"
                  :color="selectedRoleId === item.roleId ? 'white' : ''"></v-icon>
              </v-card-title>
              <v-card-title :class="{ 'text-white': selectedRoleId === item.roleId }" class="text-h5">
                {{ item.name }}
              </v-card-title>
              <v-card-text :class="selectedRoleId === item.roleId ? 'role-desc-active' : 'role-desc'">
                {{ item.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Tombol Aksi dan Link Sign In -->
        <v-col class="action-section mt-8 text-center">
          <v-btn class="btn-role text-h6 text-capitalize mb-4" @click="handleNext">
            <p class="text-white m-0">Masuk Sebagai {{ selectedRoleName }}</p>
            <v-icon class="ml-1" color="white" icon="mdi-arrow-right" />
          </v-btn>
          <p>
            Sudah punya akun?
            <a href="/Login" class="sign-up-link font-weight-bold" style="color: #8a76d4">
              Sign In
            </a>
          </p>
        </v-col>
      </v-container>
    </div>
  </template>

  <!-- Jika device berukuran desktop -->
  <template v-else>
    <div class="desktop-view">
      <v-container class="mt-auto mb-auto custom-container d-flex flex-column ga-10">
        <v-img src="@/assets/images/logo-kolab-aja.png" position="left" height="40"
          class="mt-n16 mb-16 ml-md-n10 ml-sm-0" />
        <v-col>
          <h1 class="text-h3 font-weight-bold">Pilih Peranmu!</h1>
          <p class="desc text-h5">Masuk sebagai?</p>
        </v-col>

        <v-row>
          <v-col v-for="item in roleList" :key="item.roleId">
            <!-- Jika role belum dipilih -->
            <v-card v-if="selectedRoleId != item.roleId" variant="flat" class="pa-5 border role-card fixed-width h-100"
              @click="changeRole(item.roleId)">
              <v-card-title class="d-flex justify-left pb-12">
                <v-icon :icon="item.icon" size="x-large"></v-icon>
              </v-card-title>
              <v-card-title class="text-h5">{{ item.name }}</v-card-title>
              <v-card-text class="role-desc">
                {{ item.description }}
              </v-card-text>
            </v-card>
            <!-- Jika role terpilih -->
            <v-card v-if="selectedRoleId == item.roleId" variant="flat"
              class="pa-5 border role-card fixed-width h-100 active-card" @click="changeRole(item.roleId)">
              <v-card-title class="d-flex justify-left pb-12">
                <v-icon :icon="item.icon" size="x-large" color="white"></v-icon>
              </v-card-title>
              <v-card-title class="text-h5 text-white">{{ item.name }}</v-card-title>
              <v-card-text class="role-desc-active">
                {{ item.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Tombol Aksi dan Link Sign In -->
        <v-col class="action-section">
          <v-btn class="btn-role text-h6 text-capitalize mb-3" @click="handleNext">
            <p class="text-white">Masuk Sebagai {{ selectedRoleName }}</p>
            <v-icon class="ml-1" color="white" icon="mdi-arrow-right" />
          </v-btn>
          <p class="ml-5">
            Sudah punya akun?
            <a href="/Login" class="sign-up-link font-weight-bold" style="color: #8a76d4">
              Sign In
            </a>
          </p>
        </v-col>
      </v-container>
    </div>
  </template>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const roleList = [
  {
    roleId: 3,
    name: "Client",
    icon: "mdi-account",
    description: "Tinggal tambahkan proyek dan tunggu notifikasi selesai!",
  },
  {
    roleId: 2,
    name: "Controller",
    icon: "mdi-cogs",
    description: "Ciptakan alur kerja yang lebih baik untuk klien dan creative hub.",
  },
  {
    roleId: 1,
    name: "Creative Hub",
    icon: "mdi-lightbulb",
    description: "Kami menyediakan agensi dan tim terbaik untuk Anda.",
  },
];

const selectedRoleId = ref(3);

const selectedRoleName = computed(() => {
  return roleList.find((role) => role.roleId === selectedRoleId.value)?.name;
});

const emit = defineEmits(["emits-click"]);

const changeRole = (roleId) => {
  selectedRoleId.value = roleId;
};

const handleNext = () => {
  emit("emits-click", selectedRoleId.value);
};
</script>

<style scoped>
/* ==================== */
/* Styling untuk Mobile */
/* ==================== */
.mobile-view * {
  font-family: "Outfit", sans-serif;
}

.mobile-view .custom-container {
  max-width: 1200px;
  padding: 2rem;
}

.mobile-view .desc {
  font-size: 1.2rem;
  color: rgba(34, 25, 67, 0.6);
}

.mobile-view .role-desc {
  font-size: 1rem;
  color: rgba(34, 25, 67, 0.7);
}

.mobile-view .role-desc-active {
  color: #dee4f0;
}

.mobile-view .active-card {
  background-color: #221943;
  color: #fff;
}

.mobile-view .btn-role {
  min-height: 3rem;
  padding: 0.5rem 2rem;
  border-radius: 50px;
  background-color: #46377d;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mobile-view .text-white {
  color: #ffffff !important;
}

.mobile-view .m-0 {
  margin: 0;
}

.mobile-view h1,
.mobile-view p,
.mobile-view .v-icon {
  color: #221943;
}

.mobile-view .v-card-title {
  font-weight: 600;
}

@media (max-width: 600px) {
  .mobile-view .text-center {
    text-align: center;
  }
}

/* ====================== */
/* Styling untuk Desktop  */
/* ====================== */
.desktop-view * {
  font-family: "Outfit", sans-serif;
}

.desktop-view .desc {
  font-size: 1vw;
  line-height: 1.5;
  color: rgba(34, 25, 67, 0.5);
}

.desktop-view .role-desc {
  font-size: 14px;
  color: rgba(34, 25, 67, 0.5) !important;
}

.desktop-view .role-desc-active {
  color: rgba(222, 228, 240, 1) !important;
}

.desktop-view .active-card {
  background: rgba(34, 25, 67, 1);
}

.desktop-view .btn-role {
  height: 4vw !important;
  color: #fff;
  text-transform: capitalize;
  padding: 0.7vw 2vw;
  border-radius: 500vw;
  background: #46377d;
}

.desktop-view h1,
.desktop-view p,
.desktop-view .v-icon {
  color: #221943;
}

.desktop-view .v-card-title {
  font-weight: 600;
}

.desktop-view .v-card-text {
  font-size: 1vw;
  color: rgba(34, 25, 67, 0.2);
}

@media (min-width: 1920px) {
  .desktop-view .custom-container {
    max-width: 1200px;
  }
}

@media (max-width: 600px) {
  .desktop-view .text-center.text-sm-left {
    text-align: center;
  }
}
</style>
