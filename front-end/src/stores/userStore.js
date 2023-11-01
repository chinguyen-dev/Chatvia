import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import userService from "@/services/userService";

export const useUserStore = defineStore("user", {
  state: () => ({
    user:
      JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_USER)) ||
      null,
    token: localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN) || "",
  }),
  getters: {},
  actions: {
    setState(payload) {
      const { user, token } = payload;
      this.user = user;
      this.token = token;
    },

    async login(credentials) {
      try {
        const auth = await userService.login(credentials);
        localStorage.setItem(import.meta.env.VITE_STORAGE_TOKEN, auth.data);
        const user = await userService.getUser();
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_USER,
          JSON.stringify(user.data)
        );
        this.setState({
          token: auth.data,
          user: user.data,
        });
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
