<script setup>
import { defineAsyncComponent } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));

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
  <div class="side-menu">
    <div class="navbar-brand-box">
      <a href="">
        <img
          height="30"
          src="http://chatvia-light.vue.themesbrand.com/img/logo.de6401ef.svg"
          alt=""
        />
      </a>
    </div>
    <div class="my-auto">
      <ul class="menu-list">
        <li>
          <router-link to="/profile">
            <i class="ri-user-2-line"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/chat"
            ><i class="ri-message-3-line"></i
          ></router-link>
        </li>
        <li>
          <router-link to="/groups"><i class="ri-group-line"></i></router-link>
        </li>
        <li>
          <router-link to="/contacts"
            ><i class="ri-contacts-line"></i
          ></router-link>
        </li>
        <li>
          <router-link to="/settings"
            ><i class="ri-settings-2-line"></i
          ></router-link>
        </li>
      </ul>
    </div>
    <div class="my-auto">
      <ul class="menu-list">
        <li>
          <router-link to="/dark">
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
          <ul class="dropdown-menu">
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
          </ul>
        </div>
      </ul>
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
