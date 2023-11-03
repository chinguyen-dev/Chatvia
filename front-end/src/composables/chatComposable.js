import chatService from "@/services/chatService";
import websocketService from "@/services/websocket";
import { useChatStore } from "@/stores/chatStore";
import { useUserStore } from "@/stores/userStore";

export const useChat = () => {
  const chatStore = useChatStore();
  const userStore = useUserStore();

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
    if (chat.unread > 0) {
      let payload = {
        conversation_id: chat.chat_id,
        seen: true,
      };
      if (chat?.type === "people") {
        const sender = chat.members.find(
          (member) => member.id !== userStore.user.id
        );
        payload = {
          ...payload,
          sender_id: sender?.id,
        };
      } else {
        // update read message for room
      }
      await chatStore.readMessage(payload);
    } else {
      chatStore.setState({
        chat,
      });
    }
  };

  return {
    chatStore,
    userStore,
    websocketService,
    handleSendChat,
    handleOnSearch,
    handleOnChat,
  };
};
