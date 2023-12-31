import { ref } from "vue";

export const useEmoji = () => {
  const emoji = ref(false);
  const input = ref("");

  const onSelectEmoji = (emoji) => (input.value = `${input.value}${emoji.i}`);

  const handleToggleEmoji = () => (emoji.value = !emoji.value);

  return {
    emoji,
    input,
    onSelectEmoji,
    handleToggleEmoji,
  };
};
