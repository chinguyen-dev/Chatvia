<script setup>
import { defineAsyncComponent } from "vue";
const {} = defineProps({
  user: Object,
  message: Object,
});

const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
</script>

<template>
  <div class="chat-user">
    <Avatar class="me-3" :user="user" />
    <div class="content">
      <h5 class="text-truncate mb-1">{{ user.name }}</h5>
      <p class="text-truncate mb-0">{{ message?.body || "Typing..." }}</p>
    </div>
    <div class="time">{{ message?.created_at }}</div>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
