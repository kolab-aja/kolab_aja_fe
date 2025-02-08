import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useClientBillingStore = defineStore("clientBilling", {
    state: () => ({
        data: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getBilling() {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/client/billing`)
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
        async updateBilling({ nomorKartu, nama_depan, nama_belakang, bulan, tahun, cvv }) {
            try {
                this.isLoading = true
                await fetchApi(`/api/client/billing`, {
                    method: "PATCH",
                    data: { 
                        nomor_kartu: nomorKartu, 
                        nama_depan: nama_depan, 
                        nama_belakang: nama_belakang, 
                        bulan: bulan, 
                        tahun: tahun, 
                        cvv: cvv 
                    }
                })
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
    }
})
