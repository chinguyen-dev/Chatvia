import { defineStore } from "pinia";
import websocketService from "../services/websocket";
import Echo from "laravel-echo";

export const useWebsocketStore = defineStore("websocket", {
  state: () => ({
    on: false,
    socket: localStorage.getItem(import.meta.env.VITE_STORAGE_SOCKET) || null,
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
  },
});
