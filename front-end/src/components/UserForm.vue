<script setup>
import { useForm } from "vee-validate";
import { defineAsyncComponent, ref } from "vue";
import * as yup from "yup";

const { onSubmit, name } = defineProps({
  title: String,
  name: String,
  onSubmit: {
    type: Function,
    default: null,
  },
});
const filterPatternValidatorByFormName = (pattern) =>
  name === "Sign up"
    ? pattern
    : {
        email: pattern.email,
        password: pattern.password,
      };

const schema = yup.object(
  filterPatternValidatorByFormName({
    email: yup
      .string()
      .required("Please your enter email")
      .email("Email invalid"),
    username: yup.string().required("Please your enter username"),
    password: yup
      .string()
      .required("please your enter password")
      .min(6, "Password must be at least 6 characters"),
  })
);

const { errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: schema,
});

const email = defineInputBinds("email");
const password = defineInputBinds("password");
const username = defineInputBinds("username");

const FormGroup = defineAsyncComponent(() => import("./Form/FormGroup.vue"));
const toggleEye = ref(false);
const handleOnSubmit = handleSubmit((credentials) => {
  if (!onSubmit) return;
  onSubmit(credentials);
});
</script>

<template>
  <div class="account-pages my-12 pt-4">
    <div class="w-full max-w-[1140px] mx-auto px-3">
      <div class="grid grid-cols-10">
        <div class="col-start-4 col-span-4">
          <div class="text-center mb-6">
            <a href="/" class="auth-logo mb-10 block">
              <img
                class="h-[30px] block mx-auto"
                src="@/assets/images/logo-dark.37cbc9c5.png"
                alt="logo"
              />
            </a>
            <h4 class="text-[#495057] font-semibold text-[21px] leading-6 mb-2">
              {{ name }}
            </h4>
            <p class="text-muted mb-6">{{ title }}</p>
          </div>
          <div
            class="relative flex mb-6 flex-col min-w-0 bg-white bg-clip-border border-0 border-solid border-[#f5f7fb]"
          >
            <div class="p-6 min-h-[1px] flex-auto">
              <div class="p-4">
                <form @submit.prevent="handleOnSubmit">
                  <FormGroup
                    v-if="name === 'Sign up'"
                    label="Username"
                    label-classes="mb-2 inline-block font-medium"
                    type="text"
                    placeholder="Enter username"
                    input-classes="form-control px-4 py-2 rounded-lg bg-[#e6ebf540] text-sm font-normal"
                    :="username"
                    :icon="['far', 'user']"
                    :error="errors.username"
                    :class="{
                      'mb-2': !!errors.password,
                      'mb-4': !errors.password,
                    }"
                  />
                  <FormGroup
                    label="Email"
                    label-classes="mb-2 inline-block font-medium"
                    type="email"
                    placeholder="Enter your email"
                    input-classes="form-control px-4 py-2 rounded-lg bg-[#e6ebf540] text-sm font-normal"
                    :="email"
                    :icon="['far', 'envelope']"
                    :error="errors.email"
                    :class="{
                      'mb-2': !!errors.password,
                      'mb-4': !errors.password,
                    }"
                  />
                  <FormGroup
                    class="mb-6"
                    label="Password"
                    label-classes="mb-2 inline-block font-medium"
                    type="password"
                    placeholder="Enter your password"
                    input-classes="form-control px-4 py-2 rounded-lg bg-[#e6ebf540] text-sm font-normal"
                    :="password"
                    :modelValue="password.value"
                    :icon="['far', 'eye']"
                    :error="errors.password"
                    :isShow="toggleEye"
                    @toggle-eye="(data) => (toggleEye = data)"
                  />
                  <button
                    type="submit"
                    class="w-full hover:bg-[#5246eb] block border border-solid border-transparent rounded-md text-white px-3 py-2 bg-[#7269ef]"
                  >
                    {{ name }}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-12 text-center">
            <p class="mt-0 mb-4">
              Don't have an account ?
              <router-link
                :to="name == 'Sign in' ? '/register' : '/login'"
                class="font-medium text-[#7269ef]"
              >
                {{ name == "Sign in" ? "Sign up" : "Sign in" }} now
              </router-link>
            </p>
            <p>
              © 2023 Chatvia. Created with
              <font-awesome-icon
                :icon="['fas', 'heart']"
                class="text-red-600"
              />
              by Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
