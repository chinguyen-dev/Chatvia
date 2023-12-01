import { useRouter } from "vue-router";
import { useUserStore, useChatStore } from "@/stores";

const useAuth = () => {
  const router = useRouter();
  const userStore = useUserStore();
  const chatStore = useChatStore();

  const handleLogout = async () => {
    await userStore.logout();
    localStorage.clear();
    userStore.$reset();
    chatStore.$reset();
    await router.push("/login");
  };

  const handleLogin = async (payload) => {
    await userStore.login(payload);
    await router.push("/");
  };

  const handleRegister = async (payload) => {
    await userStore.register(payload);
    await router.push("/login");
  };

  return { handleLogout, handleLogin, handleRegister };
};

export default useAuth;
