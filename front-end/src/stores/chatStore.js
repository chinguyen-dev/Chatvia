import { defineStore } from "pinia";
import chatService from "@/services/chatService";
import { useUserStore } from "@/stores/userStore";
export const useChatStore = defineStore("chat", {
  state: () => ({
    chatList: [],
    chat:
      JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_CHAT)) ||
      null,
    isLoading: false,
    channelName: null,
  }),
  getters: {
    getChats: ({ chatList, chat }) => {
      const userStore = useUserStore();
      return chatList.map((conversation) => {
        return {
          ...conversation,
          active: conversation.chat_id === chat?.chat_id,
          unread: conversation.messages.filter(
            (message) =>
              !message.unread && message.sender?.id !== userStore.user?.id
          ).length,
        };
      });
    },
    countAllUnreadMessages: ({ chatList }) => {
      let count = 0;
      const userStore = useUserStore();
      chatList.map((chat) => {
        count += chat.messages.filter(
          (message) =>
            !message.unread && message.sender?.id !== userStore.user?.id
        ).length;
      });
      return count;
    },
  },
  actions: {
    setState({ chatList, chat, isLoading, channelName }) {
      if (chatList) this.chatList = chatList;
      if (chat) {
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_CHAT,
          JSON.stringify(chat)
        );
        this.chat = chat;
      }
      if (channelName) this.channelName = channelName;
      this.isLoading = isLoading;
    },
    async getConversations() {
      try {
        this.isLoading = true;
        const res = await chatService.getConversations();
        this.chatList = res.data;
        if (!this.chat) {
          this.chat = res.data.length > 0 && res.data[0];
        } else {
          this.chat = res.data.find(
            (chat) => chat.chat_id === this.chat.chat_id
          );
        }
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_CHAT,
          JSON.stringify(this.chat)
        );
        this.isLoading = false;
      } catch (error) {
        console.log("server error");
      }
    },
    async readMessage(payload) {
      try {
        const res = await chatService.updateReadMessage(payload);
        const { chat_id } = res.data;
        this.setState({
          chatList: this.chatList.map((chat) => {
            if (chat.chat_id === chat_id) chat = res.data;
            return chat;
          }),
          chat: res.data,
        });
      } catch (error) {
        console.log("Error updating");
      }
    },
  },
});
