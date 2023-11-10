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
  await websocketService.connect();
  await chatStore.getConversations();
  websocketService
    .subscribe()
    .then(function (channel) {
      channel.listen(".NEW-MESSAGE", async ({ conversation_id, message }) => {
        if (chatStore.chat.chat_id === conversation_id) {
          await chatStore.readMessage({
            conversation_id,
            sender_id: message.sender.id,
            seen: true,
          });
        } else {
          chatStore.chatList.map(
            (chat) =>
              chat.chat_id === conversation_id && chat.messages.push(message)
          );
        }
      });
      chatStore.setState({ channel });
    })
    .catch(function (echo) {
      console.log(echo);
    });
});
</script>

<template>
  <div class="wrapper flex">
    <!--Sidebar.start-->
    <Sidebar :onsubmit="handleLogout" />
    <!--Sidebar.End-->

    <!--Chat.list.start-->
    <div class="min-w-[380px] max-w-[380px] h-screen bg-[#f5f7fb] me-1">
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
