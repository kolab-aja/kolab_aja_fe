import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";

export const useControllerMilestone = defineStore("controllerMilestone", {
    state: () => ({
        data: null, 
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async GetMilestone({ id_proyek }) {
            try {
                const response = await fetchApi("/api/controller/tambah-milestone", {
                    params: { id_proyek: id_proyek }
                })
                this.data = response
            } catch (error) {
                this.isLoading = false;
                throw error;
            }
        },
        async TambahMilestone({ id_proyek, topik, deskripsi, tautan, persentase, tanggal_tegat }) {
            try {
                await fetchApi("/api/controller/tambah-milestone", {
                    method: "POST",
                    data: {
                        id_proyek: id_proyek,
                        topik: topik,
                        deskripsi: deskripsi,
                        tautan: tautan,
                        persentase: persentase,
                        tanggal_tegat: tanggal_tegat
                    }
                })
            } catch (error) {
                this.isLoading = false;
                throw error;
            }
        }
    }
})