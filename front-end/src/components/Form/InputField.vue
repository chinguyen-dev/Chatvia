<template lang="">
  <input
    v-bind="$attrs"
    :class="inputClasses"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script setup>
defineProps({
  modelValue: String | Number,
  inputClasses: String | "",
});
const emit = defineEmits(["update:modelValue"]);
</script>
<style lang="scss" scoped></style>
