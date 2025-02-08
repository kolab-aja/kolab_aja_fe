import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";
import { useAuthStore } from "@/store/auth.js";

export const useProjectListStore = defineStore("projectList", {
    state: () => ({
        data: null,
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getProjectList(param = {}, isUser = 1) {
            try {
                const authStore= useAuthStore();
				if (isUser) {
					param['id_user'] = authStore.id
				}
                this.isLoading = true;
                const response = await fetchApi(`/api/proyek`, {
                    params: param
                });
                this.data = response;
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        }
    }
})
