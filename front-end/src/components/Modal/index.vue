<script setup>
defineProps({
  title: String | Number,
});
defineEmits(["toggleModal"]);
</script>

<template>
  <div
    id="modal"
    class="fixed top-0 bottom-0 left-0 right-0 bg-[#00000080] z-10 flex items-center justify-center flex-col"
  >
    <div class="modal__container">
      <div class="dialog w-[360px] bg-white">
        <div
          class="header flex items-center h-12 border border-solid border-[#d6dbe1] pl-4 pr-2"
        >
          <div class="flex justify-between items-center flex-grow">
            <span class="block text-base font-semibold">{{ title }}</span>
            <div
              class="close flex items-center justify-center cursor-pointer text-[#27384f] hover:bg-[#dfe2e7] hover:rounded-[20px] w-8 h-8"
            >
              <i
                class="ri-close-line text-xl"
                @click="() => $emit('toggleModal', false)"
              ></i>
            </div>
          </div>
        </div>
        <div class="body pt-[14px]">
          <slot name="body"></slot>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
