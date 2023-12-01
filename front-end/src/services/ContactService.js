import axiosClient from "./axiosClient";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/contacts`;

const contactService = {
  getContacts: () => axiosClient.get(baseURL),
  createContact: (payload) => axiosClient.post(baseURL, payload),
};
export default contactService;
