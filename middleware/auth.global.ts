import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const publicRoutes = ["/login", "/signup","/404"];
  const accessToken = localStorage.getItem("access_token");
  if (to.matched.length === 0) return navigateTo('/404');
  
  if (publicRoutes.includes(to.path) && !accessToken) return;

  if (!accessToken) return navigateTo("/login");

  if (publicRoutes.includes(to.path)) return navigateTo("/");
});
