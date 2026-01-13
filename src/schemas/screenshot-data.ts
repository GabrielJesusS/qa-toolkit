import * as v from "valibot";

export const ScreenshotDataSchema = v.object({
  screenshot: v.string(),
  location: v.string(),
});

export type ScreenshotDataSchema = v.InferOutput<typeof ScreenshotDataSchema>;
