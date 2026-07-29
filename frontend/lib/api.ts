import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Reply } from "./types";


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
    console.log("token: ", token);
    
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
      access_token = "";

      const token = await getAccessToken();

      originalRequest.headers.Authorization = `Bearer ${token}`;

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


export async function signin() {
  const response = await api.post(signinPath);
  return response.data;
}

// TODO: add params
export async function callback(searchParams: URLSearchParams) {
  const response = await api.get(callbackPath, { params: searchParams });
  return response.data;
}

export async function getReplyById(id: string): Promise<Reply> {
  const response = await api.get(`/replies/${id}`);
  return response.data;
}

export async function getReplies(): Promise<Reply[]> {
  const response = await api.get(`/replies`);
  return response.data;
}

export async function generateReply(data: GenerateReplyRequest): Promise<GenerateReplyResponse> {
  const response = await api.post(`/replies/generate`, data);
  return response.data;
}

export async function getSettings() {
  const response = await api.get(`/users/settings`);
  return response.data;
}