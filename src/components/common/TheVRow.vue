<template>
    <v-row no-gutters :style="{ maxWidth: computedMaxWidth }" >
        <slot></slot>
    </v-row>
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