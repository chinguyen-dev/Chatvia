<script setup>
import { defineAsyncComponent } from "vue";
defineProps({
  user: Object,
});
const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
</script>

<template>
  <div class="chat-user">
    <Avatar class="me-3" :user="user" />
    <div class="content">
      <h5 class="text-truncate mb-1">{{ user.name }}</h5>
      <p class="text-truncate mb-0">typing...</p>
    </div>
    <div class="time">04:56 PM</div>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
