import { ref } from "vue";
import AuthService from "../services/auth.service";

export function useLogin() {
  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  const errorMessage = ref("");
  const authService = new AuthService
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async () => {
    errorMessage.value = "";
    if (!validateEmail(email.value)) return (errorMessage.value = "Verifique seu email");
    if (!password.value) return (errorMessage.value = "Verifique sua senha");

    loading.value = true;
    try {
      const response = await authService.login(email.value, password.value);
      return navigateTo("/");
    } catch (err) {
      errorMessage.value = "Falha no login. Verifique suas credenciais.";
    } finally {
      loading.value = false;
    }
  };

  return {
    email,
    password,
    loading,
    errorMessage,
    login,
  };
}
