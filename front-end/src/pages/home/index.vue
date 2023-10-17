<script setup>
import userService from "@/services/userService";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useWebsocketStore } from "@/stores/websocketStore";
import { useUserStore } from "@/stores/userStore";
import { defineAsyncComponent } from "vue";

const router = useRouter();
const websocketStore = useWebsocketStore();
const userStore = useUserStore();
websocketStore.connection();

const Avatar = defineAsyncComponent(() =>
  import("./components/Avatar/index.vue")
);
const ChatBox = defineAsyncComponent(() =>
  import("./components/ChatBox/index.vue")
);

const handleLogout = async () => {
  try {
    await userService.logout();
    localStorage.removeItem(import.meta.env.VITE_STORAGE_TOKEN);
    localStorage.removeItem(import.meta.env.VITE_STORAGE_USER);
    router.push("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};
</script>

<template>
  <div class="wrapper">
    <!--Sidebar.start-->
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
            <router-link to="/groups"
              ><i class="ri-group-line"></i
            ></router-link>
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
                <a class="dropdown-item" @click.stop.prevent="handleLogout">
                  Log out
                  <i class="text-muted ri-logout-circle-r-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
    <!--Sidebar.End-->

    <!--Chat.list.start-->
    <div class="chat-leftsidebar me-1">
      <div class="tab-content">
        <router-view />
      </div>
    </div>
    <!--Chat.list.end-->
    <ChatBox />
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
