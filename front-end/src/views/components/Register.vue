<script setup>
import { defineAsyncComponent } from "vue";
import { useAuth } from "@/composables";

const { handleRegister } = useAuth();

const UserForm = defineAsyncComponent(() =>
  import("@/components/UserForm.vue")
);
</script>

<template>
  <UserForm
    name="Sign up"
    title="Get your Chatvia account now."
    :on-submit="handleRegister"
  />
</template>
