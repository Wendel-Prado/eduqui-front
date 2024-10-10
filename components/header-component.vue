<template>
    <nav class="navbar bg-gray-900 shadow-lg">
        <div class="navbar-container flex items-center justify-between px-4 py-2">
            <a href="/" class="navbar-logo">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                        clip-rule="evenodd" />
                </svg>

                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Eduqui</span>
            </a>
            <div class="flex items-center w-1/2">
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="search-navbar" class="input-field input-dark pl-10 pr-3"
                        placeholder="Pesquisar..." v-model="localSearchTerm" @keyup.enter="emitSearch" />
                </div>
            </div>

            <button @click="logout">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                </svg>
            </button>

        </div>
    </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    searchTerm: String
});

const emit = defineEmits(['update-search', 'field-empty']);

const localSearchTerm = ref(props.searchTerm);
watch(localSearchTerm, (newValue) => {
    if (newValue === '') { emit('field-empty', newValue) };
})
function emitSearch() {
    if (localSearchTerm.value) emit('update-search', localSearchTerm.value);
}

function logout() {
    localStorage.removeItem("access_token")
    navigateTo("/login");
}
</script>
<style scoped>
@import '../assets/css/tailwind.css';

.input-field {
    @apply bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 rounded-full;
    @apply pl-10 pr-3;
}

.dropdown {
    @apply z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-700;
}

.navbar-link {
    @apply block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700;
}

.navbar {
    @apply bg-gray-900 border-b border-gray-800;
}
</style>
