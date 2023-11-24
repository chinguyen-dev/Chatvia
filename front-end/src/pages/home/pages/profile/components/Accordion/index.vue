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
      <div class="arrow w-3 h-3" :class="arrow.toggle && 'rotate-180'">
        <img class="w-full h-auto block" :src="arrow.src" alt="arrow.svg" />
      </div>
    </div>
    <transition name="slide">
      <div class="bg-white w-full p-6" v-show="arrow.toggle">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.arrow {
  transition: all 0.4s linear;
}
.slide-enter-active {
  transition: all 0.3s linear;
}

.slide-leave-active {
  transition: all 0.3s linear;
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
