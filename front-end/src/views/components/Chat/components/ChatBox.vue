<script setup>
import { useUserStore } from "@/stores";
import websocketService from "@/services/websocket";
import { useEvent, useEmoji, useCommon } from "@/composables";
import { defineAsyncComponent, onMounted, onUpdated } from "vue";
import "vue3-emoji-picker/css";

const Avatar = defineAsyncComponent(() => import("@/components/Avatar.vue"));
const EmojiPicker = defineAsyncComponent(() => import("vue3-emoji-picker"));
const SlideShow = defineAsyncComponent(() => import("./SlideShow.vue"));
const Typing = defineAsyncComponent(() => import("./Typing.vue"));
const Dropdown = defineAsyncComponent(() =>
  import("@/components/Dropdown/index.vue")
);

const userStore = useUserStore();
const { toggleEmoji, scrollHeight } = useEvent();
const { findSenderById, convertName } = useCommon();
const { handleToggleEmoji, emoji, input, onSelectEmoji } = useEmoji();

const { onsubmit, onscroll, typing } = defineProps({
  onsubmit: {
    type: Function,
    default: null,
  },
  room: {
    type: Object,
    default: null,
  },
  typing: Boolean,
});

const handleOnSubmit = (room) => {
  if (!onsubmit || !room) return;
  const payload = {
    type: room?.room_type,
    to: room.room_type == "people" ? findSenderById(room)?.id : null,
    msg: input.value,
  };
  onsubmit(payload);
  input.value = "";
};

const senderOrGroup = (room) => {
  return room?.room_type === "people"
    ? room.members.find((member) => member.id !== userStore.user.id)
    : {
        name: "Group chat",
        avatar:
          "https://icon-library.com/images/group-icon-png/group-icon-png-15.jpg",
      };
};

const typingEvent = (room) => {
  if (room?.room_type === "people") {
    const { room_id, room_type } = room;
    const receiver = room?.members.find(
      (member) => member.id !== userStore.user?.id
    );
    websocketService.typing({
      roomId: room_id,
      type: room_type,
      user: receiver,
    });
  } else {
    // Typing room
  }
};

const checkPositionMessage = (message) => {
  return message.sender?.id == userStore.user.id
    ? "right flex justify-end"
    : "flex";
};

const checkPositionDropdown = (message) => {
  return message.sender?.id !== userStore.user.id
    ? "left-2 origin-top-left"
    : "right-2 origin-top-right";
};

onMounted(() => {
  scrollHeight(".scrollbar");
  toggleEmoji(emoji);
});

onUpdated(() => scrollHeight(".scrollbar"));
</script>

<template>
  <div class="w-full bg-white shadow-3xl transition-all duration-[0.4s]">
    <div class="w-full relative overflow-hidden" v-show="room">
      <!-- Header -->
      <div class="p-6 border border-solid border-[#f0eff5]">
        <div class="grid grid-cols-2">
          <div class="flex items-center">
            <Avatar class="me-3" :user="senderOrGroup(room)" :size="40" />
            <h5 class="flex-grow font-semibold text-base">
              {{ room?.name || convertName(findSenderById(room)?.name) }}
            </h5>
          </div>
        </div>
      </div>
      <!-- Body -->
      <div class="relative h-[calc(100vh_-_178px)]">
        <div class="scrollbar absolute m-0 top-0 right-0 left-0 bottom-0 p-6">
          <div
            :key="message.id"
            v-for="message in room?.messages"
            :class="checkPositionMessage(message)"
          >
            <div class="message flex items-end mb-7">
              <Avatar
                class="me-3"
                :user="
                  message.sender?.id == userStore.user.id
                    ? userStore.user
                    : message.sender
                "
              />
              <div class="box flex-grow-1">
                <div class="text-wrap flex mb-[10px]">
                  <div
                    class="text-wrap__content relative text-[#f5f7fb] px-5 py-3 bg-[#7269ef] rounded-lg rounded-bl-none"
                  >
                    <span>{{ message.body }}</span>
                    <p class="text-[12px] mt-1 text-right text-[#ffffff80]">
                      <i class="ri-time-line"></i> {{ message.created_at }}
                    </p>
                  </div>
                  <Dropdown :position="checkPositionDropdown(message)">
                    <template #button>
                      <i class="ri-more-2-fill"></i>
                    </template>

                    <template #body="{ menuItem }">
                      <component :is="menuItem">
                        <button
                          type="button"
                          class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <i class="ri-reply-line mr-2"></i>
                          <span>Trả lời</span>
                        </button>
                      </component>
                      <component :is="menuItem">
                        <button
                          type="button"
                          class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <i class="ri-edit-2-line mr-2"></i
                          ><span>Chỉnh sửa</span>
                        </button>
                      </component>
                      <component :is="menuItem">
                        <button
                          type="button"
                          class="block w-full text-left border-t px-4 py-2 text-red-600 text-sm hover:bg-gray-100"
                        >
                          <i class="ri-delete-bin-5-line mr-2"></i>
                          <span>Xóa</span>
                        </button>
                      </component>
                    </template>
                  </Dropdown>
                </div>
                <div class="name text-sm font-medium">
                  {{
                    message.sender?.id == userStore.user.id
                      ? convertName(userStore.user?.name)
                      : convertName(message.sender?.name)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0" v-if="typing">
          <Typing />
        </div>
      </div>
      <!-- Footer -->
      <div class="p-5 border-t">
        <form @submit.prevent="handleOnSubmit(room)" class="flex items-center">
          <input
            type="text"
            class="h-10 w-full bg-[#e6ebf5] py-3 pr-4 pl-3 rounded"
            placeholder="Type message"
            v-model="input"
            @keydown="typingEvent(room)"
          />
          <div class="flex relative items-center ml-[5px]">
            <div class="emoji">
              <button
                type="button"
                id="dropdownButton"
                class="p-1 text-lg text-[#7269ef] py-2 px-4"
                @click="handleToggleEmoji"
              >
                <i class="ri-emotion-happy-line"></i>
              </button>

              <EmojiPicker
                class="absolute right-0 bottom-[66px] z-[11]"
                v-show="emoji"
                :native="true"
                @select="onSelectEmoji"
              />
            </div>
            <div class="attach">
              <button type="button" class="text-lg text-[#7269ef] py-2 px-4">
                <i class="ri-attachment-line"></i>
              </button>
            </div>
            <button
              type="submit"
              class="text-lg text-white bg-[#7269ef] rounded-md py-2 px-4"
            >
              <i class="ri-send-plane-2-fill"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Slide Show -->
    <div class="w-full pt-20" v-show="!room">
      <!-- Slide show -->
      <SlideShow />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrollbar {
  overflow: hidden scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    height: 205px;
    border-radius: 7px;
    background-color: #d0dae3;
    cursor: pointer;
  }
}
.text-wrap {
  &__content {
    &::before {
      content: "";
      position: absolute;
      border: 5px solid transparent;
      border-left-color: #7269ef;
      border-top-color: #7269ef;
      left: 0;
      bottom: -9px;
    }
  }
}

.right {
  $bg-border: #f5f7fb;

  & .message {
    flex-direction: row-reverse;

    & > div:first-child {
      margin-right: 0 !important;
      margin-left: 16px;
    }

    .name {
      text-align: right;
    }
  }

  & .text-wrap {
    flex-direction: row-reverse;

    &__content {
      color: #343a40;
      background-color: $bg-border;
      border-radius: 8px 8px 0 8px;
      p {
        color: #7a7f9a;
        text-align: left !important;
      }

      &::before {
        border: 5px solid transparent;
        border-top-color: $bg-border;
        border-right-color: $bg-border;
        left: auto;
        right: 0;
      }
    }
  }
}
</style>
