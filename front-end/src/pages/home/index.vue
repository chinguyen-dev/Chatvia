<script setup>
import { defineAsyncComponent, onMounted, onUpdated } from "vue";

import { useAuth } from "@/composables/authComposable";
import { useChat } from "@/composables/chatComposable";

const { handleLogout } = useAuth();
const { handleSendChat, chatStore, websocketStore, scrollIntoView } = useChat();

const ChatBox = defineAsyncComponent(() =>
  import("./components/ChatBox/index.vue")
);
const Sidebar = defineAsyncComponent(() =>
  import("./components/Sidebar/index.vue")
);
const Loading = defineAsyncComponent(() => import("@/components/Loading.vue"));

onMounted(async () => {
  websocketStore.connection();
  await chatStore.getConversations();
  websocketStore.subscribe(
    `chat.${chatStore.chat?.chat_id}`,
    import.meta.env.VITE_PRESENCE_CHANNEL
  );
  scrollIntoView(chatStore.chat?.messages);
});

onUpdated(() => {
  scrollIntoView(chatStore.chat?.messages);
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
    <ChatBox :onsubmit="handleSendChat" :chat="chatStore.chat" />
    <!--Chat.box.end-->

    <!--Loading-->
    <Loading v-if="chatStore.isLoading" />
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
