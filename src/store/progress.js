import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useProjectStore = defineStore("project", {
	state: () => ({
		data: null,
		isLoading: false,
	}),
	getters: {

	},
	actions: {
		async insertProject(data) {
			try {
				this.isLoading = true
				const response = await fetchApi(`/api/proyek`, {
					method: 'GET',
					data: data
				})
				this.data = response
				this.isLoading = false
				console.log(response)
			} catch (error) {
				this.isLoading = false
				console.error("Error getProgress in:", error);
				throw error;
			}
		},
	}
})
