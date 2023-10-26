import chatService from "@/services/chatService";
import { useChatStore } from "@/stores/chatStore";
import { useUserStore } from "@/stores/userStore";
import { useWebsocketStore } from "@/stores/websocketStore";
import { onMounted, ref } from "vue";

export const useChat = () => {
  const loading = ref(false);
  const chatStore = useChatStore();
  const userStore = useUserStore();
  const websocketStore = useWebsocketStore();

  const handleSendChat = (payload) => {
    console.log(payload);
  };

  const handleOnSearch = (payload) => console.log(payload);

  const setRecentChat = (chat) => {
    localStorage.setItem(
      import.meta.env.VITE_STORAGE_CHAT,
      JSON.stringify(chat)
    );
    chatStore.setState({
      chat,
    });
  };

  onMounted(async () => {
    websocketStore.connection();
    loading.value = true;
    const data = await chatService.getConversations();
    const chatList = data.map((chat, index) => ({
      ...chat,
      members: chat.members.filter((member) => member.id != userStore.user.id),
    }));
    chatStore.setState({ chatList });
    loading.value = false;
  });

  return {
    loading,
    chatStore,
    handleSendChat,
    handleOnSearch,
    setRecentChat,
  };
};
