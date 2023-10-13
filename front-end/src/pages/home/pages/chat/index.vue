<script setup>
import { defineAsyncComponent, ref } from "vue";

const SearchBox = defineAsyncComponent(() =>
  import("../../components/SearchBox/index.vue")
);

const handleOnSearch = (payload) => {
  console.log(payload);
};
</script>

<template>
  <div class="box-chat">
    <div class="px-4 pt-4">
      <h4 class="mb-4">chats</h4>
      <SearchBox
        type="text"
        :on-submit="handleOnSearch"
        placeholder="Search messages or users"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
