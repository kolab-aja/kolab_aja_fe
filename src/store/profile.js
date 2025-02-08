import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";
import { useAuthStore } from "./auth";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        data: null,
        dataController: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getProfile() {
            try {
                this.isLoading = true
                const authStore = useAuthStore();
                const response = await fetchApi(`/api/profile/${authStore.id}`)
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
        async updateProfile(data) {
            try {
                this.isLoading = true
                await fetchApi(`/api/profile`, {
                    method: "PATCH",
                    data: data
                })
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },

        async getControllerProfile(id) {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/profile/${id}`)
                this.dataController = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        }
    }
})
