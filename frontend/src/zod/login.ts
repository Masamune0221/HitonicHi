import z from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, { message: "ユーザー名を入力してください" }),
  password: z
    .string()
    .min(1, { message: "パスワードを入力してください" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
