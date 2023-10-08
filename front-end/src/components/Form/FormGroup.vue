<script setup>
import { defineAsyncComponent } from "vue";
const props = defineProps({
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
});

const Label = defineAsyncComponent(() => import("./Label.vue"));
const InputField = defineAsyncComponent(() => import("./InputField.vue"));
const emit = defineEmits(["update:modelValue", "toggleEye"]);

const passInputValue = (value) => emit("update:modelValue", value);
</script>

<template>
  <div class="form-group">
    <Label :class="labelClasses">{{ label }}</Label>
    <div class="input-group mb-3 bg-soft-light input-group-lg rounded-lg">
      <div
        class="input-group-prepend"
        :style="{ cursor: type === 'password' ? 'pointer' : 'default' }"
        @click="emit('toggleEye', !isShow)"
      >
        <span class="input-group-text border-light text-muted">
          <font-awesome-icon
            :icon="[icon[0], isShow ? 'eye-slash' : icon[1]]"
          />
        </span>
      </div>
      <InputField
        :type="isShow ? 'text' : type"
        :class="inputClasses"
        :value="modelValue"
        :placeholder="placeholder"
        @update:model-value="passInputValue"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
label {
  margin-bottom: 0.5rem;
}
.form-group {
  margin-bottom: 1rem;

  input {
    font-size: 0.875rem;
    height: calc(1.5em + 1rem + 6px);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-family: $font-Public-Sans;
  }
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
    display: flex;
    border: 1px solid #e6ebf5;
    border-top-left-radius: $border-radius;
    border-bottom-left-radius: $border-radius;

    .input-group-text {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: $border-radius;
    }
  }
}
</style>
