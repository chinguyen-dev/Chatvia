<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineAsyncComponent } from "vue";
import "swiper/css";

const { onSubmit } = defineProps({
  contacts: {
    type: Array,
    required: true,
  },
  onSubmit: {
    type: Function,
    default: null,
  },
});

const handleOnSubmit = (data) => {
  if (!onSubmit) return;
  onSubmit(data);
};

const Avatar = defineAsyncComponent(() => import("@/components/Avatar.vue"));
</script>

<template>
  <Swiper :slides-per-view="4" class="px-[5px!important]">
    <SwiperSlide v-for="user in contacts" :key="user.id">
      <div class="px-[5px]">
        <div
          @click="handleOnSubmit(user)"
          class="block relative p-2 rounded-lg mt-4 text-center bg-[#e6ebf5] cursor-pointer"
        >
          <div class="absolute -top-[14px] left-0 right-0">
            <Avatar :user="user" status />
          </div>
          <h5 class="truncate text-[13px] font-semibold mt-4 mb-1">
            {{ user?.displayName }}
          </h5>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper-slide {
  width: 80.5px !important;
}
</style>
