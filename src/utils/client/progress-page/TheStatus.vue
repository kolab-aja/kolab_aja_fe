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
    if (props.data.proyek_id_status_proyek == 1) {
        return {
            style: { backgroundColor: "#285F58" },
            content: "Setup"
        }
    } else if (props.data.proyek_id_status_proyek == 2) {
        return {
            style: { backgroundColor: "#EF9843" },
            content: "Meet Available"
        }
    } else if (props.data.proyek_id_status_proyek == 3) {
        return {
            style: { backgroundColor: "#EF9843" },
            content: "Payment"
        }
    }
    else if (props.data.proyek_id_status_proyek == 4) {
        return {
            style: { backgroundColor: "#EF9843" },
            content: "Waiting Controller"
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
