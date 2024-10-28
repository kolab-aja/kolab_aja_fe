<template>
    <v-container>
        <TheRichTextBox v-model="input" maxWidth="800"  />
        <p>VALUE : {{ input }}</p>
    </v-container>
</template>

<script setup>
    import TheRichTextBox from '@/components/common/TheRichTextBox.vue';
    import { ref } from 'vue';

    const input = ref("");

</script>

<style scoped>

</style>