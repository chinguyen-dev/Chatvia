<script setup>
import { useContact } from "@/composables";
const { tabs, handleChangeTab } = useContact();
</script>

<template>
  <div id="contact">
    <div class="h-16 flex items-center px-6">
      <h4 class="text-xl text-[#343a40] font-semibold">Danh bạ</h4>
    </div>
    <div
      v-for="tab in tabs"
      :key="tab?.id"
      :class="[tab?.active && 'bg-[#e6ebf5]', 'hover:bg-[#e6ebf5]']"
      @click="handleChangeTab(tab)"
    >
      <div class="flex items-center pl-6 py-3 cursor-pointer">
        <i :class="`${tab?.icon} mr-4 text-[18px] font-medium text-gray08`"></i>
        <p class="text-base font-semibold text-gray08">{{ tab?.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
