<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //
    public function login(LoginRequest $request)
    {
        try {
            // バリデーション済みのデータを取得
            $credentials = $request->validated();
            if (! Auth::attempt($credentials['email'], $credentials['password'])) {
                return response()->json([
                    'message' => 'ユーザー名またはパスワードが正しくありません。',
                ], 401);
            }
            // 認証に成功した場合の処理
            $request->session()->regenerate();

            return response()->json([
                'status' => 200,
                'message' => 'ログインに成功しました。',
                'user' => Auth::user(),
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'バリデーションエラーが発生しました。',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'サーバーエラーが発生しました。'.$e->getMessage(),
            ], 500);
        }
    }

    public function logout()
    {
        try {
            Auth::logout();
            request()->session()->invalidate();
            request()->session()->regenerateToken();

            return response()->json([
                'message' => 'ログアウトに成功しました。',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'サーバーエラーが発生しました。'.$e->getMessage(),
            ], 500);
        }
    }

    public function user()
    {
        try {
            return response()->json(Auth::user(), 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'サーバーエラーが発生しました。'.$e->getMessage(),
            ], 500);
        }
    }
}
