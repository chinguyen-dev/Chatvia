import { ref } from "vue";
import { useWebsocketStore } from "@/stores/websocketStore";

export const useChatBox = () => {
  const authenticatedUser = ref(
    JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_USER))
  );
  const emoji = ref(false);
  const input = ref("");
  const websocket = useWebsocketStore();

  const scrollIntoView = (messages) => {
    if (!messages) return;
    const conversationElement = document.querySelector(
      ".chat-conversation .content"
    );
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    }
  };

  const onSelectEmoji = (emoji) => (input.value = `${input.value}${emoji.i}`);

  const handleToggleEmoji = () => (emoji.value = !emoji.value);

  const convertName = (name) => {
    if (!name) return;
    const arr = name.split(" ");
    return arr.slice(arr.length - Math.ceil(arr.length / 2)).join(" ");
  };

  return {
    emoji,
    input,
    websocket,
    scrollIntoView,
    authenticatedUser,
    onSelectEmoji,
    handleToggleEmoji,
    convertName,
  };
};
