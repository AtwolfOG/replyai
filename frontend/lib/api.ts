import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { Reply, Settings, User, UpdateSettingsRequest } from "./types";


let access_token: string = "";
let tokenPromise: Promise<string> | null = null;

const callbackPath = "/auth/google/callback/";
const refreshPath = "/auth/refresh";
const signinPath = "/auth/signin";
const excludePaths = [
  callbackPath,
  refreshPath,
  signinPath,
]
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,

  withCredentials: true,
});


api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (excludePaths.some((path) => config.url?.includes(path))) return config;
    const token = await getAccessToken();
    
    // attach access token automatically
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },

  (error) => {
    console.log("error: ", error);
    return Promise.reject(error);
  }
);

// get access token 
export async function getAccessToken(): Promise<string> {
  if (access_token) {
    return access_token;
  }

  if (tokenPromise) {
    return tokenPromise;
  }
  tokenPromise = (async () => {
    try {
      const response = await api.post(refreshPath);

      access_token = response.data.access_token;

      return access_token;
    } catch {
      window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signin";
    } finally {
      tokenPromise = null;
    }
  })();

  return tokenPromise;
}

// RESPONSE INTERCEPTOR

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // TODO: remove this
    console.log("response: ", response);
    if (
      response.data?.accessToken &&
      !excludePaths.some((path) => response.config.url?.includes(path))
    ) {
      access_token = response.data.accessToken;
    }
    return response;
  },

  async (error: AxiosError) => {
    if (error.config && excludePaths.some((path) => error.config?.url?.includes(path))) {
      return Promise.reject(error);
    }
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // if not unauthorized -> reject immediately
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // avoid infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      access_token = await getAccessToken();

      originalRequest.headers.Authorization = `Bearer ${access_token}`;

      return api(originalRequest);

    } catch (refreshError) {
      // logout user
      window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL + "/auth/signin";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);


export async function signin(): Promise{
  const response = await api.post(signinPath);
  return response.data;
}

// TODO: add params
export async function callback(searchParams: URLSearchParams): Promise<CallbackResponse> {
  const response = await api.get<CallbackResponse>(callbackPath, { params: searchParams });
  return response.data;
}

export async function getReplyById(id: string): Promise<Reply> {
  const response = await api.get<Reply>(`/replies/${id}`);
  return response.data;
}

export async function getReplies(): Promise<Reply[]> {
  const response = await api.get<Reply[]>(`/replies`);
  return response.data;
}

export async function generateReply(data: GenerateReplyRequest): Promise<GenerateReplyResponse> {
  const response = await api.post<GenerateReplyResponse>(`/replies/generate`, data);
  return response.data;
}

export async function getSettings(): Promise<Settings> {
  const response = await api.get<Settings>(`/users/settings`);
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>(`/users/me`);
  return response.data;
}

export async function updateSettings(data: UpdateSettingsRequest): Promise<Settings> {
  const response = await api.put<Settings>(`/users/settings`, data);
  return response.data;
}