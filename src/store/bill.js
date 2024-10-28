import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useBillStore = defineStore("bill", {
    state: () => ({
        data: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getBillingInformation() {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/rekening`)
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                console.error("Error getProfile in:", error);
                throw error;
            }
        },
        async updateBillingInfo(data) {
            try {
                this.isLoading = true
                await fetchApi(`/api/rekening`, {
                    method: "POST",
                    data: data
                })
            } catch (error) {
                console.error("Error updateProfile in:", error);
                throw error;
            }
        },
    }
})
