<script setup>
defineProps({
  user: Object,
  hidden: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="avatar">
    <img
      v-if="user.avatar"
      class="rounded-circle"
      :src="user.avatar"
      alt="avatar"
    />
    <span v-else class="avatar__title rounded-circle text-primary">
      {{ user.name.charAt(0) }}
    </span>
    <span v-if="hidden" class="status"></span>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
