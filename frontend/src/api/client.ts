import {
  createApiConfig,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
  headers,
} from "../types/auth";
import { type DairyRequest } from "../types/dairy";
import { type ErrorResponse } from "../types/error";

const API_BASE_URL = ""; // プロキシを使うため、空文字（相対パス）でOK。ローカル開発時は環境変数で切り替える。

/**
 * クッキー値を取得するヘルパー関数
 */
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
}

/**
 * CSRF トークンを取得 (Sanctum の初期化)
 * 初回のリクエスト（ログイン前など）で一度だけ呼ぶのが理想的です
 */
const getCsrfToken = async () => {
  try {
    await fetch(`${API_BASE_URL}/api/csrf-cookie`, {
      credentials: "include",
    });
    return getCookie('XSRF-TOKEN');
  } catch (error) {
    console.error("XSRF token error:", error);
    throw error;
  }
};

/**
 * apifetch
 * CSRF トークンの自動セット機能を備えたフェッチ関数
 */
async function apifetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const method = options.method?.toUpperCase() || 'GET';
  const apiHeaders = new Headers(options.headers || {});
  
  // POST/PUT/DELETE などのリクエストの場合、自動的に XSRF トークンをヘッダーにセットする
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    const token = getCookie('XSRF-TOKEN');
    if (token) {
      apiHeaders.set('X-XSRF-TOKEN', token);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: apiHeaders,
    credentials: "include",
  });

  const contentType = response.headers.get("content-Type");
  const data = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const errorResponse: ErrorResponse = {
      status: response.status,
      message: data?.message || "エラーが発生しました",
      errors: data?.errors || null,
    };
    throw errorResponse;
  }
  return data;
}

// 認証関連のAPI
export const authApi = {
  // 認証状態を取得
  getCurrentUser: () => apifetch("/api/user", createApiConfig()),

  // ログイン
  login: async (name: string, password: string): Promise<LoginResponse> => {
    // ログイン前に CSRF セットアップが必要
    await getCsrfToken();
    
    const body: LoginRequest = { name, password };
    return apifetch(
      "/api/login",
      createApiConfig({
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      })
    );
  },

  // 新規登録
  register: async (
    name: string,
    password: string,
    password_confirmation: string
  ): Promise<RegisterResponse> => {
    // 登録前に CSRF セットアップが必要
    await getCsrfToken();

    const body: RegisterRequest = {
      name,
      password,
      password_confirmation,
    };
    return apifetch(
      "/api/register",
      createApiConfig({
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      })
    );
  },

  // ログアウト
  logout: async (): Promise<void> => {
    return apifetch(
      "/api/logout",
      createApiConfig({
        method: "POST",
        headers: headers,
      })
    );
  },
};

// 日記関連のAPI
export const dairyApi = {
  // 今日の日記を記載したか判定する
  today: async (): Promise<boolean> => {
    return apifetch(
      "/api/dairy/today",
      createApiConfig({
        method: "GET",
        headers: headers,
      })
    );
  },

  // 日記作成
  create: async (content: string): Promise<any> => {
    const body: DairyRequest = { content };
    return apifetch(
      "/api/dairy/create",
      createApiConfig({
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      })
    );
  },

  // 日記一覧取得
  index: async (): Promise<any> => {
    return apifetch(
      "/api/dairies",
      createApiConfig({
        method: "GET",
        headers: headers,
      })
    );
  },
};
