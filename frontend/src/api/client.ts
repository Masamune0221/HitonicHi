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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://hitonichi.onrender.com";

/**
 * CSRF トークンを取得
 */
const getCsrfToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`CSRF token fetch failed: ${response.status}`);
    }
    const cookies = document.cookie.split(";");
    const xsrfCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("XSRF-TOKEN=")
    );
    if (xsrfCookie) {
      return decodeURIComponent(xsrfCookie.split("=")[1]);
    }
  } catch (error) {
    console.error("CSRF token error:", error);
    throw error;
  }
};

/**
 * apifetch
 * @param endpoint
 * @param options
 * @returns
 */
async function apifetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
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
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const body: LoginRequest = { email, password };
    // CSRFトークンを取得
    const csrfToken = await getCsrfToken();
    const headersWithCsrf: HeadersInit = {
      ...headers,
      "X-XSRF-TOKEN": csrfToken || "",
    };
    return apifetch(
      "/api/login",
      createApiConfig({
        method: "POST",
        body: JSON.stringify(body),
        headers: headersWithCsrf,
      })
    );
  },

  // 新規登録
  register: async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<RegisterResponse> => {
    const csrfToken = await getCsrfToken();
    const body: RegisterRequest = {
      name,
      email,
      password,
      password_confirmation,
    };
    const headersWithCsrf: HeadersInit = {
      ...headers,
      "X-XSRF-TOKEN": csrfToken || "",
    };
    return apifetch(
      "/api/register",
      createApiConfig({
        method: "POST",
        body: JSON.stringify(body),
        headers: headersWithCsrf,
      })
    );
  },

  // ログアウト
  logout: async (): Promise<void> => {
    const csrfToken = await getCsrfToken();
    const headersWithCsrf: HeadersInit = {
      ...headers,
      "X-XSRF-TOKEN": csrfToken || "",
    };
    return apifetch(
      "/api/logout",
      createApiConfig({
        method: "POST",
        headers: headersWithCsrf,
      })
    );
  },
};

// 日記関連のAPI
export const dairyApi = {
  // 今日の日記を記載したか判定する
  today: async (): Promise<boolean> => {
    const csrfToken = await getCsrfToken();
    const headersWithCsrf: HeadersInit = {
      ...headers,
      "X-XSRF-TOKEN": csrfToken || "",
    };
    return apifetch(
      "/api/dairy/today",
      createApiConfig({
        method: "GET",
        headers: headersWithCsrf,
      })
    );
  },

  // 日記作成
  create: async (content: string): Promise<any> => {
    const csrfToken = await getCsrfToken();
    const body: DairyRequest = { content };
    const headersWithCsrf: HeadersInit = {
      ...headers,
      "X-XSRF-TOKEN": csrfToken || "",
    };
    return apifetch(
      "/api/dairy/create",
      createApiConfig({
        method: "POST",
        body: JSON.stringify(body),
        headers: headersWithCsrf,
      })
    );
  },

  // 日記一覧取得
  index: async (): Promise<any> => {
    const csrfToken = await getCsrfToken();
    const headersWithCsrf: HeadersInit = {
      ...headers,
      "X-XSRF-TOKEN": csrfToken || "",
    };
    return apifetch(
      "/api/dairies",
      createApiConfig({
        method: "GET",
        headers: headersWithCsrf,
      })
    );
  },
};
