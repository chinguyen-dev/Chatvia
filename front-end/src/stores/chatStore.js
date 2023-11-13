import { defineStore } from "pinia";
import chatService from "@/services/chatService";
import { useUserStore } from "@/stores/userStore";
export const useChatStore = defineStore("chat", {
  state: () => ({
    chatList: [],
    chat: null,
    typing: false,
  }),
  getters: {
    getChats: ({ chatList, chat }) => {
      const userStore = useUserStore();
      return chatList
        ?.map((conversation) => {
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
      chatList?.map((chat) => {
        count += chat.messages.filter(
          (message) =>
            !message.unread && message.sender?.id !== userStore.user?.id
        ).length;
      });
      return count;
    },
    loading: ({ chatList }) => chatList.length === 0,
  },
  actions: {
    setState({ chatList, chat, isLoading, typing }) {
      if (chatList) this.chatList = chatList;
      if (chat) this.chat = chat;
      if (isLoading) this.isLoading = isLoading;
      this.typing = typing && typing;
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

    async createRoom(payload) {
      try {
        const response = await chatService.createRoom(payload);
        const chat = response.data;
        const isContains = this.chatList.some(
          (chat) => chat.chat_id === response.data?.chat_id
        );
        if (!isContains) this.chatList.push(chat);
        this.chat = chat;
      } catch (error) {
        console.error("Error: ", error);
      }
    },
  },
});
