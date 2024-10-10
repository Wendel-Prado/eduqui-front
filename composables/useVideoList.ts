import { ref, computed } from "vue";
import type { Video } from "~/interfaces/video";
import VideoService from "~/services/video.service";
import { useRouter } from "vue-router";

export function useVideoList() {
  const searchTerm = ref("");
  const videos = ref<Video[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const videoService = new VideoService();
  const video = ref<Video>();
  const router = useRouter();
  const loading = ref(false);
  async function listVideos() {
    try {
      const response = await videoService.getVideos(currentPage.value);
      setProp(response.data.videos, response.data.pages);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  }

  async function getVideo() {
    try {
      const route = useRoute();
      const { id } = route.params;
     loading.value = true;
      const response = await videoService.searchById(id);
      video.value = response.data;
    } catch (error) {
      console.error("Error ao listar videos", error);
    } finally{
      loading.value = false;
    }
  }
  function updateSearchTerm(search: string) {
    searchVideos(search);
  }
  function fieldEmpty(){
    listVideos();
  }
  async function searchVideos(searchQuery: string) {
    try {
      const response = await videoService.searchByTitle(searchQuery);

      setProp(response.videos, response.pages);

      router.push({ path: "/", query: { search: searchQuery } });
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  }

  function setProp(videosFound: any, pages: any) {
    videos.value = videosFound;
    totalPages.value = pages;
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      listVideos();
    }
  }

  function backPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
      listVideos();
    }
  }

  return {
    searchTerm,
    videos,
    currentPage,
    totalPages,
    video,
    updateSearchTerm,
    listVideos,
    searchVideos,
    nextPage,
    backPage,
    getVideo,
    loading,
    fieldEmpty
  };
}
