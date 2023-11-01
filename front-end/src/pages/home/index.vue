<script setup>
import { defineAsyncComponent, onMounted } from "vue";

import { useAuth } from "@/composables/authComposable";
import { useChat } from "@/composables/chatComposable";
import { useEvent } from "@/composables/eventsComposable";

const { handleLogout } = useAuth();
const { scrollHeight } = useEvent();
const { handleSendChat, chatStore, websocketService } = useChat();

const ChatBox = defineAsyncComponent(() =>
  import("./components/ChatBox/index.vue")
);
const Sidebar = defineAsyncComponent(() =>
  import("./components/Sidebar/index.vue")
);
const Loading = defineAsyncComponent(() => import("@/components/Loading.vue"));

onMounted(async () => {
  websocketService.connect();
  await chatStore.getConversations();
  websocketService.subscribe("chat", import.meta.env.VITE_PRIVATE_CHANNEL);
});
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
    <ChatBox
      :onsubmit="handleSendChat"
      :chat="chatStore.chat"
      :onscroll="() => scrollHeight('.chat-conversation .content')"
    />
    <!--Chat.box.end-->

    <!--Loading-->
    <Loading v-if="chatStore.isLoading" />
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
