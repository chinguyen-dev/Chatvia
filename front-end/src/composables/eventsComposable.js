import { ref } from "vue";
export const useEvent = () => {
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
      const EmojiPicker = document.querySelector(".v3-emoji-picker");
      if (targetElement.matches("#modal")) modal.value = false;
      if (
        !targetElement.matches("#dropdownButton") &&
        !targetElement.matches(".ri-emotion-happy-line") &&
        !EmojiPicker.contains(targetElement)
      ) {
        state.value = false;
      }
    });
  };

  const getVerticalPosition = (el) => {
    const chatListElement = document.getElementById(el);
    chatListElement.addEventListener("scroll", function () {
      const scrollTop = chatListElement.scrollTop;
      const scrollHeight = chatListElement.scrollHeight;
      const clientHeight = chatListElement.clientHeight;
      const percent = Math.ceil(
        (scrollTop / (scrollHeight - clientHeight)) * 210
      );
      positionY.value = percent;
    });
  };

  return {
    modal,
    positionY,
    scrollHeight,
    toggleEmoji,
    getVerticalPosition,
  };
};
