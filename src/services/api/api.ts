import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("api_key");

  if (accessToken) {
    req.headers.set("Authorization", `Bearer ${JSON.parse(accessToken)}`);
  }

  return req;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err: AxiosError) => {
    if (err.status === 401) {
      localStorage.removeItem("api_key");
      window.location.reload();
    }

    throw err;
  },
);

export class BaseApi {
  protected baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? "";
  }

  protected _get<R, P = unknown>(url: string, config?: AxiosRequestConfig) {
    return api.get<R, AxiosResponse<R>, P>(`${this.baseUrl}/${url}`, config);
  }

  protected _put<R, P>(url: string, data: P, config?: AxiosRequestConfig) {
    return api.put<R, AxiosResponse<R>, P>(
      `${this.baseUrl}/${url}`,
      data,
      config,
    );
  }

  protected _patch<R, P>(url: string, data: P, config?: AxiosRequestConfig) {
    return api.patch<R, AxiosResponse<R>, P>(
      `${this.baseUrl}/${url}`,
      data,
      config,
    );
  }

  protected _post<R, P>(url: string, data: P, config?: AxiosRequestConfig) {
    return api.post<R, AxiosResponse<R>, P>(
      `${this.baseUrl}/${url}`,
      data,
      config,
    );
  }

  protected _delete<R>(url: string, config?: AxiosRequestConfig) {
    return api.delete<R, AxiosResponse<R>>(`${this.baseUrl}/${url}`, config);
  }
}
