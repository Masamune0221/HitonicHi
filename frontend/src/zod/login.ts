import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "メールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/[A-Z]/, { message: "パスワードには大文字を含めてください" })
    .regex(/[a-z]/, { message: "パスワードには小文字を含めてください" })
    .regex(/[0-9]/, { message: "パスワードには数字を含めてください" })
    .regex(/[!@#$%^&*(),.?":{}|<>-]/, {
      message: "パスワードには記号を含めてください",
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
