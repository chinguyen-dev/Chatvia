import { useChatBox } from "@/composables/chatBoxComposable";
import chatService from "@/services/chatService";
import { useChatStore } from "@/stores/chatStore";
import { useWebsocketStore } from "@/stores/websocketStore";

export const useChat = () => {
  const chatStore = useChatStore();
  const websocketStore = useWebsocketStore();

  const { scrollIntoView } = useChatBox();

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
    chatStore.setState({
      chat,
    });
    websocketStore.subscribe(
      `chat.${chatStore.chat?.chat_id}`,
      import.meta.env.VITE_PRESENCE_CHANNEL
    );
  };

  return {
    chatStore,
    websocketStore,
    scrollIntoView,
    handleSendChat,
    handleOnSearch,
    handleOnChat,
  };
};
