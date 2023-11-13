import chatService from "@/services/chatService";
import userService from "@/services/userService";

import { useChatStore } from "@/stores/chatStore";
import { computed, reactive, ref } from "vue";
import { useCommon } from "./commonComposable";

export const useChat = () => {
  const chatStore = useChatStore();
  const search = reactive({
    email: "",
    typingTimeOut: null,
  });
  const users = ref([]);
  const typingTimeOut = ref(null);

  const { findSenderById } = useCommon();

  const handleOnSearch = (payload) => console.log(payload);

  const fetchRoom = async () => {
    try {
      const response = await chatService.getConversations();
      chatStore.setState({
        chatList: response.data,
      });
    } catch (error) {
      console.log("Server error: ", error);
    }
  };

  const handleOnChat = async (room) => {
    if (room.unread > 0) {
      let payload = {
        conversation_id: room.chat_id,
        seen: true,
      };
      if (room?.type === "people") {
        const { id } = findSenderById(room);
        payload = {
          ...payload,
          sender_id: id,
        };
      } else {
        // update read message for room
      }
      await chatStore.readMessage(payload);
    } else {
      chatStore.setState({
        chat: room,
      });
    }
  };

  const handleCreateRoom = async ({ id }) => {
    await chatStore.createRoom({
      type: "people",
      to: id,
    });
    modal.value = false;
  };

  const handleSendMessage = async (payload) => {
    try {
      const res = await chatService.sendMessage(payload);
      chatStore.chat.messages.push(res.data);
    } catch (error) {
      console.log("error sending message");
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
        console.log("Server error: ", error);
      }
    }, 300);
  };

  const handleReceiveMsg = async ({ conversation_id, message }) => {
    if (chatStore.chat?.chat_id === conversation_id) {
      await chatStore.readMessage({
        conversation_id,
        sender_id: message.sender.id,
        seen: true,
      });
    } else {
      chatStore.chatList.map(
        (room) =>
          room.chat_id === conversation_id && room.messages.push(message)
      );
    }
  };

  const handleUserTyping = ({ type, user, roomId }) => {
    if (chatStore.chat?.chat_id === roomId) {
      chatStore.setState({
        typing: true,
      });
      if (typingTimeOut.value) {
        clearTimeout(typingTimeOut.value);
      }
      typingTimeOut.value = setTimeout(() => {
        chatStore.setState({
          typing: false,
        });
      }, 1000);
    }
  };

  return {
    search,
    users,
    chatService,
    fetchRoom,
    handleReceiveMsg,
    handleOnChat,
    handleOnSearch,
    handleUserTyping,
    handleCreateRoom,
    handleSendMessage,
    handleFindByEmailUsers,
    rooms: computed(() => chatStore.getChats),
    currentRoom: computed(() => chatStore.chat),
    loading: computed(() => chatStore.loading),
    typing: computed(() => chatStore.typing),
  };
};
