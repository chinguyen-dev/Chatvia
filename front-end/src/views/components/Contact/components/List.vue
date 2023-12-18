<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useCommon } from "@/composables";

const Avatar = defineAsyncComponent(() => import("@/components/Avatar.vue"));
const { data } = defineProps({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    default: [],
  },
});

const Chars = ref(import.meta.env.VITE_CHAR_LIST);

const { convertName } = useCommon();

const getContactsByChar = (char) => {
  const contacts = data
    .map((contact) => ({
      ...contact,
      name: convertName(contact?.name),
    }))
    .filter(({ name }) => {
      const arrName = name.split(" ");
      return arrName[0].includes(char);
    });
  return contacts.map((contact, index) => ({
    ...contact,
    isActive: index !== contacts.length - 1,
  }));
};
const isContaining = (char) => {
  return data.some(({ name }) => {
    const arrName = convertName(name).split(" ");
    return arrName[0].includes(char);
  });
};
</script>

<template>
  <p class="text-sm text-gray08 font-semibold my-4">
    {{ `${type === "friend" ? "Bạn bè" : "Nhóm"} (${data.length})` }}
  </p>
  <!-- Filter -->
  <div class="flex items-center">
    <div class="w-[30%] flex items-center my-4 border border-solid rounded">
      <i class="ri-search-line px-2 text-muted text-sm"></i>
      <input
        type="text"
        class="pr-3 py-2 flex-grow text-sm rounded"
        :placeholder="type === 'friend' ? 'Tìm bạn' : 'Tìm nhóm'"
      />
    </div>
  </div>
  <!-- List -->
  <template v-if="type === 'friend'">
    <div class="">
      <ul>
        <li v-for="(char, index) in Chars" :key="index">
          <template v-if="isContaining(char)">
            <p class="text-base text-gray08 font-semibold">{{ char }}</p>
            <div
              v-for="contact in getContactsByChar(char)"
              :key="contact?.id"
              :class="`relative flex items-center justify-between p-3 ${
                contact.isActive && active
              }`"
            >
              <div class="flex items-center">
                <Avatar :user="contact" :size="40" class="mr-2" />
                <p class="text-base font-semibold">{{ contact?.name }}</p>
              </div>
              <div class="dropdown">
                <i class="ri-more-fill text-lg text-muted"></i>
              </div>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </template>
  <template v-else> group </template>
</template>

<style lang="scss" scoped>
.active::after {
  content: "";
  position: absolute;
  width: calc(100% - 65px);
  height: 1px;
  right: 0;
  bottom: 0;
  background-color: #d6dbe1;
}
</style>
