<script setup>
import { defineAsyncComponent } from "vue";
defineProps({
  label: String,
  type: String,
  labelClasses: String,
  inputClasses: String,
  placeholder: String,
  icon: Array,
  modelValue: String | Number,
  isShow: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});

const Label = defineAsyncComponent(() => import("./Label.vue"));
const InputField = defineAsyncComponent(() => import("./InputField.vue"));
const emit = defineEmits(["update:modelValue", "toggleEye"]);

const passInputValue = (value) => emit("update:modelValue", value);
</script>

<template>
  <div class="form-group">
    <Label :class="labelClasses">{{ label }}</Label>
    <div
      class="input-group relative flex flex-wrap items-stretch w-full bg-[#e6ebf540] rounded-lg"
    >
      <div
        class="input-group-prepend bg-[#e6ebf540] flex border border-solid border-[#e6ebf5] rounded-s-lg border-r-0"
        :style="{ cursor: type === 'password' ? 'pointer' : 'default' }"
        @click="emit('toggleEye', !isShow)"
      >
        <span class="flex items-center py-2 px-4 text-muted">
          <font-awesome-icon
            :icon="[icon[0], isShow ? 'eye-slash' : icon[1]]"
          />
        </span>
      </div>
      <InputField
        :type="isShow ? 'text' : type"
        :class="inputClasses"
        :modelValue="modelValue"
        :placeholder="placeholder"
        @update:model-value="passInputValue"
      />
    </div>
    <span class="error text-red-600 block text-sm mt-2">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
input {
  height: calc(1.5em + 1rem + 6px);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-family: $font-Public-Sans;
}

.input-group {
  $border-radius: 0.5rem;
  .form-control {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
    border: 1px solid #e6ebf5 !important;
  }

  .input-group-prepend {
    .input-group-text {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: $border-radius;
    }
  }
}
</style>
