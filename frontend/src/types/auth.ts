export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  message?: string;
}

// ユーザー情報の型
export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// API設定を生成する関数
export const createApiConfig = (options: RequestInit = {}): RequestInit => {
  return {
    ...options,
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
};
