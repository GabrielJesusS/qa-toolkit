import { IssueData } from "@/core/types/IssueData";
import { ProjectsSchema } from "@/schemas/project";

export interface IssueProviderService {
  createIssue(issueData: IssueData): Promise<void>;
  listProjects(): Promise<ProjectsSchema>;
}
