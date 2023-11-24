import axiosClient from "./axiosClient";
const baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1`;
const userService = {
  login: (credentials) => axiosClient.post(`${baseURL}/login`, credentials),
  logout: () => axiosClient.post(`${baseURL}/logout`),
  register: (data) => axiosClient.post(`${baseURL}/register`, data),
  findByEmailContaining: (email) => {
    return axiosClient.get(`${baseURL}/users/like/${email}`);
  },
};
export default userService;
