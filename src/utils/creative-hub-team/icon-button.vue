<template>
    <TheButton size="icon-m" type="primary-icon-2" icon="mdi-video" @click="computedItem.onClick"
        :disabled="computedItem.isDisabled" />

    <v-dialog v-model="briefDialog" persistent max-width="600px">
        <v-card style="padding: 25px; border-radius: 20px;">
            <v-card-title style="font-size: 30px; font-weight: bold" class="d-flex flex-row align-center ga-2 mb-2">
                <v-icon size="35" color="lightGray">mdi-file-check</v-icon> Brief Discussion
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex flex-column ga-4">
                <div>
                    <h2>Tautan</h2>
                    <a href="https://example.com" target="_blank" style="color: #8A76D4; text-decoration: none;">{{
                        props.data.link_meeting }}</a>
                </div>
                <div>
                    <h2>Dokumen Lainnya</h2>
                    <template v-if="props.data.design_brief_lokasi_dokumen">
                        <v-icon left>mdi-paperclip</v-icon>
                        <a :href="'https://rest.kolabaja.cloud/' + props.data.design_brief_lokasi_dokumen"
                            target="_blank" rel="noopener noreferrer" class="v-btn v-btn--icon">
                            Dokumen
                        </a>
                    </template>
                    <template v-else>
                        <p>Tidak ada file</p>
                    </template>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="mt-4">
                <TheButton type="secondary" @click="handleBatalBrief">Tutup</TheButton>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import TheButton from '@/components/common/TheButton.vue';
import { useProjectStore } from '@/store/project';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});


const computedItem = computed(() => {
    // Allow the popup to be shown for all status values
    return {
        isDisabled: false,
        onClick: () => {
            briefDialog.value = true;
        },
    };
});

const briefDialog = ref(false);

const handleBatalBrief = () => {
    briefDialog.value = false;
};

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
