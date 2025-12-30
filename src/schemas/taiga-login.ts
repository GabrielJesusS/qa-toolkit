import * as v from "valibot";

export const TaigaLoginSchema = v.object({
  email: v.pipe(
    v.string("Must be a string"),
    v.trim(),
    v.nonEmpty("The email is required"),
    v.email("Must be a valid email address")
  ),
  password: v.pipe(
    v.string("Must be a string"),
    v.trim(),
    v.nonEmpty("The password is required")
  ),
});

export type TaigaLogin = v.InferOutput<typeof TaigaLoginSchema>;
