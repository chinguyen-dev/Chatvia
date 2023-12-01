import chatService from "@/services/chatService";
import userService from "@/services/userService";

import { useChatStore } from "@/stores";
import { computed, reactive, ref } from "vue";
import { useCommon } from "@/composables";

const useChat = () => {
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
      const response = await chatService.getRooms();
      chatStore.setState({
        rooms: response.data,
      });
    } catch (error) {
      console.log("Server error: ", error);
    }
  };
  const handleOnChat = async (room) => {
    if (room.unread > 0 && room?.room_type === "people") {
      await chatStore.readMessage({
        room_id: room.room_id,
        seen: true,
      });
    } else {
      chatStore.setState({
        room,
      });
    }
  };
  const handleCreateRoom = (user) => {
    if (
      !chatStore.room ||
      !chatStore.room?.members.find((member) => member.id === user.id)
    ) {
      chatStore.createRoom({
        type: "people",
        user,
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
        console.log("Server error: ", error);
      }
    }, 300);
  };
  const handleTyping = ({ type, user, roomId }) => {
    if (chatStore.room?.room_id === roomId) {
      chatStore.setState({
        typing: true,
      });
      if (typingTimeOut.value) clearTimeout(typingTimeOut.value);
      typingTimeOut.value = setTimeout(() => {
        chatStore.setState({
          typing: false,
        });
      }, 1000);
    }
  };

  const handleSendChat = async (payload) => {
    try {
      const response = await chatService.sendChat(payload);
      chatStore.room.messages.push(response.data);
    } catch (error) {
      console.log("error sending message");
    }
  };

  const handleNewMsg = async ({ room_id, message }) => {
    if (chatStore.room?.room_id === room_id) {
      await chatStore.readMessage({
        room_id,
        seen: true,
      });
    } else {
      chatStore.rooms?.map(
        (room) => room.room_id === room_id && room.messages.push(message)
      );
    }
  };

  return {
    search,
    users,
    fetchRoom,
    handleNewMsg,
    handleOnChat,
    handleOnSearch,
    handleTyping,
    handleCreateRoom,
    handleSendChat,
    handleFindByEmailUsers,
    rooms: computed(() => chatStore.getRooms),
    currentRoom: computed(() => chatStore.room),
    loading: computed(() => chatStore.loading),
    typing: computed(() => chatStore.typing),
  };
};

export default useChat;
