<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import websocketService from "@/services/websocket";
import { useAuth } from "@/composables/authComposable";
import { useChat } from "@/composables/chatComposable";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const componentCurrent = ref("chat");
const { handleLogout } = useAuth();
const {
  loading,
  currentRoom,
  handleUserTyping,
  handleSendMessage,
  handleReceiveMsg,
} = useChat();

const ChatBox = defineAsyncComponent(() =>
  import("./components/ChatBox/index.vue")
);
const Sidebar = defineAsyncComponent(() =>
  import("./components/Sidebar/index.vue")
);
const Chat = defineAsyncComponent(() => import("./pages/chat/index.vue"));
const Profile = defineAsyncComponent(() => import("./pages/profile/index.vue"));
const Loading = defineAsyncComponent(() => import("@/components/Loading.vue"));
const Component = computed(() => {
  let component;
  switch (componentCurrent.value.toUpperCase()) {
    case "PROFILE":
      component = Profile;
      break;
    case "CHAT":
      component = Chat;
      break;
    default:
      router.push("/404");
      break;
  }
  return component;
});

onMounted(() => {
  websocketService
    .subscribe()
    .then(function (socket) {
      const userPriChannel = socket.private(`user.${userStore.user?.id}`);
      return {
        userPriChannel,
      };
    })
    .then(function ({ userPriChannel }) {
      userPriChannel
        .listen(".NEW-MESSAGE", async (response) => {
          handleReceiveMsg(response);
        })
        .listenForWhisper("typing", (response) => handleUserTyping(response));
    });
});
</script>

<template>
  <div class="wrapper flex">
    <Sidebar
      :onsubmit="handleLogout"
      :on-click="(componentName) => (componentCurrent = componentName)"
    />

    <div class="min-w-[380px] max-w-[380px] h-screen bg-[#f5f7fb] me-1">
      <div class="tab-content">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </div>
    </div>

    <ChatBox :room="currentRoom" :onsubmit="handleSendMessage" />

    <Loading v-if="loading" />
  </div>
</template>
