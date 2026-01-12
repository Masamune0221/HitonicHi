import {
  createApiConfig,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
  headers,
} from "../types/auth";
import { type ErrorResponse } from "../types/error";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

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

  const response = await fetch(url, options);

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
};
