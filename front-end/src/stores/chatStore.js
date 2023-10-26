import { defineStore } from "pinia";
export const useChatStore = defineStore("chat", {
  state: () => ({
    chatList: [],
    recentChat:
      JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_CHAT)) ||
      null,
  }),
  getters: {},
  actions: {
    setState(payload) {
      const { chatList, chat } = payload;
      if (chatList) this.chatList = chatList;
      if (chat) this.recentChat = chat;
    },
  },
});
