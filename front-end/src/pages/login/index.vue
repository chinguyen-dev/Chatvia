<script setup>
import { defineAsyncComponent } from "vue";
import { useAuth } from "@/composables/authComposable";

const { handleLogin } = useAuth();

const UserForm = defineAsyncComponent(() =>
  import("@/components/UserForm.vue")
);
</script>

<template>
  <UserForm
    name="Sign in"
    title="Sign in to continue to Chatvia."
    :on-submit="handleLogin"
  />
</template>

<style lang="scss" scoped />
