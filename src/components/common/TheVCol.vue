<template>
    <v-col class="pa-0" :style="{ maxWidth: computedMaxWidth }">
        <slot></slot>
    </v-col>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        maxWidth: {
            type: String,
            required: false
        },
    });

    const computedMaxWidth = computed(() => {
        return `${props.maxWidth}px`;
    });

</script>

<style scoped></style>