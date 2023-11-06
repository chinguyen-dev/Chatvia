<script setup>
import { ref } from "vue";

const dots = ref(5);
</script>
<template>
  <div class="fixed top-0 right-0 left-0 bottom-0 bg-white z-[99999]">
    <div
      class="loader absolute top-1/2 left-[40%] ml-[10%] -translate-y-2/4 -translate-x-2/4"
    >
      <div
        v-for="(dot, index) in dots"
        :key="index"
        class="dot inline-block w-6 h-6 bg-[#3ac] rounded-[100%]"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dot {
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
