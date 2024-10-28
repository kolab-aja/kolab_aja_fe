<!-- DONT AUTO FORMATTING / USE PRETTIER ON THIS PAGE -->

<template>
    <v-app>
		<v-main>
			<v-container fluid class="d-flex flex-column ga-5">

                <TheVRow class="d-flex align-end ga-5" max-width="390">
                    <TheInputNumber custom-label="Habis Berlaku" placeholder="MM" v-model="mm" min="1" max="12" />
                    <TheInputNumber placeholder="YYYY" v-model="yy" min="0" max="9999" />
                </TheVRow>

            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
    import { ref } from 'vue';
    import TheInputNumber from '@/components/common/TheInputNumber.vue';
    import TheVRow from "@/components/common/TheVRow.vue";

    const mm = ref(null);
    const yy = ref(null);

</script>

<style scoped>

</style>