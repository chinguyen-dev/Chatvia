<script setup>
import { reactive } from "vue";

const arrow = reactive({
  toggle: false,
  src: import.meta.env.VITE_IMG_ARROW,
});

const handleOnClick = () => (arrow.toggle = !arrow.toggle);
</script>

<template>
  <div class="border border-solid border-[#f0eff5] mb-2">
    <div
      class="flex items-center justify-between px-5 py-3 cursor-pointer"
      @click="handleOnClick"
    >
      <h5 class="flex items-center text-sm font-semibold">
        <slot name="name"></slot>
      </h5>
      <div
        class="transition-all duration-[0.4s] ease-linear w-3 h-3"
        :class="arrow.toggle && 'rotate-180'"
      >
        <img class="w-full h-auto block" :src="arrow.src" alt="arrow.svg" />
      </div>
    </div>

    <div
      :class="arrow.toggle && 'max-h-[300px]'"
      class="max-h-0 overflow-hidden bg-white transition-all duration-[500ms]"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
