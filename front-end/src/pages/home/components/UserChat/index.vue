<script setup>
import { defineAsyncComponent } from "vue";
defineProps({
  user: {
    type: Object,
    default() {
      return {
        name: "",
        avatar: "",
      };
    },
  },
  message: Object,
  sizeAvatar: {
    type: Number,
    default: 35,
  },
  unread: {
    type: [Number, String],
  },
});

const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
const Badge = defineAsyncComponent(() =>
  import("@/components/Badge/index.vue")
);
</script>

<template>
  <div
    class="hover:bg-[#e6ebf5] border-t-[1px] border-solid border-[#f5f7fb] flex items-start px-5 py-[15px] rounded-[5px] cursor-pointer transition-all duration-[0.4s] ease-[cubic-bezier(0.25,0.1,0.25,1.0)]"
  >
    <Avatar class="me-4" :user="user" :size="sizeAvatar" />
    <div class="flex-grow">
      <h5
        :class="{
          truncate: true,
          'text-[15px]': true,
          'text-[#495057]': true,
          'mb-0': true,
          'font-semibold': unread > 0,
          'font-medium': unread == 0,
          'text-[#081c36]': unread > 0,
        }"
      >
        {{ user?.name }}
      </h5>
      <p
        :class="{
          truncate: true,
          'w-[220px]': true,
          'mb-0': true,
          'text-sm': true,
          'text-[#7589a3]': unread == 0,
          'text-[#081c36]': unread > 0,
        }"
      >
        {{ message?.body || "Typing..." }}
      </p>
    </div>
    <div class="time">
      <div class="text-[11px] mb-2 text-[#7a7f9a]">
        {{ message?.created_at }}
      </div>
      <div class="flex justify-end w-full p-0">
        <Badge :value="unread" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  background-color: $color-hover;
}
</style>
