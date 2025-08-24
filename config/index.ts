import { AxiosRequestConfig } from './../node_modules/axios/index.d';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";



export const httpClient: AxiosInstance = axios.create({
    // baseURL: "http://192.168.1.100:5000/",
    baseURL: "https://sham-truck-backend.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
})

httpClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem("token")
        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`)
        }
        return config;
    },
    (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refresh_token');
                const response = await axios.post(`${process.env.API_URL}/auth/api/token/refresh/`, { token: refreshToken });

                await AsyncStorage.setItem("token", response.data.token);
                httpClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                return httpClient(originalRequest);
            } catch (refreshError) {
                AsyncStorage.removeItem("token");
                return Promise.reject(refreshError);
            }
        }
        const formattedError = formatError(error);
        return Promise.reject(formattedError);
    }
)


function formatError(error: AxiosError): any {
    if (!error.response) {
        return {
            ...error,
            custom_message: 'Network Error - Please check your internet connection',
        };
    }

    const responseData = error.response.data as any;
    let errorMessage = error.message;

    if (responseData?.errors?.full_messages) {
        errorMessage = responseData.errors.full_messages.join('\n');
    } else if (Array.isArray(responseData?.errors)) {
        errorMessage = responseData.errors
            .map((err: any) => err.detail || err)
            .join('\n');
    } else if (responseData?.message) {
        errorMessage = responseData.message;
    }

    return {
        ...error,
        custom_message: errorMessage,
    };
}



export const apiService = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        httpClient.get(url, config).then((res) => res.data),

    post: <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> =>
        httpClient.post(url, data, config).then((res) => res.data),

    patch: <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> =>
        httpClient.patch(url, data, config).then((res) => res.data),

    put: <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> =>
        httpClient.put(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        httpClient.delete(url, config).then((res) => res.data)
}