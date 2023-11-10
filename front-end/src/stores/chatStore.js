import { defineStore } from "pinia";
import chatService from "@/services/chatService";
import { useUserStore } from "@/stores/userStore";
export const useChatStore = defineStore("chat", {
  state: () => ({
    chatList: [],
    chat: null,
    isLoading: false,
    channel: null,
  }),
  getters: {
    getChats: ({ chatList, chat }) => {
      const userStore = useUserStore();
      return chatList
        .map((conversation) => {
          return {
            ...conversation,
            active: conversation.chat_id === chat?.chat_id,
            unread: conversation.messages.filter(
              (message) =>
                !message.unread && message.sender?.id !== userStore.user?.id
            ).length,
          };
        })
        .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
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
    setState({ chatList, chat, isLoading, channel }) {
      if (chatList) this.chatList = chatList;
      if (chat) {
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_CHAT,
          JSON.stringify(chat)
        );
        this.chat = chat;
      }
      if (channel) this.channel = channel;
      this.isLoading = isLoading;
    },
    async getConversations() {
      try {
        this.isLoading = true;
        const { data } = await chatService.getConversations();
        this.chatList = data;
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
    addChat(data) {
      const isContains = this.chatList.some(
        (chat) => chat.chat_id === data.chat_id
      );
      if (!isContains) this.chatList.push(data);
      this.chat = data;
    },
  },
});
