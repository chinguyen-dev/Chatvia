<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { computed, defineAsyncComponent } from "vue";

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
  <Swiper :slides-per-view="4">
    <SwiperSlide v-for="user in usersMap" :key="user.id">
      <div class="item">
        <a href="" class="item__link">
          <div class="box-avatar">
            <Avatar :user="user" />
          </div>
          <h5 class="text-truncate mt-3 mb-1">{{ user.name }}</h5>
        </a>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style src="./style.scss" lang="scss" scoped />
