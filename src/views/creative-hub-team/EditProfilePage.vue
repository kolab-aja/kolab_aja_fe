<template>
    <v-app>
        <TheSidebar>
            <v-container class="profile-settings">
                <v-row>
                    <v-col>
                        <h1>Pengaturan Profile</h1>
                    </v-col>
                </v-row>

                <v-row class="mb-4">
                    <div class="mx-7">
                        <v-avatar size="150">
                            <v-skeleton-loader v-if="isLoading" type="image" :height="150" :width="150" />
                            <img v-else src="https://via.placeholder.com/150" alt="Avatar" />
                        </v-avatar>
                    </div>
                    <div class="mx-7">
                        <h2 v-if="!isLoading">{{ nama }}</h2>
                        <v-skeleton-loader v-else type="heading" height="30px"></v-skeleton-loader>
                        <p>
                            <span v-if="!isLoading">
                                <v-icon left>mdi-map-marker</v-icon>
                                {{ lokasi }}
                            </span>
                            <v-skeleton-loader v-else type="text" width="100px"></v-skeleton-loader>
                        </p>
                    </div>
                </v-row>

                <v-row>
                    <v-col>
                        <v-form @submit.prevent="simpan">
                            <v-row>
                                <v-col cols="12">
                                    <label class="v-title mb-7">Detail Profile</label>
                                    <v-skeleton-loader v-if="isLoading" type="text" height="200px" />
                                    <ckeditor v-else :editor="editor" v-model="deskripsi" :config="editorConfig"
                                        class="ckeditor"></ckeditor>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-skeleton-loader v-if="isLoading" type="text" width="100%" />
                                    <v-text-field v-else v-model="website" label="Website" outlined
                                        class="rounded-input"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-skeleton-loader v-if="isLoading" type="text" width="100%" />
                                    <v-text-field v-else v-model="mediaSocial" label="Media sosial" outlined
                                        class="rounded-input"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-skeleton-loader v-if="isLoading" type="text" width="100%" />
                                    <v-text-field v-else v-model="controllerFee" label="Team Fee" outlined
                                        class="rounded-input"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-skeleton-loader v-if="isLoading" type="text" height="50px" />
                                    <v-combobox v-else v-model="expertise" :items="expertiseOptions" label="Expertise"
                                        multiple chips clearable small-chips outlined
                                        class="rounded-input"></v-combobox>
                                </v-col>
                            </v-row>

                            <v-divider class="my-4"></v-divider>

                            <v-row>
                                <v-col>
                                    <TheButton type="primary" @click.prevent="simpan">Simpan</TheButton>
                                    <TheButton type="secondary" @click.prevent="batal">Batal</TheButton>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </TheSidebar>
    </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TheSidebar from '@/components/controller/TheSidebar.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useProfileStore } from '@/store/profile.js';
import { useSnackbarStore } from "@/store/snackbar";
import router from "@/router";
import TheButton from '@/components/common/TheButton.vue';
import TheFieldInput from '@/components/common/auth/TheFieldInput.vue';

const profileStore = useProfileStore();
const snackbarStore = useSnackbarStore();

// States for form fields
const nama = ref('');
const email = ref('');
const telepon = ref('');
const controllerFee = ref(null);
const deskripsi = ref('');
const expertise = ref([]);
const lokasi = ref('');
const isLoading = ref(false);

// Options for select and combobox
const controllerFeeOptions = [5, 10, 15];
const expertiseOptions = ref([]); // Updated to use ref

// CKEditor configuration
const editor = ClassicEditor;
const editorConfig = {
    // Configuration options
};

onMounted(async () => {
    try {
        isLoading.value = true;
        await profileStore.getProfile();

        nama.value = profileStore.data.data_pengguna.nama || '';
        email.value = profileStore.data.data_pengguna.email || '';
        telepon.value = profileStore.data.data_pengguna.telepon || '';
        controllerFee.value = profileStore.data.data_pengguna.fee || null;
        deskripsi.value = profileStore.data.data_pengguna.profil_detail || '';
        expertise.value = JSON.parse(profileStore.data.data_pengguna.spesialisasi) || [];
        lokasi.value = profileStore.data.data_pengguna.lokasi || '';

        expertiseOptions.value = profileStore.data.spesialisasi.map(item => item.nama) || [];
        isLoading.value = profileStore.isLoading;
    } catch (error) {

    } finally {
        isLoading.value = false;
    }
});

// Methods for form submission
const simpan = async () => {
    try {
        const profileData = {
            nama: nama.value,
            email: email.value,
            telepon: telepon.value,
            fee: controllerFee.value,
            profil_detail: deskripsi.value,
            spesialisasi: expertise.value,
            lokasi: lokasi.value
        };

        await profileStore.updateProfile(profileData);

        snackbarStore.showSnackbar({
            type: 'success',
            message: 'Data berhasil di update',
            timeout: 5000,
        });

        router.push(`/creative-hub-team/profile`)

    } catch (error) {
        snackbarStore.showSnackbar({
            message: error.response.data.errors,
            timeout: 5000,
        });
    }
}

const batal = () => {
    router.push(`/controller/profile/${profileStore.id}`)
}
</script>

<style scoped>
.profile-settings {
    max-width: auto;
    margin: 0 auto;
}

h1 {
    font-size: 24px;
    font-weight: bold;
}

h2 {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

h2 v-icon {
    margin-right: 8px;
}

.rounded-input .v-input__control {
    border-radius: 10%;
}

.ck-editor__editable_inline {
    min-height: 200px;
}

v-card {
    margin-bottom: 20px;
}

.v-title {
    font-size: larger;
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
}

.v-label {
    font-size: medium;
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
}

.v-overlay {
    position: absolute;
    z-index: 10;
}
</style>
