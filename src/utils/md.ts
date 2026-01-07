import { IssueData } from "@/core/types/IssueData";
import { formatUrl } from "./url";

export async function generateMarkdownFromIssue(
  issue: IssueData
): Promise<string> {
  let content = "";

  content += `![${issue.subject} screenshot](${issue.print}) \n`;

  content += `${issue.description} \n`;

  if (issue.trackInfo && issue.trackInfo.length > 0) {
    content += "## Tracked Network Requests: \n";

    content += "| Resource | Origin | Code | Requested At | \n";

    content += "| --- | --- | --- | --- | \n";

    issue.trackInfo.forEach((track) => {
      const date = new Date(track.createdAt);

      content += `| ${formatUrl(track.url)} | ${formatUrl(track.origin)} | ${
        track.code
      } | ${date.toLocaleString()} | \n`;
    });
  }

  content += `_**Issue created via QA Toolkit**_`;

  return content;
}
