<template>
    <div id="root" class="place-content-center fixed w-full">
        <section>
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div class="flex flex-col justify-center">
                    <h1 class="heading">Nós acreditamos na educação!</h1>
                    <p class="section-subtitle">
                        Na Eduqui, reconhecemos o imenso potencial da educação e sua capacidade de transformar vidas.
                    </p>
                </div>

                <div>
                    <div class="card">
                        <h2 class="section-title">Acesse a Duqui</h2>
                        <form @submit.prevent="login" class="mt-8 space-y-6">
                            <div>
                                <label for="email" class="label">Email</label>
                                <input type="email" id="email" v-model="email" class="input-field input-dark"
                                    placeholder="name@company.com" />
                            </div>
                            <div>
                                <label for="password" class="label">Senha</label>
                                <input type="password" id="password" v-model="password" class="input-field input-dark"
                                    placeholder="••••••••" />
                            </div>
                            <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
                            <div class="flex items-center h-5 justify-between">
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    Não registrado ainda? <NuxtLink :to="'/signup'"
                                        class="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Crie sua
                                        conta</NuxtLink>
                                </div>
                                <button type="submit" :disabled="loading" class="button">
                                    <span v-if="loading">Carregando...</span>
                                    
                                    <span v-else>Acessar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useLogin } from '../composables/useLogin';

const { email, password, errorMessage, login, loading } = useLogin();

</script>

<style scoped>
@import '../assets/css/tailwind.css';
</style>
