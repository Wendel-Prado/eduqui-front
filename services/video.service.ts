import type { RouteParamsGeneric } from "vue-router";
import ApiService from "./api.service";

class VideoService {
  private api: ApiService;

  constructor() {
    this.api = new ApiService();
  }

  getAuthHeader() {
    const access_token = localStorage.getItem("access_token");
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    };
  }

  async getVideos(page: number) {
    const header = this.getAuthHeader();
    try {
      const response = await this.api.request(
        "GET",
        `videos/page/${page}`,
        {},
        header
      );
      if (response.data.status == 403) throw new Error(response.data.message);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchById(video_id: string | string[]) {
    const header = this.getAuthHeader();
    try {
      const response = await this.api.request(
        "GET",
        `videos/${video_id}`,
        {},
        header
      );
      if (response.data.status == 403) throw new Error(response.data.message);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async searchByTitle(searchQuery: string) {
    const header = this.getAuthHeader();
    try {
      const url = `videos/search/${searchQuery}`;
      const { data } = await this.api.request("GET", url,{},header);

      return data || [];
    } catch (err) {
      return err;
    }
  }
}

export default VideoService;
