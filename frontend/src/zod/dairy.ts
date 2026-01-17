import {z} from "zod";

export const dairySchema = z.object({
    content: z.string().min(1, "日記の内容を入力してください").max(5000, "日記の内容は5000文字以内で入力してください"),
});

export type DairyFormData = z.infer<typeof dairySchema>;
