import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useMilestoneListStore = defineStore("milestoneList", {
    state: () => ({
        data: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getMilestoneList(params = {}) {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/proyek/milestone`, {
					params: params
				})
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                console.error("Error get milestone in:", error);
                throw error;
            }
        },

		async updateSelesaiMilestone(data = {}) {
			try {
				this.isLoading = true
				const response = await fetchApi(`/api/proyek/milestone/selesai`, {
					method: 'POST',
					data: data
				})
				this.data = response
				this.isLoading = false
			} catch (error) {
				this.isLoading = false
				console.error("Error get milestone in:", error);
				throw error;
			}
		},

		async updateAcceptMilestone(data = {}) {
			try {
				this.isLoading = true
				const response = await fetchApi(`/api/proyek/milestone/accept`, {
					method: 'POST',
					data: data
				})
				this.data = response
				this.isLoading = false
			} catch (error) {
				this.isLoading = false
				console.error("Error get milestone in:", error);
				throw error;
			}
		},

		async updateTerbayarMilestone(data = {}) {
			try {
				this.isLoading = true
				const response = await fetchApi(`/api/proyek/milestone/bayar`, {
					method: 'POST',
					data: data
				})
				this.data = response
				this.isLoading = false
			} catch (error) {
				this.isLoading = false
				console.error("Error get milestone in:", error);
				throw error;
			}
		},
    }
})
