<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { ref } from "vue";

const images = ref([
  {
    name: "Nhắn tin nhiều hơn, soạn thảo ít hơn",
    src: "https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png",
    desc: "Sử dụng tin nhắn nhanh để lưu sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ.",
  },
  {
    name: "Tin nhắn tự xóa",
    src: "https://chat.zalo.me/assets/vanish_onboard.95edcd15d875cae4d6d504d739eaa977.png",
    desc: "Từ giờ tin nhắn đã có thể tự động tự xóa sau khoảng thời gian nhất định.",
  },
  {
    name: "Mã hóa đầu cuối",
    src: "https://chat.zalo.me/assets/inapp-welcome-screen-e2ee-06.58e0949293cc655af6dfbb74ede92bf3.svg",
    desc: "Nội dung tin nhắn được mã hóa trong suốt quá trình gửi và nhận",
  },
  {
    name: "Trải nghiệm xuyên suốt",
    src: "https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg",
    desc: "Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ",
  },
  {
    name: "Gửi File nặng?",
    src: "https://chat.zalo.me/assets/inapp-welcome-screen-04.ade93b965a968b16f2203e9d63b283a7.jpg",
    desc: "Đã có Chatvia PC 'xử' hết",
  },
]);
</script>

<template>
  <div class="flex items-center justify-center flex-col text-[#081c36]">
    <div class="w-[415px] text-center mb-[50px]">
      <div class="mb-4 text-[#081c36]">
        <span class="text-[23px] leading-6 font-normal"
          >Chào mừng đến với
          <span class="text-[23px] leading-6 font-semibold text-[#081c36]"
            >Chatvia PC</span
          >!</span
        >
      </div>
      <div class="text-[15px] leading-6">
        Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân,
        bạn bè được tối ưu hoá cho máy tính của bạn.
      </div>
    </div>
    <swiper
      navigation
      :pagination="{
        clickable: true,
      }"
      loop
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :modules="[Navigation, Pagination, Autoplay]"
      id="swiper"
      class="max-w-[1000px]"
    >
      <swiper-slide
        class="text-center"
        v-for="({ src, name, desc }, index) in images"
        :key="index"
      >
        <img
          class="block w-[380px] h-auto mx-auto mb-4"
          :src="src"
          :alt="name"
        />
        <p class="text-lg text-primary font-semibold mt-5 pb-3">{{ name }}</p>
        <p class="text-sm">{{ desc }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
@import "swiper/scss/navigation";
@import "swiper/scss/pagination";
#swiper {
  padding-bottom: 50px;

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 24px;
    color: $color-purple;
  }

  .swiper-pagination-bullet {
    background-color: $color-purple;
  }
}
</style>
