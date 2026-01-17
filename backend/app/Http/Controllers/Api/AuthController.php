<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Services\RegisterService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected $registerService;

    public function __construct(RegisterService $registerService)
    {
        $this->registerService = $registerService;
    }

    //
    public function login(LoginRequest $request)
    {
        try {
            // バリデーション済みのデータを取得
            $credentials = $request->validated();
            if (! Auth::attempt($credentials)) {
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

    public function register(RegisterRequest $request)
    {
        try {
            $credentials = $request->validated();

            $user = $this->registerService->register($credentials);
            if (! $user) {
                return response()->json([
                    'message' => '登録に失敗しました。',
                ], 500);
            }

            return response()->json([
                'status' => 201,
                'message' => '登録に成功しました.',
                'user' => $user,
            ], 201);
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
            Auth::guard('web')->logout();
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
