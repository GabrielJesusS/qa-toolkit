import * as v from "valibot";

export function stringifyIssues(issues: v.BaseIssue<unknown>[]): string {
  return issues.map((e) => e.message).join(",\n ");
}
