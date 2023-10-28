import { defineStore } from "pinia";
import { useChatStore } from "@/stores/chatStore";
import websocketService from "@/services/websocket";
import Echo from "laravel-echo";

export const useWebsocketStore = defineStore("websocket", {
  state: () => ({
    on: false,
    socket: localStorage.getItem(import.meta.env.VITE_STORAGE_SOCKET) || null,
    currentChannel: null,
  }),
  actions: {
    async connection() {
      if (!localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN)) {
        console.warn("unauthenticate");
        return;
      }
      this.socket = new Echo({
        broadcaster: "pusher",
        key: import.meta.env.VITE_APP_WEBSOCKETS_KEY,
        wsHost: import.meta.env.VITE_APP_WEBSOCKETS_SERVER,
        wsPort: import.meta.env.VITE_APP_WEBSOCKETS_PORT,
        cluster: import.meta.env.VITE_APP_WEBSOCKETS_CLUSTER,
        forceTLS: false,
        disableStats: true,
        authorizer: (channel, options) => {
          return {
            authorize: async (socketId, callback) => {
              try {
                const response = await websocketService.auth({
                  socket_id: socketId,
                  channel_name: channel.name,
                });
                callback(false, response);
                localStorage.setItem("socket_id", socketId);
                console.log("Connected to socketId: " + socketId);
              } catch (error) {
                callback(true, error);
                console.log(
                  "Connected to socketId: " +
                    socketId +
                    "failed with error: " +
                    error
                );
              }
            },
          };
        },
      });
      localStorage.setItem(import.meta.env.VITE_STORAGE_SOCKET, this.socket);
      this.on = true;
    },
    leaveChannel(channelName) {
      if (
        !this.currentChannel ||
        this.currentChannel.channelName === channelName
      )
        return;
      this.socket.leave(this.currentChannel.channelName);
      console.log("leave channel: ", this.currentChannel.channelName);
    },
    subscribe(channelName, type, event = ".SEND-CHAT") {
      const chatStore = useChatStore();
      switch (type.toLocaleLowerCase()) {
        case import.meta.env.VITE_PRIVATE_CHANNEL:
          break;
        case import.meta.env.VITE_PRESENCE_CHANNEL:
          this.leaveChannel(channelName);
          this.socket
            .join(channelName)
            .here((users) => console.log("users joined chat: ", users))
            .joining((user) =>
              console.log(
                `${user.name} joining room: ${chatStore.chat?.chat_id}`
              )
            )
            .leaving((user) =>
              console.log(`${user.name} leave room: ${chatStore.chat?.chat_id}`)
            )
            .listen(event, (e) => {
              chatStore.chat?.messages.push(e.message);
            });
          this.currentChannel = {
            channelName,
            type,
          };
          break;
        case import.meta.env.VITE_PUBLIC_CHANNEL:
          break;
        default:
          break;
      }
    },
  },
});
