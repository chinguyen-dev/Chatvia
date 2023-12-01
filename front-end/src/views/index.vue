<script setup>
import websocketService from "@/services/websocket";
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useAuth, useChat, useContact } from "@/composables";
import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";

const Chat = defineAsyncComponent(() => import("./components/Chat/index.vue"));
const Contact = defineAsyncComponent(() =>
  import("./components/Contact/index.vue")
);
const Profile = defineAsyncComponent(() =>
  import("./components/Profile/index.vue")
);
const ChatBox = defineAsyncComponent(() =>
  import("./components/Chat/components/ChatBox.vue")
);
const ContactBox = defineAsyncComponent(() =>
  import("./components/Contact/components/ContactBox.vue")
);
const Sidebar = defineAsyncComponent(() => import("@/components/Sidebar.vue"));
const Loading = defineAsyncComponent(() => import("@/components/Loading.vue"));

const router = useRouter();
const userStore = useUserStore();

const componentCurrent = ref("chat");
const { handleLogout } = useAuth();
const {
  typing,
  loading,
  currentRoom,
  handleTyping,
  handleSendChat,
  handleNewMsg,
} = useChat();
const { setContactStore } = useContact();

const Component = computed(() => {
  let component;
  switch (componentCurrent.value.toUpperCase()) {
    case "PROFILE":
      component = Profile;
      break;
    case "CHAT":
      component = Chat;
      break;
    case "CONTACT":
      component = Contact;
      break;
    default:
      router.push({ name: "NotFound" });
      break;
  }
  return component;
});

onMounted(() => {
  websocketService.connect();
  websocketService.subscribe(
    { channelName: `User.${userStore.user?.id}`, type: "private" },
    ({ channel, typing }) => {
      channel
        .listen(".ON-CHAT", async (response) => handleNewMsg(response))
        .listen(".NEW-CONTACT", (response) => setContactStore(response))
        .listen(".REVOKE-INVITATION", (response) => console.log(response));
      typing.listenForWhisper("typing", (response) => handleTyping(response));
    }
  );
});
</script>

<template>
  <div id="home" class="flex">
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
    <ChatBox
      v-if="componentCurrent === 'chat' || componentCurrent === 'profile'"
      :room="currentRoom"
      :onsubmit="handleSendChat"
      :typing="typing"
    />
    <ContactBox v-else />
    <Loading v-if="loading" />
  </div>
</template>
