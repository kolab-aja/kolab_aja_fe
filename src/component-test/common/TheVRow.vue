<template>
    <p>v-row vuetify</p>
    <v-row style="background-color: red;">
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
    </v-row>

    <br />
    <br />

    <p>v-row custom component ( buatan sendiri )</p>
    <TheVRow style="background-color: blue;">
        <h1>Hello 2</h1>
        <h1>Hello 2</h1>
        <h1>Hello 2</h1>
    </TheVRow>
</template>

<script setup>
    import TheVRow from '@/components/common/TheVRow.vue';
</script>

<style scoped>

</style>