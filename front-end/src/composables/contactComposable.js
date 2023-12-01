import { toast } from "vue3-toastify";
import contactService from "../services/ContactService";
import { useContactStore } from "../stores";

const useContact = () => {
  const contactStore = useContactStore();

  const handleRevokeInvitation = (id) => {};

  const handleCreateContact = async (user) => {
    try {
      const response = await contactService.createContact({
        contacted_id: user.id,
      });
      setContactStore({
        contact: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Gửi lời mời thất bại.");
    }
  };

  const setContactStore = (data) => contactStore.setState(data);

  return {
    setContactStore,
    handleRevokeInvitation,
    handleCreateContact,
  };
};
export default useContact;
