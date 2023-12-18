<script setup>
import { useChat, useContact, useEvent } from "@/composables";
import { defineAsyncComponent } from "vue";

const ContactCarousel = defineAsyncComponent(() =>
  import("./components/ContactCarousel.vue")
);
const SearchChat = defineAsyncComponent(() =>
  import("./components/SearchChat.vue")
);
const RoomChat = defineAsyncComponent(() =>
  import("./components/RoomChat.vue")
);
const Avatar = defineAsyncComponent(() => import("@/components/Avatar.vue"));
const Modal = defineAsyncComponent(() => import("@/components/Modal.vue"));

const {
  rooms,
  search,
  users,
  handleOnSearch,
  handleFindByEmailUsers,
  handleCreateRoom,
} = useChat();

const { contacts, handleCreateContact, fetchContact } = useContact();
const { modal } = useEvent();

await fetchContact();
</script>

<template>
  <div class="flex flex-col">
    <div class="p-6">
      <!-- Search Chat -->
      <SearchChat
        type="text"
        :on-submit="handleOnSearch"
        placeholder="Tìm kiếm"
        @toggle-modal="() => (modal = !modal)"
      />
      <!-- UserCarousel -->
      <ContactCarousel :contacts="contacts" :on-submit="handleCreateRoom" />
    </div>
    <!-- Rooms Chat -->
    <div class="px-2">
      <h5 class="px-4 mb-3 text-[16px] font-semibold">Recent</h5>
      <div class="relative group h-[calc(100vh_-_280px)]">
        <div id="chat-list" class="absolute p-0 m-0 top-0 bottom-0 w-full">
          <RoomChat />
        </div>
      </div>
    </div>
    <!-- Modal -->
    <Transition>
      <Modal
        title="Thêm bạn"
        v-show="modal"
        @toggle-modal="
          (value) => {
            modal = value;
            search.email = '';
          }
        "
      >
        <template #body>
          <div class="mb-2 h-10 px-4 py-[7px]">
            <form @submit.prevent="handleFindByEmailUsers">
              <input
                type="text"
                v-model="search.email"
                @keyup="handleFindByEmailUsers"
                class="w-full py-[1px] px-[2px] border-[#d6dbe1] border-b border-solid pb-3 text-[#081c36] text-sm tracking-[.2px]"
                placeholder="Địa chỉ Email"
                title="Vui lòng điền địa chỉ Email"
              />
            </form>
          </div>
          <div class="modal__scroll w-full h-[300px] py-[7px] overflow-x-auto">
            <div class="flex items-center h-[30px] text-[#7589a3] text-sm px-4">
              <i class="ri-history-line mr-[5px]"></i>
              Kết quả gần nhất
            </div>
            <div
              class="hover:bg-[#f3f5f6] group w-full px-4 relative"
              v-for="user in users"
              :key="user.id"
            >
              <div
                class="flex items-center justify-between h-[58px] py-[7px] cursor-pointer"
              >
                <div class="flex items-center">
                  <!-- Avatar -->
                  <Avatar :user="user" :size="40" />
                  <!-- End -->
                  <div class="text-sm ml-3">
                    <div class="font-medium text-[#081c36]">
                      {{ user.name }}
                    </div>
                    <div>Từ địa chỉ Email</div>
                  </div>
                </div>
                <!-- Button -->
                <div class="text-xl mr-5">
                  <button
                    type="button"
                    @click="
                      () => {
                        modal = false;
                        handleCreateRoom(user);
                      }
                    "
                    class="h-6 hover:text-[#7269ef] rounded-[4px] m-2 font-medium"
                    title="Trò chuyện"
                  >
                    <i class="ri-message-3-line"></i>
                  </button>
                  <button
                    @click="
                      () => {
                        modal = false;
                        handleCreateContact(user);
                      }
                    "
                    type="button"
                    class="h-6 hover:text-[#7269ef] rounded-[4px] m-2 font-medium"
                    title="Kết bạn"
                  >
                    <i class="ri-user-add-line"></i>
                  </button>
                </div>
                <!-- End -->
              </div>
              <i
                title="Xóa gợi ý kết bạn"
                class="ri-close-line group-hover:block absolute hidden right-0 top-[-8px] text-[#7589a3] p-[8px] cursor-pointer"
              ></i>
            </div>
          </div>
        </template>
      </Modal>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
#chat-list {
  overflow: hidden scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #b1b5b9;
  }
}

.modal__scroll {
  &::-webkit-scrollbar {
    width: 7px;
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #b1b5b9;
  }
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
