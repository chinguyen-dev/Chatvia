<script setup>
import { useChat } from "@/composables/chatComposable";
import { defineAsyncComponent, onMounted, ref } from "vue";

const { handleOnSearch, handleOnChat, chatStore, userStore } = useChat();

const users = ref([
  {
    name: "Võ Chí Nguyên",
    avatar:
      "http://chatvia-light.vue.themesbrand.com/img/avatar-5.3e35c39b.jpg",
  },
  {
    name: "Võ Chí Nguyên",
    avatar:
      "http://chatvia-light.vue.themesbrand.com/img/avatar-5.3e35c39b.jpg",
  },
  {
    name: "Võ Chí Nguyên",
    avatar:
      "http://chatvia-light.vue.themesbrand.com/img/avatar-5.3e35c39b.jpg",
  },
  {
    name: "Võ Chí Nguyên",
    avatar:
      "http://chatvia-light.vue.themesbrand.com/img/avatar-5.3e35c39b.jpg",
  },
  {
    name: "Võ Chí Nguyên",
    avatar:
      "http://chatvia-light.vue.themesbrand.com/img/avatar-6.11d7dc68.jpg",
  },
  {
    name: "Võ Chí Nguyên",
    avatar:
      "http://chatvia-light.vue.themesbrand.com/img/avatar-6.11d7dc68.jpg",
  },
]);

const scrollX = ref(0);
const scrollHeight = ref(0);

const SearchBox = defineAsyncComponent(() =>
  import("../../components/SearchBox/index.vue")
);
const UserCarousel = defineAsyncComponent(() =>
  import("../../components/UserCarousel/index.vue")
);
const UserChat = defineAsyncComponent(() =>
  import("../../components/UserChat/index.vue")
);

onMounted(() => {
  const chatListElement = document.getElementById("chat-list");

  chatListElement.addEventListener("scroll", function () {
    const scrollTop = chatListElement.scrollTop;
    const scrollHeight = chatListElement.scrollHeight;
    const clientHeight = chatListElement.clientHeight;
    const percent = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 210
    );
    scrollX.value = percent;
  });
});
</script>

<template>
  <div class="flex flex-col">
    <div class="px-6 pt-6">
      <h2 class="mb-6 font-semibold text-xl text-gray49">Chats</h2>
      <!-- Search Box -->
      <SearchBox
        type="text"
        :on-submit="handleOnSearch"
        placeholder="Tìm kiếm"
      />
    </div>

    <div class="px-6 pb-6">
      <!-- User Carousel -->
      <UserCarousel :users="users" />
    </div>
    <div class="px-2">
      <h5 class="px-4 mb-3 text-[16px] font-semibold">Recent</h5>
      <div class="relative group h-[calc(100vh_-_280px)]">
        <div id="chat-list" class="absolute p-0 m-0 top-0 bottom-0 w-full">
          <UserChat
            v-for="chat in chatStore.getChats"
            :key="chat.id"
            @click="handleOnChat(chat)"
            :class="{ active: chat.active }"
            :user="
              chat.type == 'people'
                ? chat.members.find((member) => member.id !== userStore.user.id)
                : null
            "
            :message="chat.messages[chat.messages.length - 1]"
            :size-avatar="40"
            :unread="chat.unread"
          />
        </div>
        <div
          v-if="chatStore.getChats.length >= 6"
          class="absolute opacity-0 group-hover:opacity-100 top-0 right-0 bottom-0 w-[11px] transition-opacity duration-[0.4s] ease-linear"
        >
          <div
            class="scrollbar w-[7px] h-[205px] rounded-[7px] cursor-pointer bg-[#d0dae3]"
            :style="{
              transform: `translate3d(0px, ${scrollX}px, 0px)`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#chat-list {
  overflow: hidden scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
