import { toast } from "vue3-toastify";
import contactService from "../services/ContactService";
import { useContactStore } from "../stores";
import { computed } from "vue";

const useContact = () => {
  const contactStore = useContactStore();

  const fetchContact = async () => {
    try {
      const response = await contactService.getContacts();
      contactStore.setState({ contacts: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTab = (tab) => contactStore.setState({ tab });

  const handleRevokeInvitation = async (id) => {
    try {
      await contactService.revokeContact(id);
      contactStore.removeContact(id);
      toast.success("Thu hồi thành công");
    } catch (error) {
      console.error(error);
      toast.error("Thu hồi thất bại");
    }
  };

  const handleAcceptInvitation = async (payload) => {
    try {
      await contactService.updateContact(payload);
      contactStore.setAcceptedContact(payload);
      toast.success("Đã chấp nhận lời mời");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateContact = async (user) => {
    try {
      const response = await contactService.createContact({
        contacted_id: user.id,
      });
      contactStore.setState({
        contact: response.data,
      });
      toast.success("Gửi lời mời thành công");
    } catch (error) {
      console.error(error);
      toast.error("Gửi lời mời thất bại.");
    }
  };

  return {
    contactStore,
    tabs: computed(() => contactStore.getTabs),
    contacts: computed(() => contactStore.getContactCarousel),
    fetchContact,
    handleChangeTab,
    handleCreateContact,
    handleRevokeInvitation,
    handleAcceptInvitation,
  };
};
export default useContact;
