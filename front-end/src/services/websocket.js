import axiosClient from "./axiosClient";

const baseURL = import.meta.env.VITE_BASE_URL;

const websocketService = {
  onSocket: () => {
    return axiosClient.get(`${baseURL}/api/sockets/serve`);
  },
  auth: (payload) => {
    return axiosClient.post(`${baseURL}/api/broadcasting/auth`, payload);
  },
};

export default websocketService;
