import { ref } from "vue";
export const useEvent = () => {
  const modal = ref(false);

  const scrollHeight = (el) => {
    const conversationElement = document.querySelector(el);
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    }
  };

  const toggleEmoji = (state) => {
    document.addEventListener("click", function (event) {
      const targetElement = event.target;
      const EmojiPicker = document.querySelector(".v3-emoji-picker");
      if (
        !targetElement.matches("#dropdownButton") &&
        !targetElement.matches(".ri-emotion-happy-line") &&
        !EmojiPicker.contains(targetElement)
      ) {
        state.value = false;
      }
    });
  };

  const toggleModal = () => {
    document.addEventListener("click", function (event) {
      const targetElement = event.target;
      if (targetElement.matches("#modal")) modal.value = false;
    });
  };

  return { modal, scrollHeight, toggleEmoji, toggleModal };
};
