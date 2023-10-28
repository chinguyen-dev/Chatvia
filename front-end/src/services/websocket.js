import axiosClient from "./axiosClient";
import { useChatStore } from "@/stores/chatStore";
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
              console.log("Connected to socketId: " + socketId);
            } catch (error) {
              callback(true, error);
              console.log(`Connect failed: ${error.message}`);
            }
          },
        };
      },
    });
  },
  subscribe(channelName, type, event = ".SEND-CHAT") {
    const chatStore = useChatStore();
    switch (type.toLocaleLowerCase()) {
      case import.meta.env.VITE_PRIVATE_CHANNEL:
        break;
      case import.meta.env.VITE_PRESENCE_CHANNEL:
        this.unsubcribe(channelName);
        window.Echo.join(channelName)
          .here((users) => console.log("users joined chat: ", users))
          .joining((user) =>
            console.log(`${user.name} joining room: ${chatStore.chat?.chat_id}`)
          )
          .leaving((user) =>
            console.log(`${user.name} leave room: ${chatStore.chat?.chat_id}`)
          )
          .listen(event, (e) => {
            chatStore.chat?.messages.push(e.message);
          });
        chatStore.channelName = channelName;
        break;
      case import.meta.env.VITE_PUBLIC_CHANNEL:
        break;
      default:
        break;
    }
  },
  unsubcribe(channelName) {
    const chatStore = useChatStore();
    if (!chatStore.channelName || chatStore.channelName === channelName) return;
    window.Echo.leave(chatStore.channelName);
    console.log("leave channel: ", chatStore.channelName);
  },
};

export default websocketService;
