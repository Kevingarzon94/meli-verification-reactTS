import axios from 'axios';

const apiBase = axios.create({
    timeout: 10000, // 10 segundos
    headers: {
        'Content-Type': 'application/json',
    },
});

apiBase.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export type QueryParams = Record<string, string | number | boolean | undefined>;

export const get = async <T>(url: string, params?: QueryParams): Promise<T> => {
    const response = await apiBase.get<T>(url, { params });
    return response.data;
};

export const post = async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
    const response = await apiBase.post<T>(url, data);
    return response.data;
};

export const patch = async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
    const response = await apiBase.patch<T>(url, data);
    return response.data;
};

interface CaptchaValidationResponse {
    valid: boolean;
}

export const validateCaptcha = async (token: string): Promise<boolean> => {
    try {
        const response = await post<CaptchaValidationResponse>('/api/validate-captcha', { token });
        return response.valid;
    } catch (error) {
        console.error('Error validating CAPTCHA:', error);
        return false;
    }
};