import z from "zod";
import { loginSchema } from "./login";

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(1, { message: "ユーザー名を入力してください" })
      .max(255, { message: "255文字以内で入力してください。" }),
    password_confirmation: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "パスワードが一致しません",
    path: ["password_confirmation"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
