<script setup>
import { useEmoji } from "@/composables/emojiComposable";
import { useEvent } from "@/composables/eventsComposable";
import { useUserStore } from "@/stores/userStore";
import { defineAsyncComponent, onMounted, onUpdated } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
// import picker compopnent
const EmojiPicker = defineAsyncComponent(() => import("vue3-emoji-picker"));
// import css
import "vue3-emoji-picker/css";

const { handleToggleEmoji, emoji, input, onSelectEmoji, convertName } =
  useEmoji();
const { toggleEmoji } = useEvent();

const userStore = useUserStore();

const { onsubmit, chat, onscroll } = defineProps({
  onsubmit: {
    type: Function,
    default: null,
  },
  chat: {
    type: Object,
  },
  onscroll: {
    type: Function,
    default: null,
  },
});

const handleOnSubmit = (chat) => {
  if (!onsubmit || !chat) return;
  const payload = {
    conversation_id: chat.chat_id,
    receiver_id:
      chat.type == "people"
        ? chat.members.find((member) => member.id !== userStore.user.id).id
        : null,
    content: input.value,
  };
  onsubmit(payload);
  input.value = "";
};

const senderOrGroup = (chat) => {
  return chat?.type === "people"
    ? chat.members.find((member) => member.id !== userStore.user.id)
    : {
        name: "Group chat",
        avatar:
          "https://icon-library.com/images/group-icon-png/group-icon-png-15.jpg",
      };
};

onMounted(() => {
  onscroll && onscroll();
  toggleEmoji(emoji);
});

onUpdated(() => onscroll && onscroll());
</script>

<template>
  <div class="w-full bg-white shadow-3xl transition-all duration-[0.4s]">
    <div class="flex">
      <div class="w-full relative overflow-hidden">
        <div class="header p-6 border border-solid border-[#f0eff5]">
          <div class="grid grid-cols-2">
            <div class="flex items-center">
              <Avatar class="me-3" :user="senderOrGroup(chat)" :size="40" />
              <h5 class="flex-grow font-semibold text-base">
                {{
                  chat?.name ||
                  convertName(
                    chat?.members.find(
                      (member) => member.id !== userStore.user.id
                    ).name
                  )
                }}
              </h5>
            </div>
          </div>
        </div>
        <div class="chat-conversation relative h-[calc(100vh_-_178px)]">
          <div
            class="content absolute m-0 top-0 right-0 left-0 bottom-0 p-6 overflow-x-auto"
          >
            <div
              :class="
                message.sender?.id == userStore.user.id ? 'right' : 'flex'
              "
              v-for="message in chat?.messages"
              :key="message.id"
            >
              <div class="message flex items-end mb-6">
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
                    <Menu as="div" class="relative inline-block">
                      <MenuButton class="p-1 text-lg text-[#7a7f9a]">
                        <i class="ri-more-2-fill"></i>
                      </MenuButton>
                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <MenuItems
                          class="absolute left-0 z-10 mt-2 w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div class="py-1">
                            <MenuItem>
                              <a
                                href="#"
                                class="block px-4 py-2 text-sm hover:bg-gray-100"
                                ><i class="ri-reply-line mr-2"></i>
                                <span>Trả lời</span></a
                              >
                            </MenuItem>
                            <MenuItem>
                              <a
                                href="#"
                                class="block px-4 py-2 text-sm hover:bg-gray-100"
                                ><i class="ri-edit-2-line mr-2"></i
                                ><span>Chỉnh sửa</span></a
                              >
                            </MenuItem>
                            <MenuItem>
                              <a
                                href="#"
                                class="block border-t px-4 py-2 text-red-600 text-sm hover:bg-gray-100"
                                ><i class="ri-delete-bin-5-line mr-2"></i>
                                <span>Xóa</span>
                              </a>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                  <div class="name text-sm font-medium">
                    {{
                      message.sender?.id == userStore.user.id
                        ? convertName(userStore.user.name)
                        : convertName(message.sender?.name)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer p-5 border-t">
          <form
            @submit.prevent="handleOnSubmit(chat)"
            class="flex items-center"
          >
            <input
              type="text"
              class="h-10 w-full bg-[#e6ebf5] py-3 pr-4 pl-3 rounded"
              placeholder="Type message"
              v-model="input"
            />
            <div class="footer__right flex relative items-center ml-[5px]">
              <div class="emoji">
                <button
                  type="button"
                  id="dropdownButton"
                  class="p-1 text-lg text-[#7a7f9a] py-2 px-4"
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
                <button type="button" class="text-primary py-2 px-4">
                  <i class="ri-attachment-line"></i>
                </button>
              </div>
              <button type="submit" class="rounded-md py-2 px-4">
                <i class="ri-send-plane-2-fill"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-conversation {
  .content {
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

  display: flex;
  justify-content: end;

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

.footer {
  &__right {
    button {
      font-size: 17px;
      color: $color-purple;
      background-color: transparent;
    }

    & > button {
      color: #fff;

      background-color: $color-purple;
    }
  }
}
</style>
