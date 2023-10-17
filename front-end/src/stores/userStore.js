import { defineStore } from "pinia";

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
  },
});
