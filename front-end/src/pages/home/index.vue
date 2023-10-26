<script setup>
import { defineAsyncComponent } from "vue";

import { useAuth } from "@/composables/authComposable";
import { useChat } from "@/composables/chatComposable";

const { handleLogout } = useAuth();
const { handleSendChat, loading, chatStore } = useChat();

const ChatBox = defineAsyncComponent(() =>
  import("./components/ChatBox/index.vue")
);
const Sidebar = defineAsyncComponent(() =>
  import("./components/Sidebar/index.vue")
);
const Loading = defineAsyncComponent(() => import("@/components/Loading.vue"));
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
    <ChatBox :onsubmit="handleSendChat" :chat="chatStore.recentChat" />
    <!--Chat.box.end-->

    <Loading v-if="loading" />
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
