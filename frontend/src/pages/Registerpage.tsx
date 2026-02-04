import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ErrorResponse } from "../types/error";
import { registerSchema, type RegisterFormData } from "@/zod/register"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authApi } from "@/api/client"
import { toast } from "sonner"



export default function Register(){

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
    });
    // フォーム送信時の処理
    const onSubmit = (data:RegisterFormData) => {
      try {
        authApi.register(data.name, data.password, data.password_confirmation)
          .then(() => {
            toast.success("登録成功");
            setIsLoading(true);
            navigate("/login");
          })
          .catch((error:ErrorResponse) => {
            setIsLoading(false);
            if (error.errors){
              const allErrors = Object.values(error.errors).flat();
              allErrors.forEach((errMsg) =>{
                toast.error(errMsg);
              })
            }else{
              toast.error(error.message ||"登録失敗:");
            }
          });
      } catch (error) {
        toast.error("登録中にエラーが発生しました:" + error);
        setIsLoading(false);
      }
    };

    return(
  <form onSubmit={handleSubmit(onSubmit)} className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-xs border-2 border-gray-500/80 p-8 rounded-lg shadow-lg flex flex-col gap-6">
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
        <p className="text-xs -mt-4 text-gray-500">大文字・小文字・数字・記号を含む8文字以上</p>
        {/* パスワード(再確認) */}
        <div>
          <Input
            placeholder="パスワード（再確認)"
            type="password"
            className="border-2 h-12 border-gray-600/40"
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-red-500 mt-1">{errors.password_confirmation.message}</p>
          )}
        </div>


        {/* ログインボタン */}
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-1/2 bg-hitonichi-secondary hover:bg-hitonichi-primary"
            disabled={isLoading}
          >新規登録
          </Button>
        </div>
      </div>

      {/* 新規登録リンク */}
      <div className="flex justify-center items-center mt-5">
        <a href="/login" className="text-hitonichi-secondary font-bold cursor-pointer hover:text-hitonichi-primary" aria-disabled={isLoading}>
          既にアカウントをお持ちの方はこちら
        </a>
      </div>
    </form>
    )
}

