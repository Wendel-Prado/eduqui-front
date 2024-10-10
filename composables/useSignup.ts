import { ref, computed } from "vue";
import AuthService from "../services/auth.service";

export function useSignup() {
  const authService = new AuthService();
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const loading = ref(false);
  const errorMessage = ref("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordsMatch = computed(() => {
    return password.value === confirmPassword.value;
  });
  watch([password, confirmPassword], () => {
    if (!passwordsMatch.value)
      return (errorMessage.value = "As senhas não coincidem.");
    errorMessage.value = "";
  });
  const isPasswordValid = computed(() => {
    return password.value.length >= 6;
  });
  const signup = async () => {
    errorMessage.value = "";

    if (!name.value)
      return (errorMessage.value = "Por favor, insira seu nome.");

    if (!validateEmail(email.value))
      return (errorMessage.value = "Verifique seu email.");

    if (!password.value) return (errorMessage.value = "Verifique sua senha.");
    if(!isPasswordValid) return (errorMessage.value = "A senha deve ter pelo menos 6 caracteres.");
    loading.value = true;
    try {
      await authService.signup(name.value, email.value, password.value);
      return navigateTo("/");
    } catch (err: any) {
      errorMessage.value =
        err?.response?.data?.message ||
        "Falha ao criar a conta. Tente novamente mais tarde.";
    } finally {
      loading.value = false;
    }
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    loading,
    errorMessage,
    signup,
    passwordsMatch,
  };
}
