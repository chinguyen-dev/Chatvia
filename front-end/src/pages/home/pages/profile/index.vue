<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useCommon } from "@/composables/commonComposable";
const Dropdown = defineAsyncComponent(() =>
  import("@/components/Dropdown/index.vue")
);

const Accordion = defineAsyncComponent(() =>
  import("./components/Accordion/index.vue")
);

const userStore = useUserStore();
const { convertName } = useCommon();

const user = computed(() => userStore.user);
</script>

<template>
  <div id="profile" class="">
    <div class="flex items-center justify-between pt-6 px-6">
      <h4 class="text-xl text-[#343a40] font-semibold">Hồ Sơ</h4>
      <Dropdown position="right-2 origin-top-right">
        <template #button>
          <i class="ri-more-2-fill"></i>
        </template>

        <template #body="{ menuItem }">
          <component :is="menuItem">
            <button
              type="button"
              class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              <i class="ri-reply-line mr-2"></i>
              <span>Trả lời</span>
            </button>
          </component>
          <component :is="menuItem">
            <button
              type="button"
              class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              <i class="ri-edit-2-line mr-2"></i><span>Chỉnh sửa</span>
            </button>
          </component>
          <component :is="menuItem">
            <button
              type="button"
              class="block w-full text-left border-t px-4 py-2 text-red-600 text-sm hover:bg-gray-100"
            >
              <i class="ri-delete-bin-5-line mr-2"></i>
              <span>Xóa</span>
            </button>
          </component>
        </template>
      </Dropdown>
    </div>
    <div class="flex flex-col p-6 border-b">
      <div class="relative mb-6 inline-block my-0 mx-auto">
        <img
          class="w-full max-w-[96px] h-auto rounded-full p-1 border border-solid border-[#f0eff5]"
          :src="user?.avatar"
          alt=""
        />
        <button
          type="button"
          class="absolute block rounded-full bg-[#e6ebf5] right-0 bottom-0 left-auto w-9 h-9"
        >
          <i class="ri-pencil-fill"></i>
        </button>
      </div>
      <h5
        class="text-center text-[#343a40] font-semibold text-base mb-1 truncate"
      >
        {{ convertName(user.name) }}
      </h5>
      <div
        class="flex items-center justify-center text-sm text-muted truncate mb-1"
      >
        <p
          class="flex items-center justify-center w-[11px] h-[11px] bg-[#06d6a0] rounded-full mr-1"
        >
          <span class="block w-[3px] h-[3px] bg-white rounded-full"></span>
        </p>
        Online
      </div>
    </div>
    <div class="relative h-[calc(100vh_-_290px)]">
      <div class="absolute p-6 top-0 bottom-0 overflow-x-auto w-full">
        <Accordion>
          <template #name>
            <i class="ri-user-2-line mr-2"></i>
            Thông tin
          </template>
          <template #content>
            <div class="">
              <p class="text-muted mb-1">Họ và tên</p>
              <h5 class="text-sm font-semibold">{{ user.name }}</h5>
            </div>
            <div class="mt-5">
              <p class="text-muted mb-1">Email</p>
              <h5 class="text-sm font-semibold">{{ user.email }}</h5>
            </div>
            <div class="mt-5">
              <p class="text-muted mb-1">Ngày đăng ký</p>
              <h5 class="text-sm font-semibold">{{ user.created_at }}</h5>
            </div>
          </template>
        </Accordion>
        <Accordion>
          <template #name>
            <i class="ri-attachment-line mr-2"></i>
            File đính kèm
          </template>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 7px;
  display: block;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #b1b5b9;
}
</style>
