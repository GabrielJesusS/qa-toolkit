import * as v from "valibot";

export const ScreenshotSchema = v.object({
  screenshot: v.pipe(v.string()),
});

export type ScreenshotSchema = v.InferOutput<typeof ScreenshotSchema>;
