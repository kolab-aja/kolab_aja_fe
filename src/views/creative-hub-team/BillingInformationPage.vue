<template>
    <v-app>
        <TheSidebar active-at="/controller/payment/edit-payment" navbar-title="Metode Pembayaran">
            <v-container class="payment-method-page">
                <TheVRow class="d-flex ga-4">
                    <TheVCol cols="12" md="8">
                        <v-form @submit.prevent="submitForm">
                            <h2 class="section-title">Informasi Pembayaran</h2>
                            <TheVRow>
                                <TheVCol cols="12">
                                    <TheFieldInput 
                                        id="bank" 
                                        label="Pilih Bank" 
                                        v-model="paymentData.bank" 
                                        type="select"
                                        :items="banks" 
                                        placeholder="Pilih Bank"
                                        :error-messages="errors.bank" 
                                    />
                                </TheVCol>
                            </TheVRow>
                            <TheVRow>
                                <TheVCol cols="12">
                                    <TheFieldInput 
                                        id="account-number" 
                                        label="Nomor Rekening"
                                        v-model="paymentData.accountNumber" 
                                        type="text" 
                                        placeholder="Nomor Rekening"
                                        :error-messages="errors.accountNumber" 
                                    />
                                </TheVCol>
                            </TheVRow>
                            <TheVRow>
                                <TheVCol cols="12">
                                    <TheFieldInput 
                                        id="account-name" 
                                        label="Nama Pemilik"
                                        v-model="paymentData.accountName" 
                                        type="text" 
                                        placeholder="Nama Pemilik"
                                        :error-messages="errors.accountName" 
                                    />
                                </TheVCol>
                            </TheVRow>
                            <TheVRow justify="end" class="mt-4">
                                <TheButton size="m" type="primary" button-type="submit" @click="submitForm">Simpan</TheButton>
                                <TheButton size="m" type="secondary" @click="resetForm" class="ml-4">Batal</TheButton>
                            </TheVRow>
                        </v-form>
                    </TheVCol>
                </TheVRow>
            </v-container>
        </TheSidebar>
    </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TheSidebar from '@/components/creative-hub-team/TheSidebar.vue';
import TheFieldInput from '@/components/common/auth/TheFieldInput.vue';
import TheButton from '@/components/common/auth/TheButton.vue';
import TheVRow from '@/components/common/TheVRow.vue';
import TheVCol from '@/components/common/TheVCol.vue';
import { useBillStore } from '@/store/bill';

const paymentData = ref({
    bank: '',
    accountNumber: '',
    accountName: '',
});

const errors = ref({});
const banks = ref([]);
const bankOptions = ref([]);

const billStore = useBillStore();

onMounted(async () => {
    await billStore.getBillingInformation();
    const data = billStore.data;
    bankOptions.value = data.bank.map(bank => ({
        id: bank.id,
        name: bank.nama,
    }));
    banks.value = bankOptions.value.map(bank => bank.name);
});

const submitForm = async () => {
    if (validateForm()) {
        const selectedBank = bankOptions.value.find(bank => bank.name === paymentData.value.bank);
        const formData = {
            id_bank: selectedBank ? selectedBank.id : null,
            nomor_rekening: paymentData.value.accountNumber,
            nama_pemilik: paymentData.value.accountName,
        };
        await billStore.updateBillingInfo(formData);
    }
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;
    if (!paymentData.value.bank) {
        errors.value.bank = 'Bank is required';
        isValid = false;
    }
    if (!paymentData.value.accountNumber) {
        errors.value.accountNumber = 'Account Number is required';
        isValid = false;
    }
    if (!paymentData.value.accountName) {
        errors.value.accountName = 'Account Name is required';
        isValid = false;
    }
    return isValid;
};

const resetForm = () => {
    paymentData.value = {
        bank: '',
        accountNumber: '',
        accountName: '',
    };
    errors.value = {};
};
</script>