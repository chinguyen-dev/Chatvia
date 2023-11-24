import axiosClient from "./axiosClient";
const baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/chats`;
const chatService = {
  getRooms: () => axiosClient.get(baseURL),
  getRoomById: (id) => axiosClient.get(`${baseURL}/${id}`),
  createRoom: (payload) => axiosClient.post(baseURL, payload),
  sendChat: (payload) => axiosClient.post(`${baseURL}/sendChat`, payload),
  readMsg: (payload) => axiosClient.post(`${baseURL}/readMsg`, payload),
};

export default chatService;
