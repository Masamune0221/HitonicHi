import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ErrorResponse } from "../types/error";
import { loginSchema, type LoginFormData } from "@/zod/login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner"


export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // すでにログインしている場合は日記ページへリダイレクト
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/daily', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // フォーム送信時の処理
  const onSubmit = (data: LoginFormData) => {
    login(data.name, data.password)
      .then(() => {
        toast.success("ログイン成功");
        navigate('/daily');
      })
      .catch((error: ErrorResponse) => {
        if (error.errors) {
          const allErrors = Object.values(error.errors).flat();
          allErrors.forEach((errMsg) => {
            toast.error(errMsg);
          });
        } else {
          toast.error(error.message || "ログインに失敗しました");
        }
      });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-1/3 border-2 border-gray-500/80 p-8 rounded-lg shadow-lg flex flex-col gap-6">
        {/* ユーザー名 */}
        <div>
          <Input
            placeholder="ユーザー名"
            className="border-2 h-12 border-gray-600/40"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* パスワード */}
        <div>
          <Input
            placeholder="パスワード"
            type="password"
            className="border-2 h-12 border-gray-600/40"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* ログインボタン */}
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-1/2 bg-hitonichi-secondary hover:bg-hitonichi-primary"
          //disabled={loading}
          >ログイン
          </Button>
        </div>
      </div>

      {/* 新規登録リンク */}
      <div className="flex justify-center items-center mt-5">
        <a href="/register" className="text-hitonichi-secondary font-bold cursor-pointer hover:text-hitonichi-primary">
          新規登録の方はこちら
        </a>
      </div>
    </form>
  )
}