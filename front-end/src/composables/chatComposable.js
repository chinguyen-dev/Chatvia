import chatService from "@/services/chatService";
import websocketService from "@/services/websocket";
import userService from "@/services/userService";
import { useChatStore } from "@/stores/chatStore";
import { useUserStore } from "@/stores/userStore";
import { reactive, ref } from "vue";

export const useChat = () => {
  const search = reactive({
    email: "",
    typingTimeOut: null,
  });
  const users = ref([]);
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
  const handleFindByEmailUsers = async () => {
    if (search.email === "") return;
    if (search.typingTimeOut) clearTimeout(search.typingTimeOut);
    search.typingTimeOut = setTimeout(async () => {
      try {
        const { data } = await userService.findByEmailContaining(search.email);
        users.value = data;
      } catch (error) {
        console.log(error);
      }
    }, 300);
  };

  return {
    search,
    users,
    chatStore,
    userStore,
    websocketService,
    handleSendChat,
    handleOnSearch,
    handleOnChat,
    handleFindByEmailUsers,
  };
};
