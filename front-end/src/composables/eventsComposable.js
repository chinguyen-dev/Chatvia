import { ref } from "vue";
const useEvent = () => {
  const modal = ref(false);
  const positionY = ref(0);

  const scrollHeight = (el) => {
    const conversationElement = document.querySelector(el);
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    }
  };

  const toggleEmoji = (state) => {
    document.addEventListener("click", function (event) {
      const targetElement = event.target;
      const emojiPickerElement = document.querySelector(".v3-emoji-picker");
      if (targetElement.matches("#modal")) modal.value = false;
      if (
        !targetElement.matches("#dropdownButton") &&
        !targetElement.matches(".ri-emotion-happy-line") &&
        emojiPickerElement &&
        !emojiPickerElement.contains(targetElement)
      ) {
        state.value = false;
      }
    });
  };

  return {
    modal,
    scrollHeight,
    toggleEmoji,
  };
};

export default useEvent;
