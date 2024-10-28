<template>
    <p>v-col vuetify</p>
    <v-col style="background-color: red;">
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
    </v-col>

    <br />
    <br />

    <p>v-col custom component ( buatan sendiri )</p>
    <TheVCol style="background-color: blue;">
        <h1>Hello 2</h1>
        <h1>Hello 2</h1>
        <h1>Hello 2</h1>
    </TheVCol>
</template>

<script setup>
    import TheVCol from '@/components/common/TheVCol.vue';
</script>

<style scoped>

</style>