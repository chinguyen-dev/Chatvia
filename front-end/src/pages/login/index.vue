<script setup>
import userService from "@/services/userService";
import { defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useUserStore } from "@/stores/userStore";
const router = useRouter();
const userStore = useUserStore();
const UserForm = defineAsyncComponent(() =>
  import("../../components/UserForm.vue")
);

const handleLogin = async (payload) => {
  try {
    const token = await userService.login(payload);
    localStorage.setItem(import.meta.env.VITE_STORAGE_TOKEN, token);
    const user = await userService.getUser();
    localStorage.setItem(
      import.meta.env.VITE_STORAGE_USER,
      JSON.stringify(user)
    );
    userStore.setState({
      user,
      token,
    });
    await router.push("/");
  } catch (error) {
    toast.error("Failed to login");
  }
};
</script>

<template>
  <UserForm
    name="Sign in"
    title="Sign in to continue to Chatvia."
    :on-submit="handleLogin"
  />
</template>

<style lang="scss" scoped />
