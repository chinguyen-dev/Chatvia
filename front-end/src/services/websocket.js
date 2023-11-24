import axiosClient from "./axiosClient";
import Echo from "laravel-echo";

const baseURL = import.meta.env.VITE_BASE_URL;
let echo = null;

const websocketService = {
  connect: () => {
    if (!localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN)) return;
    echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      encrypted: true,
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
  subscribe: ({ channelName, type }, callback) => {
    if (!echo) return;
    let channel;
    switch (type.toUpperCase()) {
      case "PUBLIC":
        break;
      case "PRIVATE":
        channel = echo.private(channelName);
        break;
      case "PRESENCE":
        break;
      default:
        console.error("unknown type");
        break;
    }
    return callback({
      channel,
      typing: echo.private("Typing"),
    });
  },
  getSocketId: () => {
    if (!echo) return;
    return new Promise((resolve) => {
      echo.connector.pusher.connection.bind("connected", () =>
        resolve(echo.socketId())
      );
    });
  },
  typing: (data) =>
    echo &&
    setTimeout(() => echo.private("Typing").whisper("typing", data), 300),
  unSubscribe: () => (echo = null),
};

export default websocketService;
