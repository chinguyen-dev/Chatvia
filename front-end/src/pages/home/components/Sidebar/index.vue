<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useChatStore } from "@/stores/ChatStore";

const userStore = useUserStore();
const chatStore = useChatStore();
const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
const Badge = defineAsyncComponent(() =>
  import("@/components/Badge/index.vue")
);

const avatarLink = ref(
  "http://chatvia-light.vue.themesbrand.com/img/logo.de6401ef.svg"
);

const { onsubmit } = defineProps({
  onsubmit: {
    type: Function,
    default: null,
  },
});

const handleOnSubmit = () => {
  if (!onsubmit) return;
  onsubmit();
};
</script>

<template>
  <div
    class="flex flex-col mr-1 min-w-[75px] max-w-[75px] h-screen min-h-[570px] bg-white z-[9] shadow-3xl"
  >
    <router-link to="/chat" class="flex justify-center items-center h-[70px]">
      <img class="h-[30px]" alt="avatar" :src="avatarLink" />
    </router-link>
    <div class="my-auto">
      <ul class="flex flex-wrap justify-center">
        <li class="my-[7px]">
          <router-link
            to="/profile"
            class="block w-[56px] h-[56px] text-[24px] text-center text-gray87 leading-[56px] rounded-lg relative"
          >
            <i class="ri-user-2-line"></i>
          </router-link>
        </li>
        <li class="my-[7px]">
          <router-link
            to="/chat"
            class="block w-[56px] h-[56px] text-[24px] text-center text-gray87 leading-[56px] rounded-lg relative"
          >
            <i class="ri-message-3-line"></i>
            <Badge :value="chatStore.countAllUnreadMessages" :class="{}" />
          </router-link>
        </li>
        <li class="my-[7px]">
          <router-link
            to="/groups"
            class="block w-[56px] h-[56px] text-[24px] text-center text-gray87 leading-[56px] rounded-lg relative"
            ><i class="ri-group-line"></i
          ></router-link>
        </li>
        <li class="my-[7px]">
          <router-link
            to="/contacts"
            class="block w-[56px] h-[56px] text-[24px] text-center text-gray87 leading-[56px] rounded-lg relative"
            ><i class="ri-contacts-line"></i
          ></router-link>
        </li>
        <li class="my-[7px]">
          <router-link
            to="/settings"
            class="block w-[56px] h-[56px] text-[24px] text-center text-gray87 leading-[56px] rounded-lg relative"
            ><i class="ri-settings-2-line"></i
          ></router-link>
        </li>
      </ul>
    </div>
    <div class="my-auto">
      <ul class="flex flex-wrap justify-center">
        <li class="my-[7px]">
          <router-link
            to="/dark"
            class="block w-[56px] h-[56px] text-[24px] text-center text-gray87 leading-[56px] rounded-lg relative"
          >
            <i class="ri-moon-line"></i>
          </router-link>
        </li>
        <div class="dropdown">
          <button
            class="btn btn-white"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar :user="userStore.user" :hidden="false" />
          </button>
          <!-- <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                Profile
                <i class="ri-profile-line text-muted"></i>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Setting
                <i class="text-muted ri-settings-3-line"></i>
              </a>
            </li>
            <li>
              <a class="dropdown-item" @click.stop.prevent="handleOnSubmit">
                Log out
                <i class="text-muted ri-logout-circle-r-line"></i>
              </a>
            </li>
          </ul> -->
        </div>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
a.active {
  color: #7269ef;
}
</style>
