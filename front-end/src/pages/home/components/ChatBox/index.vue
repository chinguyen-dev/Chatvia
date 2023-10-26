<script setup>
import { useChatBox } from "@/composables/chatBoxComposable";
import { defineAsyncComponent, onMounted, onUpdated } from "vue";
const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
// import picker compopnent
const EmojiPicker = defineAsyncComponent(() => import("vue3-emoji-picker"));
// import css
import "vue3-emoji-picker/css";

const {
  scrollIntoView,
  authenticatedUser,
  handleToggleEmoji,
  emoji,
  input,
  onSelectEmoji,
  convertName,
} = useChatBox();

const { onsubmit, chat, autoScroll } = defineProps({
  onsubmit: {
    type: Function,
    default: null,
  },
  chat: {
    type: Object,
    default: null,
  },
});

const handleOnSubmit = () => {
  if (!onsubmit) return;
  onsubmit({
    conversation_id: chat.chat_id,
    receiver_id: "",
    body: input.value,
  });
  input.value = "";
};

onMounted(() => scrollIntoView(chat.messages));
onUpdated(() => scrollIntoView(chat.messages));
</script>

<template>
  <div class="chat-box">
    <div class="header p-4 border-bottom">
      <div class="col-md-4">
        <div class="d-flex align-items-center">
          <Avatar class="me-3" :user="chat?.members[0]" />
          <h5 class="flex-grow-1 mb-0 font-size-16">
            {{ chat.name || convertName(chat.members[0]?.name) }}
          </h5>
        </div>
      </div>
      <div class="col-md-8"></div>
    </div>

    <div class="chat-conversation">
      <div class="content">
        <div
          :class="message.sender.id == authenticatedUser.id && 'right'"
          v-for="message in chat.messages"
          :key="message.id"
          :id="`scrollTo-${message.id}`"
        >
          <div class="message">
            <Avatar
              class="me-3"
              :user="
                message.sender.id == authenticatedUser.id
                  ? authenticatedUser
                  : message.sender
              "
            />
            <div class="box flex-grow-1">
              <div class="text-wrap">
                <div class="text-wrap__content">
                  <span>{{ message.body }}!</span>
                  <p><i class="ri-time-line"></i> {{ message.created_at }}</p>
                </div>
                <div class="dropdown">
                  <button
                    class="btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="ri-more-2-fill"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Reply</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="name">
                {{
                  message.sender.id == authenticatedUser.id
                    ? convertName(authenticatedUser.name)
                    : convertName(message.sender.name)
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer p-4 border-top">
      <form @submit.prevent="handleOnSubmit">
        <input type="text" placeholder="Type message" v-model="input" />
        <div class="footer__right">
          <div
            class="modal-emoji"
            v-show="emoji"
            @click="handleToggleEmoji"
          ></div>
          <EmojiPicker v-show="emoji" :native="true" @select="onSelectEmoji" />
          <div class="emoji">
            <button
              type="button"
              class="text-primary"
              @click="handleToggleEmoji"
            >
              <i class="ri-emotion-happy-line"></i>
            </button>
          </div>
          <div class="attach">
            <button type="button" class="text-primary">
              <i class="ri-attachment-line"></i>
            </button>
          </div>
          <button type="submit" class="btn">
            <i class="ri-send-plane-2-fill"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
