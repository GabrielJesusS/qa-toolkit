import { client } from "@/core/HttpClient";
import { HTTPError } from "@/core/HttpClient/HttpError";
import { HttpMethodsEnum } from "@/core/HttpClient/HttpMethodsEnum";
import HttpStatusCode from "@/core/HttpClient/HttpStatusCodeEnum";

type TaigaTokenResponse = {
  refresh: string;
  auth_token: string;
};

let retries = 0;

const maxRetries = 2;

class TaigaService {
  static readonly tokenKey = "qtk_taiga_token";

  static readonly refreshTokenKey = "qtk_taiga_refresh_token";

  static readonly baseUrl = "https://api.taiga.io/api/v1";

  authToken: string | null = null;

  refreshToken: string | null = null;

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

  async revalidateToken(): Promise<boolean> {
    try {
      const response = await client<TaigaTokenResponse>(
        `${TaigaService.baseUrl}/auth/refresh`,
        {
          method: HttpMethodsEnum.POST,
          body: JSON.stringify({
            refresh: this.refreshToken,
          }),
        }
      );

      this.authToken = response.data.auth_token;
      this.refreshToken = response.data.refresh;

      retries = 0;

      return true;
    } catch (error) {
      return false;
    }
  }

  async createIssue(): Promise<void> {}

  async checkLogin(): Promise<boolean | TaigaTokenResponse> {
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
      if (!(error instanceof HTTPError)) {
        throw new Error("Failed to connect to Taiga");
      }

      if (error.statusCode === HttpStatusCode.UNAUTHORIZED) {
        return await this.#handleExpiredToken(
          error,
          async () => await this.checkLogin()
        );
      }

      return false;
    }
  }

  async #handleExpiredToken<T>(error: HTTPError, cb: () => T) {
    const couldRevalidate = await this.revalidateToken();

    if (couldRevalidate && retries < maxRetries) {
      retries++;
      const result = await cb();
      return result;
    }

    retries = 0;
    throw new Error("Failed to revalidate Taiga token");
  }
}

export { TaigaService };
