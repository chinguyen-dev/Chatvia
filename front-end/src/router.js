import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN);
      if (token) next();
      next({ name: "user-auth" });
    },
    component: () => import("./pages/home/index.vue"),
    alias: ["/chat", "/home"],
    children: [
      {
        path: "",
        component: () => import("./pages/home/pages/chat/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "user-auth",
    component: () => import("./pages/login/index.vue"),
  },
  {
    path: "/register",
    component: () => import("./pages/register/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./components/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active",
});

export default router;
