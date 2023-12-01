import { defineStore } from "pinia";
import contactService from "../services/ContactService";
import { useUserStore } from "@/stores";

const dataDefault = [
  {
    id: 0,
    name: "Danh sách bạn bè",
    icon: "ri-group-line",
    active: true,
    type: "friend",
  },
  {
    id: 1,
    name: "Danh sách nhóm",
    icon: "ri-team-line",
    active: false,
    type: "group",
  },
  {
    id: 2,
    name: "Lời mời kết bạn",
    icon: "ri-mail-open-line",
    active: false,
    type: "invitation",
  },
];

const useContactStore = defineStore("contact", {
  state: () => ({
    tabs: dataDefault,
    currentTab: dataDefault[0],
    data: null,
  }),
  getters: {
    getTabs({ tabs, currentTab }) {
      return (tabs = tabs.map((tab) => {
        tab.active = tab?.id === currentTab?.id;
        return tab;
      }));
    },
    getCurrentTab({ currentTab }) {
      return currentTab;
    },
    getContactAwaiting({ data }) {
      const userStore = useUserStore();
      return data.filter(
        (contact) =>
          contact?.status === "waiting" &&
          contact?.receiver.id === userStore.user.id
      );
    },
    getContactSent({ data }) {
      const userStore = useUserStore();
      return data.filter((contact) => contact?.sender.id === userStore.user.id);
    },
  },
  actions: {
    setState({ tabs, tab, contact }) {
      if (tab) this.currentTab = tab;
      if (contact) this.data.push(contact);
    },
    async getContacts() {
      try {
        const response = await contactService.getContacts();
        this.data = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default useContactStore;
