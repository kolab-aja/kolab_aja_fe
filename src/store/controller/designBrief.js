import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useControllerDesignBrief = defineStore("controllerDesignBrief", {
    state: () => ({
        data: null, 
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async updateDesignBrief(data) {
            try {
                this.isLoading = true;
                await fetchApi("/api/design-brief", {
                    method: "POST",
                    data: data
                })
                this.isLoading = false;
            } catch {
                this.isLoading = false;
                console.error("Error updateControllerDesignBrief in :", error);
                throw error;
            }
        }
    }
})