import { ref } from "vue";

export const useEmoji = () => {
  const emoji = ref(false);
  const input = ref("");

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
    onSelectEmoji,
    handleToggleEmoji,
    convertName,
  };
};
