<script setup>
defineProps({
  value: {
    type: [Number, String],
  },
});
</script>

<template>
  <span v-if="value > 0">{{ value > 5 ? "5+" : value }}</span>
</template>

<style lang="scss" scoped>
span {
  $size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc($size - 4px);
  line-height: calc($size - 4px);
  border-radius: 8px;
  min-width: $size;
  max-width: 40px;
  height: $size;
  color: #ffffff;
  background-color: #c31818;
  padding: 0 5px;
}
</style>
