import axiosClient from "./axiosClient";
import { useUserStore } from "@/stores/userStore";
import Echo from "laravel-echo";

const baseURL = import.meta.env.VITE_BASE_URL;

const websocketService = {
  connection() {
    if (!localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN)) return;
    return new Echo({
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
              const response = await axiosClient.post(
                `${baseURL}/api/broadcasting/auth`,
                { socket_id: socketId, channel_name: channel.name }
              );
              localStorage.setItem(
                import.meta.env.VITE_STORAGE_SOCKET_ID,
                socketId
              );
              callback(false, response);
            } catch (error) {
              callback(true, error);
              console.log(`Connect failed: ${error.message}`);
            }
          },
        };
      },
    });
  },
  subscribe() {
    const socket = this.connection();
    window.Echo = socket;
    return new Promise(function (resolve, reject) {
      resolve(socket);
    });
  },
};

export default websocketService;
