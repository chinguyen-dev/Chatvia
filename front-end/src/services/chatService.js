import axiosClient from "./axiosClient";
const baseURL = import.meta.env.VITE_BASE_URL;
const chatService = {
  getConversations: () => {
    return axiosClient.get(`${baseURL}/api/v1/chat`);
  },
};

export default chatService;
