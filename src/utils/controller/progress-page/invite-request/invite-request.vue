<template>
    <v-tabs-window-item value="invite-request">
        <v-data-table :items="props.listData" :headers="headers" item-class="data-table-row">
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        <div class="d-flex flex-row align-center">
                            <img :src="item.client_nama ? profileImage : defaultImage" alt="Profile Image"
                                class="profile-picture"> {{ item.client_nama ? item.client_nama : "-" }}
                        </div>
                    </td>
                    <td>
                        {{ item.proyek_judul_proyek }}
                    </td>
                    <td>
                        <IconButton :data="item" />
                    </td>
                    <td>
                        <TheButton size="icon-m" type="primary-icon-2" icon="mdi-check" :disabled="false" class="mr-1" @click="updateStatusTerimaProject(item.proyek_id,1)"/>
                        <TheButton size="icon-m" type="primary-icon-2" icon="mdi-close" :disabled="false" @click="updateStatusTerimaProject(item.proyek_id,0)"/>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-tabs-window-item>
</template>

<script setup>
import profileImage from '@/assets/images/let-him-cook.jpg';
import TheButton from '@/components/common/TheButton.vue';
import defaultImage from '@/assets/images/defaultProfile.png';
import IconButton from '@/utils/controller/progress-page/invite-request/icon-button.vue';
import { useProjectStore } from '@/store/project';
import { useRouter, useRoute } from 'vue-router';
import { useSnackbarStore } from '@/store/snackbar';

const snackbarStore = useSnackbarStore()
const projectStore = useProjectStore();
const router = useRouter();

const props = defineProps({
    listData: {
        type: Array,
        required: false
    }
})

const headers = [
    { title: "Client" },
    { title: "Project" },
    { title: "Undangan" },
    { title: "Action" }
]

async function updateStatusTerimaProject(id_project, status_terima_proyek)
{
    await projectStore.updateInviteRequest(id_project, status_terima_proyek);
    location.reload();
}

</script>

<style scoped>
.profile-picture {
    width: 36px !important;
    height: 36px !important;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #8A76D4;
}
</style>