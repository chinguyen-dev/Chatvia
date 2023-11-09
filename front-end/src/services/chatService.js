import axiosClient from "./axiosClient";
const baseURL = import.meta.env.VITE_BASE_URL;
const chatService = {
  getConversations: () => {
    return axiosClient.get(`${baseURL}/api/v1/chat`);
  },
  getConversationById: (id) => {
    return axiosClient.get(`${baseURL}/api/v1/chat/${id}`);
  },
  sendMessage: (payload) => {
    return axiosClient.post(`${baseURL}/api/v1/message`, payload);
  },
  updateReadMessage: (payload) => {
    return axiosClient.put(`${baseURL}/api/v1/message/seen`, payload);
  },
  createRoom: (payload) => {
    return axiosClient.post(`${baseURL}/api/v1/chat`, payload);
  },
};

export default chatService;
