<script setup>
import { defineAsyncComponent } from "vue";
import { useCommon } from "@/composables";
const { onRevoke, onAccept, onIgnore } = defineProps({
  received: {
    type: Boolean,
    default: false,
  },
  contacts: Object,
  onRevoke: {
    type: Function,
    default: null,
  },
  onAccept: {
    type: Function,
    default: null,
  },
  onIgnore: {
    type: Function,
    default: null,
  },
});

const { convertName } = useCommon();
const Avatar = defineAsyncComponent(() => import("@/components/Avatar.vue"));

const handleOnRevoke = (id) => {
  if (!onRevoke) return;
  console.log(id);
};
const handleOnAccept = () => {
  if (!onAccept) return;
};
const handleOnIgnore = () => {
  if (!onIgnore) return;
};
</script>

<template>
  <template v-if="contacts.length > 0">
    <div class="py-5">
      <p class="text-[15px] leading-5 text-gray08 font-semibold">
        Lời mời {{ received ? "đã nhận" : "đã gửi" }} ({{ contacts.length }})
      </p>
    </div>
    <div class="flex items-center flex-wrap">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="mr-3 mb-3 bg-[#f7f7ff] p-4 rounded"
      >
        <div class="flex items-start justify-around w-[326.333px] mb-4">
          <div class="avatar">
            <Avatar
              :user="received ? contact?.sender : contact?.receiver"
              :hidden="false"
              :size="46"
            />
          </div>
          <div class="content text-gray08 grow ml-2">
            <p class="text-[15px] leading-6 font-semibold mb-[2px]">
              {{
                received
                  ? convertName(contact?.sender?.name)
                  : convertName(contact?.receiver?.name)
              }}
            </p>
            <p class="truncate text-muted text-xs">
              {{
                received
                  ? "Vài giây - từ cửa sổ trò chuyện"
                  : "Bạn đã gửi lời mời"
              }}
            </p>
          </div>
          <div
            class="flex items-center justify-center cursor-pointer w-8 h-8 hover:bg-[#dfe2e7] rounded-full"
          >
            <i class="ri-wechat-2-line text-muted text-lg"></i>
          </div>
        </div>
        <div v-if="received" class="flex items-center justify-between">
          <button
            type="button"
            class="block basis-1/2 mr-1 py-2 text-primary font-semibold bg-[#7269ef40] rounded"
          >
            Từ chối
          </button>
          <button
            type="button"
            class="block basis-1/2 ml-1 text-white font-semibold bg-[#7269ef] py-2 rounded"
          >
            Đồng ý
          </button>
        </div>
        <button
          v-else
          @click="handleOnRevoke(contact?.contact_id)"
          type="button"
          class="block w-full mr-1 py-2 text-primary font-semibold bg-[#7269ef40] rounded"
        >
          Thu hồi lời mời
        </button>
      </div>
    </div>
  </template>
  <template v-else-if="received">
    <div class="flex items-center justify-center flex-col py-16">
      <img
        src="@/assets/images/invitation-empty.png"
        alt="invitation-empty.png"
      />
      <span class="block text-center text-sm text-[#97a4b5] font-medium mt-4">
        Bạn không có lời mời nào
      </span>
    </div>
  </template>
</template>

<style lang="scss" scoped></style>
