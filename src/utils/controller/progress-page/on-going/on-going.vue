<template>
    <v-tabs-window-item value="on-going">
        <v-data-table :items="props.listData" :headers="headers" item-class="data-table-row">
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.proyek_judul_proyek }}</td>
                    <td>
                        <div class="d-flex flex-row align-center">
                            <img :src="item.team_nama ? profileImage : defaultImage" alt="Profile Image" class="profile-picture"> {{ item.client_nama ? item.client_nama : "-" }}
                        </div>
                    </td>
                    <td>
                        <div class="d-flex flex-row align-center">
                            <img :src="item.team_nama ? profileImage : defaultImage" alt="Profile Image" class="profile-picture"> {{ item.team_nama ? item.team_nama : "-" }}
                        </div>
                    </td>
                    <td>
                        <TheButton size="icon-m" type="primary-icon-2" icon="mdi-plus" @click="handleAddMilestone(item.proyek_id)" />
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-tabs-window-item>
</template>

<script setup>

import profileImage from '@/assets/images/let-him-cook.jpg';
import TheButton from '@/components/common/TheButton.vue';
import router from '@/router';

const props = defineProps({
    listData: {
        type: Array,
        required: false
    }
})

const headers = [
    { title: "Project" },
    { title: "Client" },
    { title: "Team" },
    { title: "Action" }
]

const handleAddMilestone = (idProject) => {
    router.push(`/controller/add-milestone/${idProject}`)
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