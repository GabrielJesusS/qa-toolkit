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

type SignInResponse = {
  id: number;
} & TaigaTokenResponse;

type TaigaProjectResponse = {
  id: number;
  name: string;
};

type ProjectResponse = {
  id: string;
  name: string;
};

const MAX_RETRIES = 2;

const CACHE_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours

const CACHE = new Map<string, { timestamp: number; data: unknown }>();

class TaigaService {
  static readonly baseUrl = "https://api.taiga.io/api/v1";

  static #refresh: null | Promise<boolean> = null;

  static #retries = 0;

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

    const isGetRequest =
      !options?.method || options.method === HttpMethodsEnum.GET;

    try {
      if (isGetRequest) {
        const cached = CACHE.get(path);

        if (cached && Date.now() - cached.timestamp < CACHE_INTERVAL) {
          return cached.data as ReturnType<typeof client<T>>;
        }
      }

      const header =
        tokens === null ? {} : { Authorization: `Bearer ${tokens.token}` };

      const result = await client<T>(`${TaigaService.baseUrl}${path}`, {
        ...options,
        headers: { ...options?.headers, ...header },
      });

      if (isGetRequest) {
        CACHE.set(path, { timestamp: Date.now(), data: result });
      }

      return result;
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
      const response = await this.taigaClient<SignInResponse>("/auth", {
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
        id: response.data.id,
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
        id: tokens.id,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async createIssue(): Promise<void> {}

  async checkLogin(): Promise<boolean> {
    try {
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
      const tokens = await this.getAuth();

      if (!tokens) {
        throw new Error("Auth not found for listing projects");
      }

      const response = await this.taigaClient<TaigaProjectResponse[]>(
        `/projects?member=${tokens.id}`,
        {
          method: HttpMethodsEnum.GET,
        }
      );

      return response.data.map((project) => ({
        id: project.id.toString(),
        name: project.name,
      }));
    } catch (error) {
      if (!(error instanceof HTTPError)) {
        throw new Error(`Failed to connect to Taiga: ${error}`);
      }

      throw new Error(error.message);
    }
  }
}

export { TaigaService };
