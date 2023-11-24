import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import userService from "@/services/userService";

export const useUserStore = defineStore("user", {
  state: () => ({
    user:
      JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_USER)) ||
      null,
  }),
  getters: {},
  actions: {
    setState(payload) {
      this.user = payload;
    },

    async login(credentials) {
      try {
        this.user = await userService.login(credentials);
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_TOKEN,
          this.user.access_token
        );
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_USER,
          JSON.stringify(this.user)
        );
      } catch (error) {
        localStorage.clear();
        toast.error("Đăng nhập thất bại.");
      }
    },
    async logout() {
      try {
        const { message } = await userService.logout();
        console.log(message);
      } catch (error) {
        toast.error("Đăng xuất thất bại.");
      }
    },
    async register(data) {
      try {
        await userService.register(data);
      } catch (error) {
        toast.error("Đăng ký thất bại.");
      }
    },
  },
});
