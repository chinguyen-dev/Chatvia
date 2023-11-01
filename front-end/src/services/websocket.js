import axiosClient from "./axiosClient";
import { useChatStore } from "@/stores/chatStore";
import { useUserStore } from "@/stores/userStore";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;
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
  subscribe(channelName, type) {
    const chatStore = useChatStore();
    switch (type.toLocaleLowerCase()) {
      case import.meta.env.VITE_PRIVATE_CHANNEL:
        window.Echo.private(channelName).listen(".SEND-CHAT", (e) => {
          chatStore.chatList.map((chat) => {
            if (chat.chat_id == e.conversation_id) {
              chat.messages.push(e.message);
            }
          });
        });
        break;
      case import.meta.env.VITE_PRESENCE_CHANNEL:
        break;
      case import.meta.env.VITE_PUBLIC_CHANNEL:
        break;
      default:
        break;
    }
    chatStore.channelName = channelName;
  },
  unsubcribe(channelName, type, event) {
    const chatStore = useChatStore();
    if (!chatStore.channelName || chatStore.channelName === channelName) return;
    if (type == import.meta.env.VITE_PRESENCE_CHANNEL) {
      window.Echo.leave(channelName);
    } else if (type == import.meta.env.VITE_PRIVATE_CHANNEL) {
      window.Echo.private(channelName).stopListening(event);
    }
  },
};

export default websocketService;
