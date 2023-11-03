import App from "./App.vue";
import router from "./router";
import Pusher from "pusher-js";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoImportIcons } from "./utils/fontawesome";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/global.scss";

const pinia = createPinia();
const app = createApp(App).use(router).use(pinia);
autoImportIcons(app);
window.Pusher = Pusher;
app.mount("#app");
