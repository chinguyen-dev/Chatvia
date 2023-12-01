import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/components/Login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/components/Register/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN);
  if (to.name !== "Login" && !token && to.name !== "Register")
    next({ name: "Login" });
  next();
});

export default router;
