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
                <TheButton type="secondary" @click="handleBatalBrief">Batal</TheButton>
                <TheButton @click="handleAcceptBrief">Accept</TheButton>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="paymentDialog" persistent max-width="800px">
        <v-card style="padding: 25px; border-radius: 20px;">
            <v-card-title style="font-size: 30px; font-weight: bold" class="d-flex flex-row align-center ga-2 mb-2">
                <v-icon size="35" color="lightGray">mdi-credit-card</v-icon> Payment
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex flex-column ga-5">
                <div>
                    <p class="sub-title-text">Jumlah</p>
                    <p style="font-size: 30px; font-weight: bold; line-height: 120%;">
                        {{ pembayaran.nominal ? formatRupiah(pembayaran.nominal) : '-' }}
                    </p>
                </div>
                <div>
                    <p class="sub-title-text">Deskripsi</p>
                    <p class="description-text">
                        Pembayaran yang dilakukan tidak akan langsung diteruskan kepada pihak controllers
                        atau pihak Creative Hub. Nominal pembayaran akan dialihkan terlebih dahulu ke
                        sistem.
                    </p>
                </div>
                <div class="d-flex flex-column ga-1">
                    <p class="sub-title-text">Informasi Pembayaran</p>
                    <div>
                        <p class="description-text">Pembayaran dengan nomor kartu:</p>
                        <v-chip color="grey">{{ pembayaran.nomor_kartu || '-' }}</v-chip>
                    </div>
                    <div>
                        <p class="description-text">Pembayaran dengan atas nama:</p>
                        <v-chip color="grey">{{ pembayaran.nama || '-' }}</v-chip>
                    </div>
                </div>
                <v-checkbox label="Setuju dengan syarat dan ketentuan" class="mt-n2"></v-checkbox>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="mt-4">
                <TheButton type="secondary" @click="handleBatalPayment">Batal</TheButton>
                <TheButton @click="handleBayarPayment">Bayar</TheButton>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import TheButton from '@/components/common/TheButton.vue';
import formatRupiah from '@/lib/formatRupiah';
import router from '@/router';
import { useProjectStore } from '@/store/project';

const projectStore = useProjectStore();
const pembayaran = ref({});

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

watch(
    () => props.data.proyek_id_status_proyek,
    async (newStatus) => {
        if (newStatus == 3) {
            await fetchPaymentDetails();
        }
    },
    { immediate: true } 
);

onMounted(async () => {
    if (props.data.proyek_id_status_proyek == 3) {
        await fetchPaymentDetails();
    }
});

const computedItem = computed(() => {
    if (props.data.proyek_id_status_proyek == 1 && !props.data.controller_nama) {
        return {
            isDisabled: false,
            onClick: () => {
                router.push(`/client/find-controllers/${props.data.proyek_id}`);
            },
        };
    } else if (props.data.proyek_id_status_proyek == 1 && !props.data.team_nama) {
        return { isDisabled: true, onClick: null };
    } else if (props.data.proyek_id_status_proyek == 1) {
        return {
            isDisabled: true,
            onClick: () => {
                briefDialog.value = true;
            },
        };
    } else if (props.data.proyek_id_status_proyek == 2) {
        return {
            isDisabled: false,
            onClick: () => {
                briefDialog.value = true;
            },
        };
    } else if (props.data.proyek_id_status_proyek == 3) {
        return {
            isDisabled: false,
            onClick: () => {
                paymentDialog.value = true;
            },
        };
    } else if (props.data.proyek_id_status_proyek == 4) {
        return {
            isDisabled: true,
            onClick: null,
        };
    }
    return {
        isDisabled: true,
        onClick: null,
    };
});

const briefDialog = ref(false);
const paymentDialog = ref(false);

const fetchPaymentDetails = async () => {
    try {
        const data_pembayaran = await projectStore.getBayar(props.data.proyek_id);
        pembayaran.value = data_pembayaran;
    } catch (error) {
        console.error('Error fetching payment details:', error);
    }
};

const handleAcceptBrief = async () => {
    try {
        await projectStore.acceptDesignBreif(props.data.proyek_id);
        briefDialog.value = false;
        window.location.reload();
    } catch (error) {
        console.error('Error accepting design brief:', error);
    }
};

const handleBatalBrief = () => {
    briefDialog.value = false;
};

const handleBayarPayment = async () => {
    try {
        await projectStore.bayar(props.data.proyek_id);
        paymentDialog.value = false;
        window.location.reload(); // Refresh the page after payment
    } catch (error) {
        console.error('Error processing payment:', error);
    }
};

const handleBatalPayment = () => {
    paymentDialog.value = false;
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