<template>
  <div id="root" class="place-content-center fixed w-full">
    <section>
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div class="card">
          <h2 class="section-title">Crie sua conta</h2>
          <form class="mt-8 space-y-6" @submit.prevent="signup">
            <div>
              <label for="name" class="label">Nome</label>
              <input type="text" name="name" id="name" v-model="name" class="input-field input-dark" placeholder="Nome"
                required />
            </div>
            <div>
              <label for="email" class="label">Email</label>
              <input type="email" name="email" id="email" v-model="email" class="input-field input-dark"
                placeholder="name@company.com" required />
            </div>
            <div>
              <label for="password" class="label">Senha</label>
              <input type="password" name="password" id="password" v-model="password" placeholder="••••••••"
                class="input-field input-dark" required />
            </div>
            <div>
              <label for="confirm-password" class="label">Confirmar Senha</label>
              <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword"
                placeholder="••••••••" class="input-field input-dark" required />
            </div>
            <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>

            <div class="flex items-center h-5 justify-between">
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                Já possui uma conta ? <NuxtLink :to="'/login'"
                  class="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Acessa já</NuxtLink>
              </div>
              <button type="submit" :disabled="loading || passwordsMatch" class="button">
                <span v-if="loading">Carregando...</span>
                <span v-else>Criar Conta</span>
              </button>
            </div>
          </form>
        </div>

        <div class="flex flex-col justify-center">
          <h1 class="heading">Transformando vidas através do conhecimento!</h1>
          <p class="section-subtitle">Na Eduqui, sabemos que cada aprendizado é uma nova oportunidade de mudar o futuro.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSignup } from "../composables/useSignup";

const { name, email, password, confirmPassword, loading, errorMessage, signup } = useSignup();

</script>

<style scoped>
@import '../assets/css/tailwind.css';
</style>
