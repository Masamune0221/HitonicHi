import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "@/zod/login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authApi } from "@/api/client"
import { toast } from "sonner"

export default function Login(){

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // フォーム送信時の処理
    const onSubmit = (data: LoginFormData) => {
      try {
        authApi.login(data.username, data.password)
          .then(() => {
            toast.success("ログイン成功:");
          })
          .catch((error) => {
            toast.error("ログイン失敗:", error);
          });
      } catch (error) {
        toast.error("ログイン中にエラーが発生しました:" + error);
      }
    };


    return(
   <form onSubmit={handleSubmit(onSubmit)} className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-1/3 border-2 border-gray-500/80 p-8 rounded-lg shadow-lg flex flex-col gap-6">
        {/* ユーザー名 */}
        <div>
          <Input
            placeholder="ユーザー名"
            className="border-2 h-12 border-gray-600/40"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
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
        <a className="text-hitonichi-secondary font-bold cursor-pointer hover:text-hitonichi-primary">
          新規登録の方はこちら
        </a>
      </div>
    </form>
    )
}