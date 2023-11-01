export const useEvent = () => {
  const scrollHeight = (el) => {
    const conversationElement = document.querySelector(el);
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    }
  };

  return { scrollHeight };
};
