import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "ユーザー名を入力してください" })
    .max(255, { message: "255文字以内で入力してください。" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/[A-Z]/, { message: "パスワードには大文字を含めてください" })
    .regex(/[a-z]/, { message: "パスワードには小文字を含めてください" })
    .regex(/[0-9]/, { message: "パスワードには数字を含めてください" })
    .regex(/[!@#$%^&*(),.?":{}|<>-]/, {
      message: "パスワードには記号を含めてください",
    }),
  password_confirmation: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" }),
})
.refine((data) => data.password === data.password_confirmation, {
  message: "パスワードが一致しません",
  path: ["password_confirmation"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
