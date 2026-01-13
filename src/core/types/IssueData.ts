import { TrackInfo } from "./TrackInfo";

export type IssueData = {
  subject: string;
  description: string;
  print: string;
  project: string;
  trackInfo?: TrackInfo[];
  locale: string;
  href: string;
};
