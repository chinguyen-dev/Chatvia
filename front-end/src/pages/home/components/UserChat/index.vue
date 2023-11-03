<script setup>
import { defineAsyncComponent } from "vue";
defineProps({
  user: {
    type: Object,
    default(rawProps) {
      return {
        name: "",
        avatar: "",
      };
    },
  },
  message: Object,
  sizeAvatar: {
    type: Number,
    default: 35,
  },
  unread: {
    type: [Number, String],
  },
});

const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
const Badge = defineAsyncComponent(() =>
  import("@/components/Badge/index.vue")
);
</script>

<template>
  <div class="chat-user">
    <Avatar class="me-3" :user="user" :size="sizeAvatar" />
    <div class="content">
      <h5
        :class="{
          'text-truncate': true,
          'mb-0': true,
          'text-primary-unread': unread > 0,
        }"
      >
        {{ user?.name }}
      </h5>
      <p
        :class="{
          'text-truncate': true,
          'mb-0': true,
          'text-secondary-read': unread == 0,
          'text-primary-unread': unread > 0,
        }"
      >
        {{ message?.body || "Typing..." }}
      </p>
    </div>
    <div class="">
      <div class="time mb-2">{{ message?.created_at }}</div>
      <div class="unread">
        <Badge :value="unread" />
      </div>
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
