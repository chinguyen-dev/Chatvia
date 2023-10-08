import axiosClient from "./axiosClient";
const baseURL = import.meta.env.VITE_BASE_URL;
const userService = {
  login: (credentials) => {
    return axiosClient.post(`${baseURL}/api/v1/login`, credentials);
  },
  logout: () => {
    return axiosClient.post(`${baseURL}/api/v1/logout`);
  },
  getUser: () => {
    return axiosClient.get(`${baseURL}/api/v1/user`);
  },
  register: (data) => {
    return axiosClient.post(`${baseURL}/api/v1/register`, data);
  },
};
export default userService;
