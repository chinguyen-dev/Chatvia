import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    users: [
      {
        id: 1,
        name: "Chí Nguyên",
        avatar: "",
        status: "on",
      },
      {
        id: 2,
        name: "Trúc Linh",
        avatar:
          "http://chatvia-light.vue.themesbrand.com/img/avatar-6.11d7dc68.jpg",
        status: "on",
      },
      {
        id: 3,
        name: "Chí Hải",
        avatar: "",
        status: "off",
      },
      {
        id: 4,
        name: "Kim Duyên",
        avatar: "",
        status: "off",
      },
      {
        id: 1,
        name: "Chí Nguyên",
        avatar: "",
        status: "on",
      },
      {
        id: 2,
        name: "Trúc Linh",
        avatar:
          "http://chatvia-light.vue.themesbrand.com/img/avatar-6.11d7dc68.jpg",
        status: "on",
      },
      {
        id: 3,
        name: "Chí Hải",
        avatar: "",
        status: "off",
      },
      {
        id: 4,
        name: "Kim Duyên",
        avatar: "",
        status: "off",
      },

      {
        id: 5,
        name: "Chí Nguyên",
        avatar: "",
        status: "on",
      },
      {
        id: 6,
        name: "Trúc Linh",
        avatar:
          "http://chatvia-light.vue.themesbrand.com/img/avatar-6.11d7dc68.jpg",
        status: "on",
      },
      {
        id: 7,
        name: "Chí Hải",
        avatar: "",
        status: "off",
      },
      {
        id: 8,
        name: "Kim Duyên",
        avatar: "",
        status: "off",
      },
    ],
  }),
  getters: {},
  actions: {},
});
