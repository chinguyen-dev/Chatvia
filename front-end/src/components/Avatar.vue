<script setup>
defineProps({
  user: Object,
  status: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 35,
  },
});

const getCharAtByName = (name) => {
  if (typeof name === "string") {
    const arrStr = name.split(" ");
    if (arrStr.length > 0)
      return arrStr[arrStr.length - 1].charAt(0).toUpperCase();
  }
  return;
};
</script>

<template>
  <div
    class="relative mx-auto"
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
      class="flex justify-center items-center h-full font-medium bg-[#7269ef40] rounded-full text-primary"
    >
      {{ getCharAtByName(user?.name) }}
    </span>
    <span
      v-if="status"
      class="absolute right-0 bottom-0 border-[2px] border-solid border-white rounded-[50%] bg-[#06d6a0] w-[10px] h-[10px]"
    ></span>
  </div>
</template>
