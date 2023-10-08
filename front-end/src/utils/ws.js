import Echo from "laravel-echo";
import axios from "axios";

axios
  .post(`${import.meta.env.VITE_BASE_URL}/api/sanctum/token`, {
    email: "nguyendev2001@gmail.com",
    password: "123123",
  })
  .then(({ data }) => {
    let token = data;
    localStorage.setItem(import.meta.env.VITE_STORAGE_TOKEN, token);
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/api/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      console.log(data);
      let echo = new Echo({
        broadcaster: "pusher",
        key: import.meta.env.VITE_APP_WEBSOCKETS_KEY,
        wsHost: import.meta.env.VITE_APP_WEBSOCKETS_SERVER,
        wsPort: import.meta.env.VITE_APP_WEBSOCKETS_PORT,
        cluster: import.meta.env.VITE_APP_WEBSOCKETS_CLUSTER,
        forceTLS: false,
        disableStats: true,
        authorizer: (channel, options) => {
          console.log(options);
          return {
            authorize: (socketId, callback) => {
              axios({
                method: "POST",
                url: `${import.meta.env.VITE_BASE_URL}/api/broadcasting/auth`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  socket_id: socketId,
                  channel_name: channel.name,
                },
              })
                .then((response) => {
                  callback(false, response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
      });

      echo
        .private(`App.Models.User.${data.id}`)
        .listen(".new-message-event", (message) => {
          console.log(message);
        });
    });
  });
