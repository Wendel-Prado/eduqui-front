<template>
    <header-component :search-term="searchTerm" @update-search="updateSearchTerm" @field-empty="fieldEmpty" />

    <div class="videos-section p-4 h-full grid justify-items-center">


        <div v-if="videos.length">
            <h2 class="text-2xl font-semibold mb-4">Vídeos adicionados</h2>
            <p class="text-sm text-gray-600 mb-4">Confira os vídeos mais recentes.</p>
            <div 
                class="grid h-[550px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
                <NuxtLink v-for="video in videos" :key="video.id" :to="`/video/${video.id}`"
                    class="video-item bg-white rounded shadow p-2 hover:shadow-lg cursor-pointer transition-shadow duration-200">
                    <video-placeholder-component v-if="!video.thumbnail" class="w-full h-48 mb-2" />
                    <img v-if="video.thumbnail" :src="video.thumbnail" alt="Thumbnail"
                        class="w-full h-48 object-cover mb-2" />
                    <p class="text-sm font-semibold">{{ video.title }}</p>
                    <p class="text-xs text-gray-500">{{ video.views || 0 }} visualizações • {{
                        moment(video?.created_at).format('DD/MM/YYYY')
                        }}
                    </p>
                </NuxtLink>
            </div>
        </div>
        <div v-if="videos.length" class="inline-flex mt-2 xs:mt-0">
          <button 
            :class="currentPage === 1 ? 'navigation-disable navigation-button-back' : 'navigation-button-back'" 
            :disabled="currentPage === 1" 
            @click="backPage"
          >
            Voltar
          </button>
          
          <button 
            :class="currentPage === totalPages ? 'navigation-disable navigation-button-next' : 'navigation-button-next'" 
            :disabled="currentPage === totalPages" 
            @click="nextPage"
          >
            Próximo
          </button>
        </div>
        <div v-else>
            <p class="text-gray-500">Nenhum vídeo encontrado.</p>
        </div>
    </div>

    <footer-component></footer-component>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useVideoList } from '../composables/useVideoList';
import { useRoute } from 'vue-router';
const route = useRoute()
import moment from 'moment';
const {
    searchTerm,
    currentPage,
    totalPages,
    videos,
    updateSearchTerm,
    listVideos,
    searchVideos,
    nextPage,
    backPage,
    fieldEmpty
} = useVideoList();

onMounted(async () => {
    const searchQuery = route.query.search as string;
    if (searchQuery) await searchVideos(searchQuery);
    else await listVideos();
});

</script>

<style scoped>
@import '../assets/css/styles.css';
@import '../assets/css/tailwind.css';
.navigation-disable{
    background: #8b9eb9
}
.navigation-disable:hover{
    background: #8b9eb9
}
</style>
