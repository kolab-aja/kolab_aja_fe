import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";
import { useAuthStore } from "./auth";
import InviteRequest from "@/utils/controller/progress-page/invite-request/invite-request.vue";

export const useProjectStore = defineStore("project", {
    state: () => ({
        data: null,
        isLoading: false,
        dataProjectDetail: null,
        inviteRequestData: null
    }),
    getters: {

    },
    actions: {
        async updateIdProject(id) {
            this.idProject = id
        },
        async insertProject(data) {
            try {
                this.isLoading = true
                const authStore = useAuthStore();
                const response = await fetchApi(`/api/client/proyek`, {
                    method: 'POST',
                    data: data
                })
                this.data = response
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },

        async inviteController(data) {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/proyek/tambah-anggota`, {
                    method: 'POST',
                    data: data
                })
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },

        async acceptDesignBreif(idProject) {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/design-brief/accept`, {
                    method: 'POST',
                    data: {
                        id_proyek: idProject
                    }
                })

                this.isLoading = false
                return response
            } catch(error) {
                this.isLoading = false
                throw error;
            }
        },
        async getBayar(idProject) {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/client/payment`, {
                    method: 'GET',
                    params: {
                        id_proyek: idProject
                    }
                })

                this.isLoading = false
                return response
            } catch(error) {
                this.isLoading = false
                throw error;
            }
        },
        async bayar(idProject) {
            try {
                this.isLoading = true
                const response = await fetchApi(`/api/client/payment`, {
                    method: 'POST',
                    data: {
                        id_proyek: idProject
                    }
                })

                this.isLoading = false
                return response
            } catch(error) {
                this.isLoading = false
                throw error;
            }
        },
        async getProjectDetail(id) {
            try {
                const response = await fetchApi(`/api/proyek/${id}`, {
                    method: 'GET'
                })
    
                this.dataProjectDetail = response
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
        async applyProject(data) {
            try {
                const response = await fetchApi(`/api/creative-hub-team/lamaran-proyek`, {
                    method: 'POST',
                    data: {'id_proyek': data}
                })
                return response
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
        async acceptTeamProject(data) {
            try {
                const response = await fetchApi(`/api/proyek/tambah-anggota`, {
                    method: 'POST',
                    data: data
                })
                return response
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
        async getProjectDetail(id) {
            try {
                const response = await fetchApi(`/api/invite-request`, {
                    method: 'GET'
                })
    
                this.inviteRequestData = response
            } catch (error) {
                this.isLoading = false
                throw error;
            }
        },
    }
})
