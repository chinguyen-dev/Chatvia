import chatService from "@/services/chatService";
import websocketService from "@/services/websocket";
import { useChatStore } from "@/stores/chatStore";

export const useChat = () => {
  const chatStore = useChatStore();

  const scrollIntoView = (messages) => {
    if (!messages) return;
    const conversationElement = document.querySelector(
      ".chat-conversation .content"
    );
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    }
  };

  const handleSendChat = async (payload) => {
    try {
      const res = await chatService.sendMessage(payload);
      const chat = chatStore.chat;
      chat.messages.push(res.data);
    } catch (error) {
      console.log("error sending message");
    }
  };

  const handleOnSearch = (payload) => console.log(payload);

  const handleOnChat = (chat) => {
    websocketService.subscribe(
      `chat.${chat?.chat_id}`,
      import.meta.env.VITE_PRESENCE_CHANNEL
    );
    localStorage.setItem(
      import.meta.env.VITE_STORAGE_CHAT,
      JSON.stringify(chat)
    );
    chatStore.setState({
      chat,
    });
    scrollIntoView(chat.messages);
  };

  return {
    chatStore,
    websocketService,
    scrollIntoView,
    handleSendChat,
    handleOnSearch,
    handleOnChat,
  };
};
