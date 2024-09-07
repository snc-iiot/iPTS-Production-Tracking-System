/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export abstract class APIService {
  protected baseURL: string;
  protected axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL,
      headers: this.getDefaultHeaders(),
    });
  }

  private getDefaultHeaders(): Record<string, string> {
    const token = "";
    return token ? { Authorization: `Bearer ${token} `} : {};
  }

  get<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  post<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  put<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  patch<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  delete<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, {
      data,
      ...config,
    });
  }

  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.request<T>(config);
  }
}