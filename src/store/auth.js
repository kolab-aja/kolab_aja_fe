import { defineStore } from "pinia";
import fetchApi from "@/lib/api/fetchApi";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: localStorage.getItem("jwt_token") || null,
		userRoles: localStorage.getItem("user_role") || null,
		id: localStorage.getItem("id") || null,
		name: localStorage.getItem("name") || null,
	}),

	getters: {
		isLogin() {
			return this.token && this.userRoles;
		},
	},

	actions: {
		async login({ email, password }) {
			try {
				const response = await fetchApi("/api/auth/login", {
					method: "POST",
					data: {
						email: email,
						password: password,
					},
				});
				this.token = response.access_token;
				localStorage.setItem("jwt_token", `Bearer ${this.token}`);
				await this.getUserRoles();
			} catch (error) {
				console.error("Error POST Login :", error);
				throw error;
			}
		},
		async getUserRoles() {
			try {
				const response = await fetchApi("/api/auth/me", {
					method: "POST",
				});
				this.userRoles = response.nama_role;
				this.id = response.id;
				this.name = response.nama;
				localStorage.setItem("user_role", this.userRoles);
				localStorage.setItem("id", this.id);
				localStorage.setItem("name", this.name);
			} catch (error) {
				console.error("Error POST getme :", error);
				throw error;
			}
		},
		async register({ nama, email, password, lokasi, id_role }) {
			try {
                const response = await fetchApi("/api/auth/register", {
                    method: "POST",
                    data: {
                        nama: nama,
                        email: email,
                        password: password,
                        lokasi: lokasi,
                        id_role: id_role
                    }
                })
				this.token = response.access_token;
				localStorage.setItem("jwt_token", `Bearer ${this.token}`);
				await this.getUserRoles();
			} catch (error) {
                console.error("Error POST register :", error);
				throw error;
            }
		},
		removeLocalStorage() {
			this.token = null;
			this.userRoles = null;
			this.authUser = null;
			localStorage.removeItem("jwt_token");
			localStorage.removeItem("user_role");
			localStorage.removeItem("id");
			localStorage.removeItem("name");

			// WILL RESET ALL GLOBAL STATE 
			window.location.href = "/login"
		},
		async logout() {
			try {
				await fetchApi("/api/auth/logout", { method: "POST" })
				this.removeLocalStorage()
			} catch( err ) {
				console.error(err)
			}
		},
		redirectAfterLogin() {
			if ( ["controller", "client", "creative-hub-team"].includes(this.userRoles) ) {
				router.push(`/${this.userRoles}/progress`)
			} 
			// CREATIVE-HUB-ADMIN TIDAK MEMPUNYAI PROGRESS PAGE
			else if (this.userRoles === "creative-hub-admin") {
				router.push("/creative-hub-admin/my-team")
			}
		}
	},
});
