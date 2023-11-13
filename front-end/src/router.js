import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("./pages/home/index.vue"),
    alias: ["/chat", "/home"],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./pages/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
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
  // linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(import.meta.env.VITE_STORAGE_TOKEN);
  if (to.name !== "Login" && !token && to.name !== "Register")
    next({ name: "Login" });
  next();
});

export default router;
