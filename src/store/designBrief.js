import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useDesignBriefStore = defineStore("designBrief", {
    state: () => ({
        data: null, 
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getDesignBrief({ id_proyek }) {
            try {
                this.isLoading = true;
                const response = await fetchApi("/api/design-brief", {
                    params: { id_proyek: id_proyek }
                })
                this.data = response;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                throw error;
            }
        }
    }
})