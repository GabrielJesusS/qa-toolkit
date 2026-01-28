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
import { AuthStatus } from "@/core/types/AuthStatus";

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
  retry?: boolean;
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

  static #refresh: null | Promise<void> = null;

  static #retries = 0;

  async getAuth() {
    try {
      return await StorageController.get(
        StorageKeyEnum.TAIGA_AUTH,
        TaigaAuthSchema,
      );
    } catch (error) {
      return null;
    }
  }

  async setTokens(tokens: TaigaAuthSchema) {
    await StorageController.set(StorageKeyEnum.TAIGA_AUTH, tokens);
  }

  async getAuthHeader() {
    const tokens = await this.getAuth();

    if (!tokens) return {};

    if (tokens.expired) {
      throw new TaigaServiceError("Token expired", "REVALIDATE_TOKEN");
    }

    return { Authorization: `Bearer ${tokens.token}` };
  }

  // Generic Taiga API client with automatic token revalidation
  async taigaClient<T>(
    path: `/${string}`,
    options?: TaigaClientOptions,
  ): Promise<ReturnType<typeof client<T>>> {
    const { auth = true, retry = true, ...rest } = options || {};

    const header = auth ? await this.getAuthHeader() : {};

    try {
      const result = await client<T>(`${TaigaService.baseUrl}${path}`, {
        ...rest,
        headers: { ...header, ...rest?.headers },
      });

      return result;
    } catch (error) {
      const parsedError = handleRequestError(error, "Taiga request failed");

      const tokens = await this.getAuth();

      if (parsedError.statusCode === HttpStatusCode.UNAUTHORIZED && tokens) {
        if (!retry) {
          throw new TaigaServiceError("Unauthorized", "SIGN_IN", error);
        }

        if (TaigaService.#retries >= MAX_RETRIES) {
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
        retry: false,
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
        expired: false,
      });

      return true;
    } catch (error) {
      const parsedError = handleRequestError(error, "Taiga sign-in failed");
      throw new TaigaServiceError(parsedError.message, "SIGN_IN", error);
    }
  }

  async signOut(): Promise<void> {}

  async revalidateToken() {
    const tokens = await this.getAuth();

    if (!tokens) {
      throw new Error("No tokens found for revalidation");
    }

    try {
      const response = await this.taigaClient<TaigaTokenResponse>(
        "/auth/refresh",
        {
          method: HttpMethodsEnum.POST,
          auth: false,
          retry: false,
          body: JSON.stringify({
            refresh: tokens.refresh,
          }),
        },
      );

      this.setTokens({
        refresh: response.data.refresh,
        token: response.data.auth_token,
        id: tokens.id,
        expired: false,
      });

      TaigaService.#retries = 0;
    } catch (error) {
      if (error instanceof TaigaServiceError && error.type === "SIGN_IN") {
        this.setTokens({ ...tokens, expired: true });
      }

      throw error;
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
        "Taiga issue initialization failed",
      );
      throw new TaigaServiceError(parsedError.message, "INIT_ISSUE", error);
    }
  }

  async createScreenshotAttachment(
    issueId: IssueResponse["id"],
    issueData: IssueData,
  ): Promise<AttachmentResponse> {
    try {
      const attachmentContent = new FormData();

      attachmentContent.append("object_id", issueId.toString());
      attachmentContent.append("project", issueData.project);
      attachmentContent.append(
        "attached_file",
        base64ToFile(issueData.print, "screenshot.png"),
      );

      const attachment = await this.taigaClient<AttachmentResponse>(
        "/issues/attachments",
        {
          method: HttpMethodsEnum.POST,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: attachmentContent,
        },
      );

      return attachment.data;
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga issue attachment failed",
      );
      throw new TaigaServiceError(
        parsedError.message,
        "CREATE_ATTACHMENT",
        error,
      );
    }
  }

  async insertIssueDescription(
    issueId: IssueResponse["id"],
    issueData: IssueData,
    attachment: AttachmentResponse,
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
        "Taiga issue description failed",
      );
      throw new TaigaServiceError(
        parsedError.message,
        "INSERT_DESCRIPTION",
        error,
      );
    }
  }

  async createIssue(issueData: IssueData): Promise<IssueReturn> {
    try {
      const response = await this.initIssue(issueData);

      const attachment = await this.createScreenshotAttachment(
        response.id,
        issueData,
      );

      await this.insertIssueDescription(response.id, issueData, attachment);

      return {
        url: this.#getIssueURL(response),
      };
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga issue creation failed",
      );
      throw new TaigaServiceError(parsedError.message, "CREATE_ISSUE", error);
    }
  }

  async checkLogin(): Promise<AuthStatus> {
    try {
      await this.taigaClient("/users/me", {
        method: HttpMethodsEnum.GET,
      });

      return "active";
    } catch (error) {
      if (
        error instanceof TaigaServiceError &&
        error.type === "REVALIDATE_TOKEN"
      ) {
        return "expired";
      }

      return "inactive";
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
        },
      );

      return response.data.map((project) => ({
        id: project.id.toString(),
        name: project.name,
      }));
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga project listing failed",
      );
      throw new TaigaServiceError(parsedError.message, "LIST_PROJECTS", error);
    }
  }

  async getTags(projectId: number): Promise<Record<string, string | null>> {
    try {
      const tokens = await this.getAuth();

      if (!tokens) {
        throw new Error("Auth not found for listing projects");
      }

      console.log({ projectId });

      const response = await this.taigaClient<Record<string, string | null>>(
        `/projects/${projectId}/tags_colors`,
        {
          method: HttpMethodsEnum.GET,
        },
      );

      return response.data;
    } catch (error) {
      const parsedError = handleRequestError(
        error,
        "Taiga tags listing failed",
      );
      throw new TaigaServiceError(parsedError.message, "GET_TAGS", error);
    }
  }
}

export { TaigaService };
