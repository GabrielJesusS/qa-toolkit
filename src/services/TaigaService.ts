import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { client } from "@/core/HttpClient";
import { HttpMethodsEnum } from "@/core/HttpClient/HttpMethodsEnum";
import HttpStatusCode from "@/core/HttpClient/HttpStatusCodeEnum";
import { StorageController } from "@/core/StorageController";
import { IssueData } from "@/core/types/IssueData";
import { IssueProviderService } from "@/infra/IssueProviderService";
import { ProjectsSchema } from "@/schemas/project";
import { TaigaAuthSchema } from "@/schemas/taiga-auth";
import { base64ToFile } from "@/utils/file";
import { generateMarkdownFromIssue } from "@/utils/md";
import { TaigaServiceError } from "./TaigaServiceError";
import { handleRequestError } from "@/utils/error";

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

type TaigaClientOptions = {
  noRetry?: boolean;
  auth?: boolean;
} & Parameters<typeof client>[1];

type TaigaProjectExtraInfo = {
  id: number;
  name: string;
  slug: string;
};

type IssueResponse = {
  id: number;
  project_extra_info: TaigaProjectExtraInfo;
  ref: number;
};

type AttachmentResponse = {
  url: string;
};

type IssueReturn = {
  url: string;
};

const MAX_RETRIES = 1;

class TaigaService implements IssueProviderService {
  static readonly baseUrl = "https://api.taiga.io/api/v1";

  readonly #appUrl = "https://tree.taiga.io";

  static #refresh: null | Promise<boolean> = null;

  static #retries = 0;

  async getAuth() {
    try {
      return await StorageController.get(
        StorageKeyEnum.TAIGA_AUTH,
        TaigaAuthSchema
      );
    } catch (error) {
      return null;
    }
  }

  async setTokens(tokens: TaigaAuthSchema) {
    await StorageController.set(StorageKeyEnum.TAIGA_AUTH, tokens);
  }

  async removeTokens() {
    await StorageController.remove(StorageKeyEnum.TAIGA_AUTH);
  }

  async getAuthHeader() {
    const tokens = await this.getAuth();

    if (tokens) {
      return { Authorization: `Bearer ${tokens.token}` };
    }

    return {};
  }

  // Generic Taiga API client with automatic token revalidation
  async taigaClient<T>(
    path: `/${string}`,
    options?: TaigaClientOptions
  ): Promise<ReturnType<typeof client<T>>> {
    try {
      const { auth = true, noRetry = false, ...rest } = options || {};

      const header = auth ? await this.getAuthHeader() : {};

      const result = await client<T>(`${TaigaService.baseUrl}${path}`, {
        ...rest,
        headers: { ...header, ...rest?.headers },
      });

      return result;
    } catch (error) {
      const parsedError = handleRequestError(error, "Taiga request failed");

      const tokens = await this.getAuth();

      if (parsedError.statusCode === HttpStatusCode.UNAUTHORIZED && tokens) {
        if (options?.noRetry) {
          throw new TaigaServiceError("Unauthorized", "SIGN_IN", error);
        }

        if (TaigaService.#retries >= MAX_RETRIES) {
          // await this.removeTokens();
          TaigaService.#retries = 0;
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

      throw parsedError;
    } finally {
      TaigaService.#refresh = null;
    }
  }

  #getIssueURL(issue: IssueResponse): string {
    const slug = issue.project_extra_info.slug;

    return `${this.#appUrl}/project/${slug}/issue/${issue.ref}`;
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.taigaClient<SignInResponse>("/auth", {
        auth: false,
        noRetry: true,
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
      const parsedError = handleRequestError(error, "Taiga sign-in failed");
      throw new TaigaServiceError(parsedError.message, "SIGN_IN", error);
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
          auth: false,
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

      TaigaService.#retries = 0;
      return true;
    } catch (error) {
      return false;
    }
  }

  async initIssue(issueData: IssueData): Promise<IssueResponse> {
    try {
      const response = await this.taigaClient<IssueResponse>("/issues", {
        method: HttpMethodsEnum.POST,
        body: JSON.stringify({
          subject: issueData.subject,
          project: issueData.project,
        }),
      });

      return response.data;
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga issue initialization failed"
      );
      throw new TaigaServiceError(parsedError.message, "INIT_ISSUE", error);
    }
  }

  async createScreenshotAttachment(
    issueId: IssueResponse["id"],
    issueData: IssueData
  ): Promise<AttachmentResponse> {
    try {
      const attachmentContent = new FormData();

      attachmentContent.append("object_id", issueId.toString());
      attachmentContent.append("project", issueData.project);
      attachmentContent.append(
        "attached_file",
        base64ToFile(issueData.print, "screenshot.png")
      );

      const attachment = await this.taigaClient<AttachmentResponse>(
        "/issues/attachments",
        {
          method: HttpMethodsEnum.POST,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: attachmentContent,
        }
      );

      return attachment.data;
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga issue attachment failed"
      );
      throw new TaigaServiceError(
        parsedError.message,
        "CREATE_ATTACHMENT",
        error
      );
    }
  }

  async insertIssueDescription(
    issueId: IssueResponse["id"],
    issueData: IssueData,
    attachment: AttachmentResponse
  ) {
    try {
      const description = await generateMarkdownFromIssue({
        ...issueData,
        print: attachment.url,
      });

      await this.taigaClient<IssueResponse>(`/issues/${issueId}`, {
        method: HttpMethodsEnum.PATCH,
        body: JSON.stringify({
          description: description,
          version: 1,
        }),
      });
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga issue description failed"
      );
      throw new TaigaServiceError(
        parsedError.message,
        "INSERT_DESCRIPTION",
        error
      );
    }
  }

  async createIssue(issueData: IssueData): Promise<IssueReturn> {
    try {
      const response = await this.initIssue(issueData);

      const attachment = await this.createScreenshotAttachment(
        response.id,
        issueData
      );

      await this.insertIssueDescription(response.id, issueData, attachment);

      return {
        url: this.#getIssueURL(response),
      };
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga issue creation failed"
      );
      throw new TaigaServiceError(parsedError.message, "CREATE_ISSUE", error);
    }
  }

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

  async listProjects(): Promise<ProjectsSchema> {
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
      const parsedError = handleRequestError(
        error,
        "Taiga project listing failed"
      );
      throw new TaigaServiceError(parsedError.message, "LIST_PROJECTS", error);
    }
  }
}

export { TaigaService };
