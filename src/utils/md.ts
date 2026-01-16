import { IssueData } from "@/core/types/IssueData";
import { formatUrl } from "./url";
import { formatLocaleDate } from "./date";

const MARKDOWN_SPECIAL_CHARACTERS = /([\\`*_{}[\]()#+\-.!~|^$])/g;

function escapeCharacters(text: string): string {
  return text.replace(MARKDOWN_SPECIAL_CHARACTERS, "\\$1");
}

export async function generateMarkdownFromIssue(
  issue: IssueData
): Promise<string> {
  let content = "";

  content += `${escapeCharacters(issue.description)} \n\n`;

  const printAltText = escapeCharacters(issue.subject || "screenshot");

  content += `![${printAltText}](${issue.print}) \n`;

  content += `Location: ${formatUrl(issue.href)} \n`;

  if (issue.trackInfo && issue.trackInfo.length > 0) {
    content += "## Tracked Network Requests: \n";

    content += "| Resource | Origin | Code | Requested At | \n";

    content += "| --- | --- | --- | --- | \n";

    issue.trackInfo.forEach((track) => {
      const date = new Date(track.createdAt);

      content += `| ${formatUrl(track.url)} | ${formatUrl(track.origin)} | ${
        track.code
      } | ${formatLocaleDate(date, issue.locale)} | \n`;
    });
  }

  content += `_**Issue created via QA Toolkit**_`;

  return content;
}
