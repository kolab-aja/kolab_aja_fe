<template>
    <span :style="computedItem.style" class="status">{{ computedItem.content }}</span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const computedItem = computed(() => {
    // proyek_id_status_proyek BERTIPE STRING
    if (props.data.proyek_id_status_proyek == 1 && !props.data.team_nama) {
        return {
            style: { backgroundColor: "#CF455E" },
            content: "Selection"
        }
    } else if (props.data.proyek_id_status_proyek == 1 && props.data.team_nama) {
        return {
            style: { backgroundColor: "#016158" },
            content: "Selected"
        }
    } else if (props.data.proyek_id_status_proyek ==  2) {
        return {
            style: { backgroundColor: "#FE849A" },
            content: "Link Shared"
        }
    }
    return {
        style: { backgroundColor: "transparent" },
        content: "N/A"
    };

})
</script>

<style scoped>
.status {
    border-radius: 15px;
    color: white;
    padding: 4px 12px;
    display: inline-block;
    min-width: 100px;
    text-align: center;
}
</style>