import { defineStore } from "pinia";
import axios from "axios";

export const usePostinganStore = defineStore("postingan", {
    state: () => ({
        defaultRoute: 'http://127.0.0.1:8000',
        token: localStorage.getItem("jwt_token") || null,
        postingan: null,
    }),
    getters: {

    },
    actions: {
        async getPostingan() {
            try {
                const response = await axios.get(`${this.defaultRoute}/get-postingan-project`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.postingan = response.data
                console.log(response.data);
            } catch (error) {
                console.error("Error logging in:", error);
                throw error;
            }
        },
        async setPostingan(judul, deskripsi) {
            try {
                const response = await axios.post(`${this.defaultRoute}/insert-postingan-project`, null, {
                    params: {
                        judul_postingan: judul,
                        deskripsi_postingan: deskripsi
                    },
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                console.log(response.data);
                return true;
            } catch (error) {
                console.error("Error setting posting:", error);
                throw error;
            }
        }
    }
})