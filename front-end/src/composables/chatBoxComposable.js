import { ref } from "vue";

export const useChatBox = () => {
  const authenticatedUser = ref(
    JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_USER))
  );
  const emoji = ref(false);
  const input = ref("");

  const scrollIntoView = (messages) => {
    const message = document.querySelector(
      `#scrollTo-${messages[messages.length - 1]?.id}`
    );
    if (message) {
      message.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSelectEmoji = (emoji) => (input.value = `${input.value}${emoji.i}`);

  const handleToggleEmoji = () => (emoji.value = !emoji.value);

  const convertName = (name) => {
    const arr = name.split(" ");
    return arr.slice(arr.length - Math.ceil(arr.length / 2)).join(" ");
  };

  return {
    emoji,
    input,
    scrollIntoView,
    authenticatedUser,
    onSelectEmoji,
    handleToggleEmoji,
    convertName,
  };
};
