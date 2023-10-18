<script setup>
import userService from "@/services/userService";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useWebsocketStore } from "@/stores/websocketStore";
import { defineAsyncComponent } from "vue";

const router = useRouter();
const websocketStore = useWebsocketStore();
websocketStore.connection();

const ChatBox = defineAsyncComponent(() =>
  import("./components/ChatBox/index.vue")
);

const Sidebar = defineAsyncComponent(() =>
  import("./components/Sidebar/index.vue")
);

const handleLogout = async () => {
  try {
    await userService.logout();
    localStorage.removeItem(import.meta.env.VITE_STORAGE_TOKEN);
    localStorage.removeItem(import.meta.env.VITE_STORAGE_USER);
    router.push("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};

const handleSendChat = (msg) => {
  console.log(msg);
};
</script>

<template>
  <div class="wrapper d-flex">
    <!--Sidebar.start-->
    <Sidebar :onsubmit="handleLogout" />
    <!--Sidebar.End-->

    <!--Chat.list.start-->
    <div class="chat-leftsidebar me-1">
      <div class="tab-content">
        <router-view />
      </div>
    </div>
    <!--Chat.list.end-->

    <!--Chat.box.start-->
    <ChatBox :onsubmit="handleSendChat" />
    <!--Chat.box.end-->
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
