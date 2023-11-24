<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

defineProps({
  position: String,
});
</script>

<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton class="p-1 text-lg text-[#7a7f9a]">
      <slot name="button"></slot>
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="position"
        class="absolute z-10 w-[150px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-0">
          <slot name="body" :menuItem="MenuItem"></slot>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style lang="scss" scoped></style>
