import axios from "axios";
import {
  type LoginResponse,
  type RegisterResponse,
} from "../types/auth";
import { type ErrorResponse } from "../types/error";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Axios インスタンスの設定
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

/**
 * リクエストインターセプター
 * localStorage からトークンを取得してヘッダーにセットする
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * レスポンスインターセプター
 * エラーハンドリングと、401(認証切れ)時の処理
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 401 の場合はトークンを削除してログイン画面へ（必要なら）
      if (error.response.status === 401) {
        localStorage.removeItem("auth_token");
      }

      const errorResponse: ErrorResponse = {
        status: error.response.status,
        message: error.response.data?.message || "エラーが発生しました",
        errors: error.response.data?.errors || null,
      };
      return Promise.reject(errorResponse);
    }
    return Promise.reject(error);
  }
);

// 認証関連のAPI
export const authApi = {
  // 認証状態を取得
  getCurrentUser: async () => {
    const response = await apiClient.get("/api/user");
    return response.data;
  },

  // ログイン
  login: async (name: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/api/login", { name, password });
    
    // トークンを保存
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }
    
    return response.data;
  },

  // 新規登録
  register: async (
    name: string,
    password: string,
    password_confirmation: string
  ): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>("/api/register", {
      name,
      password,
      password_confirmation,
    });

    // トークンを保存
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }

    return response.data;
  },

  // ログアウト
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/api/logout");
    } finally {
      // 成功しても失敗してもトークンは消す
      localStorage.removeItem("auth_token");
    }
  },
};

// 日記関連のAPI
export const dairyApi = {
  // 今日の日記を記載したか判定する
  today: async (): Promise<boolean> => {
    const response = await apiClient.get("/api/dairy/today");
    return response.data;
  },

  // 日記作成
  create: async (content: string): Promise<any> => {
    const response = await apiClient.post("/api/dairy/create", { content });
    return response.data;
  },

  // 日記一覧取得
  index: async (): Promise<any> => {
    const response = await apiClient.get("/api/dairies");
    return response.data;
  },
};
