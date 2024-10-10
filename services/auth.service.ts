import ApiService from "./api.service";

class AuthService {
  private api: ApiService;

  constructor() {
    this.api = new ApiService();
  }

  async login(email: string, password: string) {
    try {
      const response = await this.api.request("POST", "/auth/login", {
        email,
        password,
      });
      if (response.data.status == 403) throw new Error(response.data.message);
      localStorage.setItem("access_token", "bearer " + response.data.access_token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async signup(name: string, email: string, password: string) {
    try {
      const response = await this.api.request("POST", "/auth/signup", {
        name,
        email,
        password,
      });
      if (response.data.status == 403) throw new Error(response.data.message);
      localStorage.setItem("access_token", "bearer " + response.data?.access_token);
      return response;
    } catch (error:any) {
      throw error;
    }
  }
}

export default AuthService;
