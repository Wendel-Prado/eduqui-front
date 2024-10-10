import { ref, type Ref } from "vue";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { BASE_URL_LOCAL, BASE_URL_PROD } from "../constants";

export default class ApiService {
  private axiosInstance: AxiosInstance;
  public loading: Ref<boolean>;
  public error: Ref<string | null>;
  config = useRuntimeConfig()
  
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.config.public.prod? BASE_URL_PROD : BASE_URL_LOCAL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.loading = ref(false);
    this.error = ref(null);
  }

  async request<A>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    this.loading.value = true;
    this.error.value = null;

    try {
      console.log(this.config)
      const response = await this.axiosInstance.request<A>({
        method,
        url,
        data,
        ...config,
      });
      
      return response;
    } catch (err) {
      this.error.value = err instanceof Error ? err.message : "Unknown error";
      if(this.error.value)navigateTo("/login");
      throw err;
    } finally {
      this.loading.value = false;
    }
  }
}
