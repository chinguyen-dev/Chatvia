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
  <div class="account-pages my-5 pt-sm-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-5">
          <div class="text-center mb-4">
            <a href="/" class="auth-logo mb-5 d-block">
              <img
                src="@/assets/images/logo-dark.37cbc9c5.png"
                alt="logo"
                height="30"
              />
            </a>
            <h4>{{ name }}</h4>
            <p class="text-muted mb-4">{{ title }}</p>
          </div>
          <div class="card">
            <div class="card-body p-4">
              <div class="p-3">
                <form @submit.prevent="handleOnSubmit">
                  <FormGroup
                    v-if="name === 'Sign up'"
                    label="Username"
                    label-classes="fw-500"
                    type="text"
                    placeholder="Enter username"
                    :icon="['far', 'user']"
                    :="username"
                    input-classes="form-control bg-soft-light border-light"
                  />
                  <span
                    v-if="name === 'Sign up'"
                    class="error text-danger mb-2 d-block"
                    >{{ errors.username }}</span
                  >
                  <FormGroup
                    label="Email"
                    label-classes="fw-500"
                    type="email"
                    placeholder="Enter your email"
                    :icon="['far', 'envelope']"
                    :="email"
                    input-classes="form-control bg-soft-light border-light"
                  />
                  <span class="error text-danger mb-2 d-block">{{
                    errors.email
                  }}</span>
                  <FormGroup
                    :class="{
                      'mb-2': !!errors.password,
                      'mb-4': !errors.password,
                    }"
                    label="Password"
                    label-classes="fw-500"
                    type="password"
                    placeholder="Enter your password"
                    :icon="['far', 'eye']"
                    :="password"
                    input-classes="form-control bg-soft-light border-light"
                    :isShow="toggleEye"
                    @toggle-eye="(data) => (toggleEye = data)"
                  />
                  <span class="error text-danger mb-4 d-block">{{
                    errors.password
                  }}</span>
                  <div>
                    <button type="submit">
                      {{ name }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-5 text-center">
            <p>
              Don't have an account ?
              <router-link
                :to="name == 'Sign in' ? '/register' : '/login'"
                class="font-weight-medium text-primary"
              >
                {{ name == "Sign in" ? "Sign up" : "Sign in" }} now
              </router-link>
            </p>
            <p>
              © 2023 Chatvia. Created with
              <font-awesome-icon :icon="['fas', 'heart']" class="text-danger" />
              by Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  display: block;
  margin: 0 auto;
}

h4 {
  color: #495057;
  font-family: $font-Public-Sans;
  font-weight: 600;
  font-size: 1.3125rem;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid #f5f7fb;
  border-radius: 0.25rem;
}

button {
  display: block;
  width: 100%;
  border: 1px solid transparent;
  padding: 0.47rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #7269ef;
  border-color: #7269ef;

  &:hover {
    background-color: #5246eb;
    border-color: #473bea;
  }
}
</style>
