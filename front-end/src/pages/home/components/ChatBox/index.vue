<script setup>
import { defineAsyncComponent } from "vue";

const Avatar = defineAsyncComponent(() => import("../Avatar/index.vue"));
</script>

<template>
  <div class="chat-box">
    <div class="header p-4 border-bottom">
      <div class="col-md-4">
        <div class="d-flex align-items-center">
          <Avatar
            class="me-3"
            :user="{ id: 5, name: 'Chí Nguyên', avatar: '', status: 'on' }"
          />
          <h5 class="flex-grow-1 mb-0 font-size-16">Chí Nguyên</h5>
        </div>
      </div>
      <div class="col-md-8"></div>
    </div>

    <div class="chat-conversation">
      <div class="content">
        <div class="message">
          <Avatar
            class="me-3"
            :user="{ id: 5, name: 'Chí Nguyên', avatar: '', status: 'on' }"
          />
          <div class="box flex-grow-1">
            <div class="text-wrap">
              <div class="text-wrap__content">
                <span>Hello!</span>
                <p><i class="ri-time-line"></i> 10:00</p>
              </div>
              <div class="dropdown">
                <button
                  class="btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="ri-more-2-fill"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Reply</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Edit</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="name">Chí Nguyên</div>
          </div>
        </div>
        <div class="right">
          <div class="message">
            <Avatar
              class="me-3"
              :user="{ id: 5, name: 'Chí Nguyên', avatar: '', status: 'on' }"
            />
            <div class="box flex-grow-1">
              <div class="text-wrap">
                <div class="text-wrap__content">
                  <span>Hello adsadad!</span>
                  <p><i class="ri-time-line"></i> 10:00</p>
                </div>
                <div class="dropdown">
                  <button
                    class="btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="ri-more-2-fill"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Reply</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="name">Chí Nguyên</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="message">
            <Avatar
              class="me-3"
              :user="{ id: 5, name: 'Chí Nguyên', avatar: '', status: 'on' }"
            />
            <div class="box flex-grow-1">
              <div class="text-wrap">
                <div class="text-wrap__content">
                  <span>Hello adsadad!</span>
                  <p><i class="ri-time-line"></i> 10:00</p>
                </div>
                <div class="dropdown">
                  <button
                    class="btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="ri-more-2-fill"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Reply</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="name">Chí Nguyên</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="message">
            <Avatar
              class="me-3"
              :user="{ id: 5, name: 'Chí Nguyên', avatar: '', status: 'on' }"
            />
            <div class="box flex-grow-1">
              <div class="text-wrap">
                <div class="text-wrap__content">
                  <span>Hello adsadad!</span>
                  <p><i class="ri-time-line"></i> 10:00</p>
                </div>
                <div class="dropdown">
                  <button
                    class="btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="ri-more-2-fill"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Reply</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Edit</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="name">Chí Nguyên</div>
            </div>
          </div>
        </div>
        <div class="message">
          <Avatar
            class="me-3"
            :user="{ id: 5, name: 'Chí Nguyên', avatar: '', status: 'on' }"
          />
          <div class="box flex-grow-1">
            <div class="text-wrap">
              <div class="text-wrap__content">
                <span>Hello!</span>
                <p><i class="ri-time-line"></i> 10:00</p>
              </div>
              <div class="dropdown">
                <button
                  class="btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="ri-more-2-fill"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Reply</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Edit</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="name">Chí Nguyên</div>
          </div>
        </div>
        <div class="message">
          <Avatar
            class="me-3"
            :user="{ id: 5, name: 'Chí Nguyên', avatar: '', status: 'on' }"
          />
          <div class="box flex-grow-1">
            <div class="text-wrap">
              <div class="text-wrap__content">
                <span>Hello!</span>
                <p><i class="ri-time-line"></i> 10:00</p>
              </div>
              <div class="dropdown">
                <button
                  class="btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="ri-more-2-fill"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Reply</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Edit</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="name">Chí Nguyên</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer border-top">a</div>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped />
