import axiosClient from "./axiosClient";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/contacts`;

const contactService = {
  getContacts: () => axiosClient.get(baseURL),
  createContact: (payload) => axiosClient.post(baseURL, payload),
  revokeContact: (id) => axiosClient.delete(`${baseURL}/${id}`),
  updateContact: ({ id, status }) => {
    return axiosClient.put(`${baseURL}/${id}`, { status });
  },
};
export default contactService;
