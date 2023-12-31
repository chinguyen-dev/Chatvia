<script setup>
import { defineAsyncComponent, reactive, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useChatStore } from "@/stores/chatStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const userStore = useUserStore();
const chatStore = useChatStore();

const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
const Badge = defineAsyncComponent(() =>
  import("@/components/Badge/index.vue")
);

const sidebar = reactive({
  items: [
    {
      name: "profile",
      icon: "ri-user-2-line",
      active: false,
    },
    {
      name: "chat",
      icon: "ri-message-3-line",
      active: true,
    },
    {
      name: "group",
      icon: "ri-group-line",
    },
    {
      name: "contacts",
      icon: "ri-contacts-line",
    },
    {
      name: "settings",
      icon: "ri-settings-2-line",
    },
  ],
});

const { onsubmit, onClick } = defineProps({
  onsubmit: {
    type: Function,
    default: null,
  },
  onClick: {
    type: Function,
    default: null,
  },
});

const handleOnSubmit = () => {
  if (!onsubmit) return;
  onsubmit();
};

const handleOnClick = (tabName) => {
  if (!onClick) return;
  sidebar.items = sidebar.items.map((item) => ({
    ...item,
    active: item.name === tabName,
  }));
  onClick(tabName);
};
</script>

<template>
  <div
    class="flex flex-col mr-1 min-w-[75px] max-w-[75px] h-screen min-h-[570px] bg-white z-[9] shadow-3xl"
  >
    <router-link to="/chat" class="flex justify-center items-center h-[70px]">
      <img class="h-[30px]" alt="avatar" src="@/assets/images/logo.svg" />
    </router-link>
    <div class="my-auto">
      <ul class="flex flex-wrap justify-center">
        <li
          class="my-[7px]"
          v-for="({ name, icon, active }, index) in sidebar.items"
          :key="index"
        >
          <p
            @click="handleOnClick(name)"
            :title="name"
            :class="active && 'text-primary'"
            class="cursor-pointer w-[56px] h-[56px] text-[24px] text-center text-muted leading-[56px] rounded-lg relative"
          >
            <i :class="icon"></i>
            <Badge
              v-if="name === 'chat'"
              :value="chatStore.countAllUnreadMessages"
              class="absolute top-0 right-0"
            />
          </p>
        </li>
      </ul>
    </div>
    <ul class="flex flex-wrap justify-center">
      <li class="my-[7px]">
        <router-link
          to="/dark"
          class="block w-[56px] h-[56px] text-[24px] text-center text-muted leading-[56px] rounded-lg relative"
        >
          <i class="ri-moon-line"></i>
        </router-link>
      </li>
      <Menu as="div" class="relative inline-block my-[7px]">
        <MenuButton class="p-1 text-lg text-[#7a7f9a]">
          <Avatar :user="userStore.user" :hidden="false" />
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
            class="absolute -top-36 z-10 mt-2 w-[150px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <menu-item>
                <a
                  href="#"
                  class="flex items-center justify-between px-4 py-2 text-base font-normal hover:bg-gray-100"
                >
                  <span>Hồ sơ</span>
                  <i
                    class="ri-profile-line text-muted text-base font-normal"
                  ></i>
                </a>
              </menu-item>
              <menu-item>
                <a
                  href="#"
                  class="flex items-center justify-between px-4 py-2 text-base font-normal hover:bg-gray-100"
                >
                  <span>Cài đặt</span>
                  <i
                    class="text-muted text-base font-normal ri-settings-3-line"
                  ></i>
                </a>
              </menu-item>
              <menu-item>
                <a
                  href="#"
                  @click.prevent="handleOnSubmit"
                  class="flex items-center justify-between px-4 py-2 text-base font-normal hover:bg-gray-100"
                >
                  Đăng xuất
                  <i
                    class="text-muted text-base font-normal ri-logout-circle-r-line"
                  ></i>
                </a>
              </menu-item>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </ul>
  </div>
</template>
<style lang="scss" scoped></style>
