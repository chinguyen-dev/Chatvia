import chatService from "@/services/chatService";
import websocketService from "@/services/websocket";
import { useChatStore } from "@/stores/chatStore";

export const useChat = () => {
  const chatStore = useChatStore();

  const handleSendChat = async (payload) => {
    try {
      const res = await chatService.sendMessage(payload);
      chatStore.chat.messages.push(res.data);
    } catch (error) {
      console.log("error sending message");
    }
  };
  const handleOnSearch = (payload) => console.log(payload);

  const handleOnChat = async (chat) => {
    const res = await chatService.getConversationById(chat.chat_id);
    localStorage.setItem(
      import.meta.env.VITE_STORAGE_CHAT,
      JSON.stringify(res.data)
    );
    chatStore.setState({
      chat: res.data,
    });
  };

  return {
    chatStore,
    websocketService,
    handleSendChat,
    handleOnSearch,
    handleOnChat,
  };
};
