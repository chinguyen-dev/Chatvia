<script setup>
import { useChat } from "@/composables/chatComposable";
import { defineAsyncComponent } from "vue";

const { handleOnSearch, handleOnChat, chatStore } = useChat();

const SearchBox = defineAsyncComponent(() =>
  import("../../components/SearchBox/index.vue")
);
const UserCarousel = defineAsyncComponent(() =>
  import("../../components/UserCarousel/index.vue")
);
const UserChat = defineAsyncComponent(() =>
  import("../../components/UserChat/index.vue")
);
</script>

<template>
  <div class="wrapper">
    <div class="px-4 pt-4">
      <h4 class="mb-4">chats</h4>
      <!-- Search Box -->
      <SearchBox
        type="text"
        :on-submit="handleOnSearch"
        placeholder="Search messages or users"
      />
      <!-- User Carousel -->
      <div class="px-1 pb-4 mt-3">
        <!-- <UserCarousel :users="chatStore.data" /> -->
      </div>
    </div>
    <div class="px-2">
      <h5 class="px-3 mb-3">Recent</h5>
      <div class="box-chat">
        <div class="chat-list">
          <ul class="chat-user-list">
            <li
              v-for="chat in chatStore.chatList"
              :key="chat.id"
              @click="handleOnChat(chat)"
            >
              <UserChat
                :user="chat.members[0]"
                :message="chat.messages[chat.messages.length - 1]"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
