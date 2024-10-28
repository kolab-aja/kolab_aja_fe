<!-- DONT AUTO FORMATTING / USE PRETTIER ON THIS PAGE -->

<template>
    <v-app>
		<v-main>
			<v-container fluid class="d-flex flex-column ga-5">
				<TheInput 
                    prepend-inner-icon="mdi-credit-card" 
                    append-inner-icon="mdi-lock-outline"
                    custom-label="Nomor Kartu"
                    v-model="nomorKartu"
                    max-width="800"
                />

                <TheVRow class="d-flex align-end ga-5" max-width="390">
                    <TheInput custom-label="Habis Berlaku" placeholder="MM" v-model="mm" sm="1" />
                    <TheInput placeholder="YY" v-model="yy" sm="1" />
                </TheVRow>

                <TheVCol style="position: relative;" max-width="800">
                    <TheInput custom-label="Password" placeholder="1234567" v-model="password" />
                    <button style="z-index: 1; position: absolute; top: 75px; right: 0px;" @click="handleClickForgotPassword">Ganti Password</button>
                </TheVCol>

                <TheInput custom-label="Nama Pemilik" disabled v-model="namaPemilik" max-width="800" />

            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
    import { ref } from 'vue';
    import TheInput from '@/components/common/TheInput.vue';
    import TheVRow from "@/components/common/TheVRow.vue";
    import TheVCol from "@/components/common/TheVCol.vue";

    const nomorKartu = ref("");
    const mm = ref("");
    const yy = ref("");
    const password = ref("")
    const namaPemilik = ref("value nama pemilik");

    const handleClickForgotPassword = () => {
        alert("Clicked Forgot Password")
    }

</script>

<style scoped>

</style>