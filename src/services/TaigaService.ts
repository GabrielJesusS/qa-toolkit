import { client } from "@/core/HttpClient";
import { HttpMethodsEnum } from "@/core/HttpClient/HttpMethodsEnum";

type TaigaTokenResponse = {
  refresh: string;
  auth_token: string;
};

class TaigaService {
  static readonly tokenKey = "qtk_taiga_token";

  static readonly refreshTokenKey = "qtk_taiga_refresh_token";

  static readonly baseUrl = "https://api.taiga.io/api/v1";

  authToken: string | null = null;

  async signIn(email: string, password: string): Promise<TaigaTokenResponse> {
    try {
      const response = await client<TaigaTokenResponse>(
        `${TaigaService.baseUrl}/auth`,
        {
          method: HttpMethodsEnum.POST,
          body: JSON.stringify({
            type: "normal",
            username: email,
            password: password,
          }),
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to sign in to Taiga");
    }
  }

  async signOut(): Promise<void> {}

  async revalidateToken(): Promise<void> {}

  async createIssue(): Promise<void> {}

  async checkLogin() {
    try {
      const response = await client<TaigaTokenResponse>(
        `${TaigaService.baseUrl}/users/me`,
        {
          method: HttpMethodsEnum.GET,
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return false;
    }
  }
}

export { TaigaService };
