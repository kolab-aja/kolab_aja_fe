import {defineStore} from "pinia";
import fetchApi from "@/lib/api/fetchApi";
import {useAuthStore} from "@/store/auth";

export const useMemberStore = defineStore("member", {
	state: () => ({
		data: null,
		member: null,
		isLoading: false,
	}),
	getters: {

	},
	actions: {
		async getMember() {
			try {
				this.isLoading = true
				const authStore = useAuthStore();
				const response = await fetchApi(`/api/team/member/${authStore.id}`)
				this.data = response
				this.isLoading = false
			} catch (error) {
				this.isLoading = false
				console.error("Error getMember in:", error);
				throw error;
			}
		},
		async insertMember(memberData) {
			try {
				await fetchApi('/api/creative-hub-team/member', {
					method: 'POST',
					data: memberData,
				});
			} catch (error) {
				console.error("Error inserting member:", error);
				throw error;
			}
		},
		async deleteMember(id) {
			try {
				this.isLoading = true
				await fetchApi(`/api/creative-hub-team/member/${id}`, {
					method: 'DELETE'
				})
				this.isLoading = false
			} catch (error) {
				this.isLoading = false
				console.error("Error deleteMember in:", error);
				throw error;
			}
		},
		async updateMember(memberData) {
			try {
				await fetchApi(`/api/creative-hub-team/member/${memberData.id}`, {
					method: 'PATCH',
					data: memberData
				})
			} catch (error) {
				console.error("Error updateMember in:", error);
				throw error;
			}
		},
		async getMemberById(id) {
			try {
				this.isLoading = true
				const response = await fetchApi(`/api/team/member/${id}`)
				this.data = response
				this.isLoading = false
			} catch (error) {
				this.isLoading = false
				console.error("Error getMember in:", error);
				throw error;
			}
		},
	}
})
