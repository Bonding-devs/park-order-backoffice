import Axios from "axios";
import { HTTP_METHODS, STORAGE_KEYS } from "../globals";

const axiosInstance = Axios.create({
    baseURL: "https://api.dev.samshifts.com",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
            try {
                const tempAxios = Axios.create({
                    baseURL: axiosInstance.defaults.baseURL,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${refreshToken}`,
                    }
                });

                const response = await tempAxios.post('/api/v1/auth/refresh');

                if (response.status === 200) {
                    const { token } = response.data;
                    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export const createApiRequest = async ({
    url,
    method,
    data = null,
    params = null,
}: {
    url: string;
    method: HTTP_METHODS;
    data?: any;
    params?: any;
}) => {
    try {
        const config: any = {
            url,
            method,
        };
        if (data !== null) {
            config.data = data;
        }
        if (params !== null) {
            config.params = params;
        }

        const response = await axiosInstance(config);
        return response.data;
    } catch (err) {
        if (Axios.isAxiosError(err)) {
            const errorMessage = err.response?.data?.message || err.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export default axiosInstance; // Asegúrate de exportar axiosInstance como exportación por defecto
