<script setup>
import { useChat } from "@/composables/chatComposable";
import { useEvent } from "@/composables/eventsComposable";
import { defineAsyncComponent, onMounted, ref } from "vue";

const Modal = defineAsyncComponent(() =>
  import("@/components/Modal/index.vue")
);
const Avatar = defineAsyncComponent(() =>
  import("../../components/Avatar/index.vue")
);

const SearchBox = defineAsyncComponent(() =>
  import("../../components/SearchBox/index.vue")
);
const UserCarousel = defineAsyncComponent(() =>
  import("../../components/UserCarousel/index.vue")
);

const Room = defineAsyncComponent(() =>
  import("../../components/Room/index.vue")
);

const {
  rooms,
  fetchRoom,
  search,
  users,
  handleOnSearch,
  handleOnChat,
  handleFindByEmailUsers,
  handleCreateRoom,
} = useChat();

const { modal, positionY, getVerticalPosition } = useEvent();

const userCarousel = ref([
  {
    name: "Võ Chí Nguyên",
    avatar: "",
  },
  {
    name: "Cao Thị Trúc Linh",
    avatar: "",
  },
  {
    name: "Võ Chí Nguyên",
    avatar: "",
  },
  {
    name: "Cao Thị Trúc Linh",
    avatar: "",
  },
  {
    name: "Võ Chí Nguyên",
    avatar: "",
  },
  {
    name: "Cao Thị Trúc Linh",
    avatar: "",
  },
  {
    name: "Võ Chí Nguyên",
    avatar: "",
  },
  {
    name: "Cao Thị Trúc Linh",
    avatar: "",
  },
]);

onMounted(async () => {
  await fetchRoom();
  getVerticalPosition("chat-list");
});
</script>

<template>
  <div class="flex flex-col">
    <div class="px-6 pt-6">
      <h2 class="mb-6 font-semibold text-xl text-gray49">Chats</h2>
      <SearchBox
        type="text"
        :on-submit="handleOnSearch"
        placeholder="Tìm kiếm"
        @toggle-modal="() => (modal = !modal)"
      />
    </div>

    <div class="px-6 pb-6">
      <UserCarousel :users="userCarousel" />
    </div>

    <div class="px-2">
      <h5 class="px-4 mb-3 text-[16px] font-semibold">Recent</h5>
      <div class="relative group h-[calc(100vh_-_280px)]">
        <div id="chat-list" class="absolute p-0 m-0 top-0 bottom-0 w-full">
          <Room
            v-for="room in rooms"
            :key="room.room_id"
            :room="room"
            :class="room.active && 'active'"
            @click="handleOnChat(room)"
          />
        </div>
        <!-- Scroll -->
        <div
          v-if="rooms && rooms.length >= 6"
          class="absolute opacity-0 group-hover:opacity-100 top-0 right-0 bottom-0 w-[11px] transition-opacity duration-[0.4s] ease-linear"
        >
          <div
            class="scrollbar w-[7px] h-[205px] rounded-[7px] cursor-pointer bg-[#d0dae3]"
            :style="{
              transform: `translate3d(0px, ${positionY}px, 0px)`,
            }"
          ></div>
        </div>
      </div>
    </div>

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
                  <Avatar :hidden="false" :user="user" :size="40" />
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
    display: none;
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
