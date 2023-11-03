import axiosClient from "./axiosClient";
import { useUserStore } from "@/stores/userStore";
import Echo from "laravel-echo";

const baseURL = import.meta.env.VITE_BASE_URL;

const websocketService = {
  connect() {
    if (!localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN)) return;
    window.Echo = new Echo({
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
  subscribe(type = import.meta.env.VITE_PRIVATE_CHANNEL) {
    const userStore = useUserStore();
    return new Promise(function (resolve, reject) {
      let channel;
      if (type === import.meta.env.VITE_PRIVATE_CHANNEL) {
        channel = window.Echo.private(`user.${userStore.user?.id}`);
      }
      channel ? resolve(channel) : reject(window.Echo);
    });
  },
};

export default websocketService;
