<template>
    <TheButton size="icon-m" type="primary-icon-2" icon="mdi-file-document-check-outline" @click="handleInvitation()" />

    <v-dialog v-model="invitation" persistent max-width="1000px">
        <v-card style="padding: 25px; border-radius: 20px;">
            <v-card-title class="justify-space-between d-flex">
                <v-card-title style="font-size: 30px; font-weight: bold" class="d-flex flex-row align-center ga-2 mb-2">
                    <v-icon size="40" color="lightGray">mdi-email-open-outline</v-icon> Project invitation
                </v-card-title>
                <TheButton size="icon-xl" type="primary-icon-1" icon="mdi-close" @click="handleCloseInvitation" />
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <TheVRow>
                        <v-avatar size="35" :image="profileImage" />
                        <h2 class="ml-3 subheading font-weight-bold">{{ props.data.client_nama }}</h2>
                    </TheVRow>
                    <h2 class="mt-3">{{ props.data.proyek_judul_proyek }}</h2>
                    <div class="mt-4">
                        <strong>Budget:</strong> {{ props.data.proyek_anggaran }} |
                        <strong>Deadline:</strong> {{ props.data.proyek_tanggal_tegat }}
                    </div>
                    <div v-html="projectDescription" class="mt-4"></div>
                    
                    <div class="mt-4">
                        <h3 style="color: #221943;">Spesialisasi</h3>
                        <v-chip-group class="mb-2">
                            <v-chip v-for="skill in props.data.proyek_spesialisasi" :key="skill" small>{{ skill }}</v-chip>
                        </v-chip-group>
                    </div>

                    <div>
                        <h3 style="color: #221943;">Dokumen Pendukung</h3>
                        <v-icon left>mdi-paperclip</v-icon>
                        <a :href="`https://rest.kolabaja.cloud/${props.data.proyek_lokasi_dokumen}`" target="_blank" style="color: #8A76D4; text-decoration: none;">Dokumen</a>
                    </div>
                        
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import profileImage from '@/assets/images/let-him-cook.jpg';
import TheButton from '@/components/common/TheButton.vue';
import TheVRow from '@/components/common/TheVRow.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const projectDescription = ref(props.data.proyek_deskripsi_proyek);
const invitation = ref(false);

const handleCloseInvitation = () => {
    invitation.value = false;
}

const handleInvitation = () => {
    invitation.value = !invitation.value;
}
</script>

<style scoped>
.sub-title-text {
    font-size: 18px;
    font-weight: bold;
}

.description-text {
    color: grey;
}
</style>
