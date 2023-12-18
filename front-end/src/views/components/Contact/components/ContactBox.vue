<script setup>
import { useContactStore, useChatStore } from "@/stores";
import { useContact } from "@/composables";
import { computed, defineAsyncComponent } from "vue";

const List = defineAsyncComponent(() => import("./List.vue"));
const Invitation = defineAsyncComponent(() => import("./Invitation.vue"));

const chatStore = useChatStore();
const contactStore = useContactStore();
const { handleRevokeInvitation, handleAcceptInvitation } = useContact();

const tab = computed(() => contactStore.currentTab);
const handleFilterData = computed(() => {
  const { type } = contactStore.currentTab;
  return type === "friend" ? contactStore.getContact : chatStore.getChatGroup;
});
</script>

<template>
  <div class="w-full bg-white shadow-3xl">
    <div
      class="header h-16 px-4 flex items-center text-base font-medium border-b border-solid border-[#c5c9ce]"
    >
      <i :class="`${tab?.icon} mr-3 text-[18px] font-medium text-gray08`"></i>
      <p class="text-base font-semibold text-gray08">{{ tab?.name }}</p>
    </div>
    <div class="body">
      <div class="px-4">
        <keep-alive>
          <template v-if="tab?.type === 'invitation'">
            <Invitation
              :contacts="contactStore.getContactAwaiting"
              :on-accept="handleAcceptInvitation"
              received
            />
            <Invitation
              :contacts="contactStore.getContactSent"
              :on-revoke="handleRevokeInvitation"
            />
          </template>
          <template v-else>
            <List :type="tab?.type" :data="handleFilterData" />
          </template>
        </keep-alive>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
