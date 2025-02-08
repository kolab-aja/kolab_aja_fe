import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useSpesialisasiStore = defineStore("spesialisasi", {
    state: () => ({
        data: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getSpesialisasi() {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/spesialisasi`)
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
    }
})
