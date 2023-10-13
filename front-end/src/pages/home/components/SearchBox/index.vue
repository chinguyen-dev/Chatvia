<script setup>
import { ref } from "vue";

const { onSubmit } = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  onSubmit: {
    type: Function,
    default: null,
  },
});
const searchText = ref();

const handleOnSearch = () => {
  if (!onSubmit || !searchText.value) return;
  onSubmit(searchText.value);
  searchText.value = "";
};
</script>

<template>
  <div class="search-box">
    <button type="button" class="text-muted" @click="handleOnSearch">
      <i class="ri-search-line"></i>
    </button>
    <input v-bind="$attrs" v-model="searchText" :placeholder="placeholder" />
    <button type="button" class="text-muted">
      <i class="ri-user-add-line"></i>
    </button>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
