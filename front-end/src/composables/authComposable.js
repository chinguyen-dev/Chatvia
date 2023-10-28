import { useRouter } from "vue-router";
import userService from "@/services/userService";
import { useUserStore } from "@/stores/userStore";
import { toast } from "vue3-toastify";

export const useAuth = () => {
  const router = useRouter();
  const userStore = useUserStore();

  const handleLogout = async () => {
    try {
      await userService.logout();
      localStorage.clear();
      await router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleLogin = async (payload) => {
    try {
      const auth = await userService.login(payload);
      localStorage.setItem(import.meta.env.VITE_STORAGE_TOKEN, auth.data);
      const user = await userService.getUser();
      localStorage.setItem(
        import.meta.env.VITE_STORAGE_USER,
        JSON.stringify(user.data)
      );
      userStore.setState({
        user: user.data,
        token: auth.data,
      });
      await router.push("/");
    } catch (error) {
      toast.error("Failed to login");
    }
  };

  const handleRegister = async (payload) => {
    try {
      await userService.register(payload);
      await router.push("/login");
    } catch (error) {
      toast.error("Error registering");
    }
  };

  return { handleLogout, handleLogin, handleRegister };
};
