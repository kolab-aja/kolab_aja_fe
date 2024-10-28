import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useControllerListStore = defineStore("controllerList", {
    state: () => ({
        data: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getControllerList(params = {}) {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/client/controller-list`, {
					params: params
				})
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                console.error("Error getProfile in:", error);
                throw error;
            }
        },
    }
})
