<script setup>
import { defineAsyncComponent } from "vue";
import userService from "../../services/userService";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const UserForm = defineAsyncComponent(() =>
  import("../../components/UserForm.vue")
);

const router = useRouter();

const handleOnSubmit = async (payload) => {
  try {
    await userService.register(payload);
    router.push("/login");
  } catch (error) {
    toast.error("Error registering");
  }
};
</script>

<template>
  <UserForm
    name="Sign up"
    title="Get your Chatvia account now."
    :on-submit="handleOnSubmit"
  />
</template>

<style lang="scss" scoped></style>
