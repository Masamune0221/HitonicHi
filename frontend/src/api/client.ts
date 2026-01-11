import {
  createApiConfig,
  type LoginRequest,
  type LoginResponse,
} from "../types/auth";
import { type ErrorResponse } from "../types/error";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

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
  getCurrentUser: () => apifetch("/user", createApiConfig()),

  // ログイン
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const body: LoginRequest = { email, password };
    return apifetch(
      "/login",
      createApiConfig({
        method: "POST",
        body: JSON.stringify(body),
      })
    );
  },
};
