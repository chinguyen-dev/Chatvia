import { defineStore } from "pinia";
import chatService from "@/services/chatService";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chatList: [],
    chat: null,
    isLoading: false,
  }),
  getters: {},
  actions: {
    setState({ chatList, chat, isLoading }) {
      if (chatList) this.chatList = chatList;
      if (chat) this.chat = chat;
      this.isLoading = isLoading;
    },
    async getConversations() {
      try {
        this.isLoading = true;
        const res = await chatService.getConversations();
        this.chatList = res.data;
        this.chat = res.data && res.data[0];
        this.isLoading = false;
      } catch (error) {
        console.log("server error");
      }
    },
  },
});
