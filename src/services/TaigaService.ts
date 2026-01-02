import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { client } from "@/core/HttpClient";
import { HTTPError } from "@/core/HttpClient/HttpError";
import { HttpMethodsEnum } from "@/core/HttpClient/HttpMethodsEnum";
import HttpStatusCode from "@/core/HttpClient/HttpStatusCodeEnum";
import { StorageController } from "@/core/StorageController";
import { TaigaAuthSchema } from "@/schemas/taiga-auth";

type TaigaTokenResponse = {
  refresh: string;
  auth_token: string;
};

type ProjectResponse = {
  id: number;
  name: string;
};

const MAX_RETRIES = 2;

const CHECK_LOGIN_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours

class TaigaService {
  static readonly baseUrl = "https://api.taiga.io/api/v1";

  static #refresh: null | Promise<boolean> = null;

  static #retries = 0;

  static #lastCheck = 0;

  async getAuth() {
    try {
      return await StorageController.get(
        StorageKeyEnum.TAIGA_AUTH,
        TaigaAuthSchema
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async setTokens(tokens: TaigaAuthSchema) {
    await StorageController.set(StorageKeyEnum.TAIGA_AUTH, tokens);
  }

  async removeTokens() {
    await StorageController.remove(StorageKeyEnum.TAIGA_AUTH);
  }

  async taigaClient<T>(
    path: `/${string}`,
    options?: Parameters<typeof client>[1]
  ): Promise<ReturnType<typeof client<T>>> {
    const tokens = await this.getAuth();

    try {
      const header =
        tokens === null ? {} : { Authorization: `Bearer ${tokens.token}` };

      return await client<T>(`${TaigaService.baseUrl}${path}`, {
        ...options,
        headers: { ...options?.headers, ...header },
      });
    } catch (error) {
      if (!(error instanceof HTTPError)) {
        throw new Error(`Failed to connect to Taiga: ${error}`);
      }

      if (error.statusCode === HttpStatusCode.UNAUTHORIZED && tokens) {
        if (TaigaService.#retries >= MAX_RETRIES) {
          await this.removeTokens();
          throw new Error("Max retries reached for Taiga authentication");
        }

        if (TaigaService.#refresh) {
          await TaigaService.#refresh;
          return await this.taigaClient<T>(path, options);
        }

        TaigaService.#refresh = this.revalidateToken();
        TaigaService.#retries++;

        await TaigaService.#refresh;
        return await this.taigaClient<T>(path, options);
      }

      throw new Error("Failed to connect to Taiga");
    } finally {
      TaigaService.#retries = 0;
      TaigaService.#refresh = null;
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.taigaClient<TaigaTokenResponse>("/auth", {
        method: HttpMethodsEnum.POST,
        body: JSON.stringify({
          type: "normal",
          username: email,
          password: password,
        }),
      });

      this.setTokens({
        refresh: response.data.refresh,
        token: response.data.auth_token,
      });

      return true;
    } catch (error) {
      throw new Error("Failed to sign in to Taiga");
    }
  }

  async signOut(): Promise<void> {}

  async revalidateToken(): Promise<boolean> {
    try {
      const tokens = await this.getAuth();

      if (!tokens) {
        throw new Error("No tokens found for revalidation");
      }

      const response = await this.taigaClient<TaigaTokenResponse>(
        "/auth/refresh",
        {
          method: HttpMethodsEnum.POST,
          body: JSON.stringify({
            refresh: tokens.refresh,
          }),
        }
      );

      this.setTokens({
        refresh: response.data.refresh,
        token: response.data.auth_token,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async createIssue(): Promise<void> {}

  async checkLogin(): Promise<boolean> {
    try {
      const now = Date.now();

      if (now - TaigaService.#lastCheck < CHECK_LOGIN_INTERVAL) {
        return true;
      }

      TaigaService.#lastCheck = now;

      await this.taigaClient("/users/me", {
        method: HttpMethodsEnum.GET,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async listProjects(): Promise<ProjectResponse[]> {
    try {
      const response = await client<ProjectResponse[]>(
        `${TaigaService.baseUrl}/projects`,
        {
          method: HttpMethodsEnum.GET,
        }
      );

      return response.data;
    } catch (error) {
      if (!(error instanceof HTTPError)) {
        throw new Error(`Failed to connect to Taiga: ${error}`);
      }

      throw new Error(error.message);
    }
  }
}

export { TaigaService };
