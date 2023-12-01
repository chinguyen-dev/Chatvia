<script setup>
defineProps({
  text: {
    type: String,
    default: "đang soạn tin",
  },
});
</script>

<template>
  <div
    class="typing flex items-center text-[12px] font-medium leading-5 bg-primary text-white px-2 rounded-se-md"
  >
    <div class="w-5 h-auto flex items-center justify-evenly">
      <p
        class="dot w-[3px] h-[3px] bg-white rounded-[50%]"
        style="--delay: 1s"
      ></p>
      <p
        class="dot w-[3px] h-[3px] bg-white rounded-[50%]"
        style="--delay: 2s"
      ></p>
      <p
        class="dot w-[3px] h-[3px] bg-white rounded-[50%]"
        style="--delay: 3s"
      ></p>
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.dot {
  transform: translateY(-2px);
  animation: stagger 0.5s infinite linear alternate;
  animation-delay: calc(-1 * (0.5 / 3) * var(--delay));
}
@keyframes stagger {
  to {
    transform: translateY(2px);
  }
}
</style>
