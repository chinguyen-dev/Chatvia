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
const searchText = ref("");

const handleOnSearch = () => {
  if (!onSubmit || !searchText.value) return;
  onSubmit(searchText.value);
  searchText.value = "";
};
</script>

<template>
  <div class="flex items-center flex-wrap bg-[#e6ebf5] rounded-lg mb-4">
    <button
      type="button"
      class="block text-base bg-transparent py-2 pr-1 pl-4 focus:shadow-focus focus:rounded-s"
      @click="handleOnSearch"
    >
      <i class="ri-search-line text-lg text-muted"></i>
    </button>
    <input
      v-bind="$attrs"
      class="px-2 py-4 bg-transparent flex-grow text-[15px] leading-3"
      v-model="searchText"
      :placeholder="placeholder"
    />
    <button
      type="button"
      class="block text-base bg-transparent px-3 py-2 focus:shadow-focus focus:rounded-e-lg"
    >
      <i class="ri-user-add-line text-lg text-muted"></i>
    </button>
  </div>
</template>
