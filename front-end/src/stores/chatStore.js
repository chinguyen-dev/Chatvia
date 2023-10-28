import { defineStore } from "pinia";
import chatService from "@/services/chatService";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chatList: [],
    chat:
      JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_CHAT)) ||
      null,
    isLoading: false,
    channelName: null,
  }),
  getters: {},
  actions: {
    setState({ chatList, chat, isLoading, channelName }) {
      if (chatList) this.chatList = chatList;
      if (chat) this.chat = chat;
      if (channelName) this.channelName = channelName;
      this.isLoading = isLoading;
    },
    async getConversations() {
      try {
        this.isLoading = true;
        const res = await chatService.getConversations();
        this.chatList = res.data;
        if (!this.chat) {
          localStorage.setItem(
            import.meta.env.VITE_STORAGE_CHAT,
            JSON.stringify(res.data && res.data[0])
          );
        }
        this.isLoading = false;
      } catch (error) {
        console.log("server error");
      }
    },
  },
});
