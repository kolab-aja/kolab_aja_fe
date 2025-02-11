<template>
    <TheButton size="icon-m" type="primary-icon-2" :icon="computedItems.icon" :disabled="computedItems.isDisabled" @click="computedItems.onclick" />

    <v-dialog v-model="briefDialog" max-width="600px">
        <v-card style="padding: 25px; border-radius: 20px;">
            <v-card-title style="font-size: 30px; font-weight: bold" class="d-flex flex-row align-center ga-2 mb-2">
                <v-icon size="35" color="lightGray">mdi-file-check</v-icon> Brief Discussion
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex flex-column">
                <form @submit.prevent="handleSubmitBriefDialog">
                    <TheInput custom-label="Tautan" v-model="briefData.linkMeeting" :error-messages="linkMeetingError" />

                    <TheVCol>
                        <label>Dokumen</label>
                        <v-file-input
                            :label="briefData.previewLokasiDokumen ?? 'Drag your files here or browse'"
                            single-line
                            variant="outlined" 
                            density="compact" 
                            color="lightPrimary" 
                            class="v-file-input" 
                            clearable 
                            show-size 
                            v-model="briefData.fileDokumen"
                            :error-messages="fileDokumenError"
                        />
                        <div class="d-flex justify-end" v-if="computedItems.status === 'edit-design-brief'">
                            <a style="color: #8A76D4; text-decoration: none; margin-top: -20px; z-index: 1;" :href="briefData.previewLokasiDokumen" target="_blank">Preview Dokumen</a>
                        </div>
                    </TheVCol>

                    <div class="d-flex justify-end mt-5">
                        <TheButton prefix-icon="mdi-plus" size="text-icon-m" v-if="computedItems.status === 'create-design-brief'" style="min-width: 130px;" @click="handleButtonSubmitClick" button-type="submit">Tambah</TheButton>
                        <TheButton prefix-icon="mdi-pencil" size="text-icon-m" v-else-if="computedItems.status === 'edit-design-brief'" style="min-width: 130px;" @click="handleButtonSubmitClick" button-type="submit">Edit</TheButton>
                    </div>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import TheButton from '@/components/common/TheButton.vue';
    import router from '@/router';
    import TheInput from '@/components/common/TheInput.vue';
    import TheVCol from '@/components/common/TheVCol.vue';
    import config from '@/plugins/config';
    import { useDesignBriefStore } from '@/store/designBrief';
    import { useControllerDesignBrief } from '@/store/controller/designBrief';
    import { useSnackbarStore } from '@/store/snackbar';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        fetchTableDataFunc: {
            type: Function,
            required: true
        }
    })

    const briefDialog = ref(false);
    const briefData = ref({
        linkMeeting: "",
        fileDokumen: null,
        previewLokasiDokumen: null,
    });

    const linkMeetingError = ref("")
    const fileDokumenError = ref("")

    const designBriefStore = useDesignBriefStore();
    const controllerDesignBriefStore = useControllerDesignBrief();
    const snackbarStore = useSnackbarStore();

    let snackbarMessage = ""

    const computedItems = computed(() => {

        if (props.data.proyek_id_status_proyek == 1 && !props.data.team_nama) {
            return {
                isDisabled: false,
                icon: "mdi-plus",
                status: "choosing-team",
                onclick: () => {
                    router.push(`/controller/check-applicant/${props.data.proyek_id}`)
                }
            }
        } else if ( props.data.proyek_id_status_proyek == 1 && props.data.team_nama ) {
            return {
                isDisabled: false,
                icon: "mdi-video",
                status: "create-design-brief",
                onclick: () => {
                    handleOpenBriefDialog()
                    // POP UP INSERT DESIGN BRIEF
                }
            }
        } else if ( props.data.proyek_id_status_proyek == 2 ) {
            return {
                isDisabled: false,
                icon: "mdi-pencil",
                status: "edit-design-brief",
                onclick: () => {
                    handleOpenBriefDialog()
                    // POP UP EDIT DESIGN BRIEF ( GET BRIEF DATA )
                }
            }
        } else if ( props.data.proyek_id_status_proyek == 3 ) {
            return {
                isDisabled: true,
                icon: "mdi-pencil",
                status: "edit-design-brief",
            }
        }
    })

    const handleOpenBriefDialog = async () => {
        briefDialog.value = true;
        if ( props.data.proyek_id_status_proyek == 2 ) {
            try {
                await designBriefStore.getDesignBrief({ id_proyek: props.data.proyek_id })
                briefData.value.linkMeeting = designBriefStore.data.link_meeting
                briefData.value.fileDokumen = null
                briefData.value.previewLokasiDokumen = `${config.backend_url}/${designBriefStore.data.lokasi_dokumen}`
            } catch (err) {}
        }
    }

    const handleButtonSubmitClick = () => {
        if ( !briefData.value.linkMeeting ) {
            linkMeetingError.value = "Tautan tidak boleh kosong"
        } else {
            linkMeetingError.value = ""
        }

        // APABILA BKN UPLOAD PERTAMA (EDIT DATA) DAN TIDAK ADA UPDATE FILE, MAKA BOLEH NULL, APABILA NULL MAKA FILE LAMA AKAN TETAP
        if ( props.data.proyek_id_status_proyek != 2 ) {
            if ( !briefData.value.fileDokumen ) {
                fileDokumenError.value = "Dokumen tidak boleh kosong"
            } else if ( briefData.value.fileDokumen.size > 5 * 1024 * 1024 ) {
                fileDokumenError.value = "Dokumen tidak boleh lebih besar dari 5MB"
            } else {
                fileDokumenError.value = ""
            }
        } 

    }

    const handleSubmitBriefDialog = async () => {
        if ( !linkMeetingError.value && !fileDokumenError.value ) {
            try {
                const formData = new FormData();
                formData.append("id_proyek", props.data.proyek_id)
                formData.append("link_meeting", briefData.value.linkMeeting)
                // APABILA EDIT DAN TIDAK UPLOAD FILE BARU, file_dokumen TIDAK BOLEH DIKIRIM MESKIPUN NULL, AKAN ADA ERROR VALIDASI
                if ( briefData.value.fileDokumen ) {
                    formData.append("file_dokumen", briefData.value.fileDokumen)
                }
                await controllerDesignBriefStore.updateDesignBrief(formData)

                // RELOAD THE PAGE TO UPDATE TABLE DATA
                if ( props.data.proyek_id_status_proyek == 1 ) {
                    snackbarMessage = "Data berhasil dibuat"
                } else {
                    snackbarMessage = "Data berhasil diupdate"
                }

                snackbarStore.showSnackbar({
                    message: snackbarMessage,
                    timeout: 5000,
                    type: "success"
                });

                // FETHCING ULANG DATA KETIKA TERJADI UPDATE
                props.fetchTableDataFunc()
                briefDialog.value = false
            } catch (err) {}
        }
    }
</script>

<style scoped>
    * {
        font-family: "Outfit", sans-serif;
    }

    .v-file-input {
        border-radius: 10px;
        margin-top: 10px !important; 
    }
</style>