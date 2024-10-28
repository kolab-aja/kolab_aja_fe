<template>
    <v-app>
        <TheSidebar active-at="/client/profile" navbar-title="Pengaturan Profil">
            <TheVCol class="d-flex flex-column ga-8" max-width="1200">

                <TheVRow class="d-flex align-center ga-4">
                    <v-avatar size="80" image="@/assets/images/default-profile-picture.png" style="border: 2px solid #8A76D4" />
                    <TheVCol class="d-flex flex-column justify-center">
                        <p style="font-size: 20px; font-weight: bold;">{{ name }}</p>
                        <p style="font-size: 16px; color: #87868B; font-weight: 500;">{{ wilayah }}</p>
                    </TheVCol>
                    <TheButton prefix-icon="mdi-pencil" size="text-icon-m" @click="handleEditProfile">Edit</TheButton>                
                </TheVRow>

                <v-divider />
                    
                <h2 style="font-size: 20px; font-family: 500;">Informasi Pengguna</h2>

                <TheVCol>
                    <p>Nama</p>
                    <p class="content">{{ name }}</p>
                </TheVCol>

                <TheVCol>
                    <p>Alamat Email</p>
                    <p class="content">{{ email }}</p>
                </TheVCol>

                <TheVCol>
                    <p>Nomor Telepon</p>
                    <p class="content">{{ phoneNumber }}</p>
                </TheVCol>

                <v-divider />

                <h2 style="font-size: 20px; font-family: 500;">Informasi Lokasi</h2>

                <TheVCol>
                    <p>Wilayah</p>
                    <p class="content">{{ wilayah }}</p>
                </TheVCol>

                <TheVCol>
                    <p>Alamat</p>
                    <p class="content">{{ alamat }}</p>
                </TheVCol>

            </TheVCol>
        </TheSidebar>
    </v-app>
</template>

<script setup>
    import TheSidebar from '@/components/client/TheSidebar.vue';
    import TheButton from '@/components/common/TheButton.vue';
    import TheVCol from '@/components/common/TheVCol.vue';
    import TheVRow from '@/components/common/TheVRow.vue';
    import router from '@/router';
    import { useProfileStore } from '@/store/profile';

    const profileStore = useProfileStore();

    let name, email, phoneNumber, wilayah, alamat = "";

    name = profileStore.data.data_pengguna.nama || '';
    email = profileStore.data.data_pengguna.email || '';
    phoneNumber = profileStore.data.data_pengguna.nomor_telepon || '';
    wilayah = profileStore.data.data_pengguna.lokasi || '';
    alamat = profileStore.data.data_pengguna.alamat || '';

    const handleEditProfile = () => {
        router.push("/client/edit-profile")
    }

</script>

<style scoped>
    .content {
        font-weight: bold;
        font-size: 20px;
    }
</style>