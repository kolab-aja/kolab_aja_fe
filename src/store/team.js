import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";
import { useAuthStore } from "@/store/auth.js";

export const useTeamStore = defineStore("team", {
    state: () => ({
        data: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getTeam() {
            try {
                this.isLoading = true;
                const authStore = useAuthStore();
                const response = await fetchApi(`/api/team/${authStore.id}`)
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                console.error("Error getProfile in:", error);
                throw error;
            }
        },
        async insertTeam(data) {
            try {
                this.isLoading = true;
                await fetchApi(`/api/creative-hub-admin/insert-team`, {
                    method: 'POST',
                    data: data
                })
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false
                console.error("Error getProfile in:", error);
                throw error;
            }
        }
    }
})
