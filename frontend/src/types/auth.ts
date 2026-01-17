export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  user: {
    id: number;
    name: string;
  };
  message?: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export interface RegisterResponse {
  status: number;
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

export const headers: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
