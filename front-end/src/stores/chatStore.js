import { defineStore } from "pinia";
import chatService from "@/services/chatService";
import { useUserStore } from "@/stores/userStore";
export const useChatStore = defineStore("chat", {
  state: () => ({
    rooms: [],
    room: null,
    typing: false,
  }),
  getters: {
    getRooms: ({ rooms, room }) => {
      const userStore = useUserStore();
      const roomCurrent = room;
      return rooms
        ?.map((room) => {
          return {
            ...room,
            active: room.room_id === roomCurrent?.room_id,
            unread: room.messages.filter(
              (message) =>
                !message.unread && message.sender?.id !== userStore.user?.id
            ).length,
          };
        })
        .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
    },
    countAllUnreadMessages: ({ rooms }) => {
      let count = 0;
      const userStore = useUserStore();
      rooms?.map((room) => {
        count += room.messages.filter(
          (message) =>
            !message.unread && message.sender?.id !== userStore.user?.id
        ).length;
      });
      return count;
    },
    loading: ({ rooms }) => false,
  },
  actions: {
    setState({ rooms, room, isLoading, typing }) {
      if (rooms) this.rooms = rooms;
      if (room) this.room = room;
      if (isLoading) this.isLoading = isLoading;
      this.typing = typing && typing;
    },
    async readMessage(payload) {
      try {
        const response = await chatService.readMsg(payload);
        const { room_id } = response.data;
        this.setState({
          rooms: this.rooms.map((room) => {
            if (room?.room_id === room_id) room = response.data;
            return room;
          }),
          room: response.data,
        });
      } catch (error) {
        console.log("Error updating read message");
      }
    },

    async createRoom({ type, user }) {
      const userStore = useUserStore();
      if (type === "people") {
        this.room = {
          room_id: 0,
          room_name: null,
          room_type: "people",
          creator_id: userStore.user.id,
          members: [{ ...user }, { ...userStore.user }],
          messages: [],
        };
      } else {
      }
      this.rooms.push(this.room);
    },
  },
});
