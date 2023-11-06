<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, defineAsyncComponent } from "vue";
import "swiper/css";

const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));

const { users } = defineProps({
  users: {
    type: Array,
    default: [],
  },
});
const usersMap = computed(() => {
  return users.map((user) => {
    const userArr = user.name.split(" ");
    return {
      ...user,
      name: userArr[userArr.length - 1],
    };
  });
});
</script>

<template>
  <Swiper :slides-per-view="4" class="px-[5px!important]">
    <SwiperSlide v-for="user in usersMap" :key="user.id">
      <div class="px-[5px]">
        <a
          href=""
          class="block relative p-2 rounded-lg mt-4 text-center bg-[#e6ebf5]"
        >
          <div class="absolute -top-[14px] left-0 right-0">
            <Avatar :user="user" />
          </div>
          <h5 class="truncate text-[13px] font-semibold mt-4 mb-1">
            {{ user.name }}
          </h5>
        </a>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper-slide {
  width: 80.5px !important;
}
</style>
