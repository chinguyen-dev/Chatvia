<script setup>
defineProps({
  user: Object,
  hidden: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 35,
  },
});
</script>

<template>
  <div
    class="relative h-full mx-auto"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <img
      v-if="user?.avatar"
      :src="user?.avatar"
      alt="avatar"
      class="max-w-full h-auto rounded-full"
    />
    <span
      v-else
      class="flex justify-center items-center h-full font-medium bg-[#7269ef40] text-[#7269ef] rounded-full text-primary"
    >
      {{ user?.name?.charAt(0) }}
    </span>
    <span
      v-if="hidden"
      class="absolute right-0 bottom-0 border-[2px] border-solid border-white rounded-[50%] bg-[#06d6a0] w-[10px] h-[10px]"
    ></span>
  </div>
</template>
