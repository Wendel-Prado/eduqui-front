<template>
    <header-component :search-term="searchTerm" @update-search="updateSearchTerm" />
    <div class="flex flex-col lg:flex-row h-full">
        <main class="main-content flex-1 p-4">
            <video-placeholder-component v-if="!video" class="w-full h-64 bg-black mb-4" />
            <iframe v-if="video" id="panda-player" :src="video?.video_player" class="w-full lg:h-[700px] mb-4"></iframe>
            <section class="bg-gray-100 p-4 rounded">
                <h2 class="text-xl font-semibold mb-4">{{ video?.title }}</h2>
                <div class="view-count text-sm font-semibold mb-2">
                    {{ video?.views }} <span> visualizações</span>
                </div>
                <div class="text-sm text-gray-700 mb-2">
                    <p>Publicado em: <span class="font-semibold">{{ moment(video?.created_at).format('DD/MM/YYYY')
                            }}</span></p>
                </div>
                <div class="text-sm text-gray-700 mb-2">
                    <p>Descrição: <span class="font-semibold">{{ video?.description }}</span></p>
                </div>
            </section>
        </main>
        <aside class="video-list h-full lg:w-64 bg-gray-100 p-4 mt-4 lg:mt-0 lg:ml-4">
            <h2 class="text-xl font-semibold mb-4">Vídeos sugeridos</h2>
            <ul class="grid gap-2">
                <NuxtLink v-for="video in filteredVideos" :key="video.id" :to="`/video/${video.id}`">
                    <li class="video-item p-2 bg-white rounded shadow">
                        <video-placeholder-component v-if="!video.thumbnail" class="w-full h-48 mb-2" />
                        <img v-if="video.thumbnail" :src="video.thumbnail" alt="Thumbnail"
                            class="w-full h-48 object-cover mb-2" />
                        <p class="text-sm font-semibold">{{ video.title }}</p>
                        <p class="text-xs text-gray-500">{{ video.views || 0 }} visualizações • {{
                            moment(video.created_at).format('DD/MM/YYYY') }}</p>
                    </li>
                </NuxtLink>
            </ul>
        </aside>
    </div>
    <footer-component></footer-component>
</template>



<script setup lang="ts">
import { onMounted } from 'vue';
import { useVideoList } from '../../composables/useVideoList';
import moment from 'moment';

const {
    searchTerm,
    updateSearchTerm,
    listVideos,
    getVideo,
    videos,
    video,
} = useVideoList();
const filteredVideos = computed(() => {
    return videos.value
        ?.filter((row) => row.id !== video.value?.id)
        .splice(0, 3);
});
onMounted(async () => {
    await getVideo();
    await listVideos();
});

</script>
<style>
@import '../../assets/css/styles.css';
@media screen  and (max-width: 992px){
    #panda-player{
         height: 300px;
    }
}
</style>
