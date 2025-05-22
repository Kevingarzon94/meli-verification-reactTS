import { get, patch, post } from './apiService';
import type {UserData, UserFormData} from '../_types/user.types';

const USERS_API_BASE = '/api/meli-users';

export const getCurrentUserData = async (): Promise<UserData> => {
    return get<UserData>(`${USERS_API_BASE}/me`);
};

export const getUserById = async (userId: string): Promise<UserData> => {
    return get<UserData>(`${USERS_API_BASE}/users/${userId}`);
};

export const updateUserData = async (userId: string, userData: Partial<UserFormData>): Promise<UserData> => {
    return patch<UserData, Partial<UserFormData>>(`${USERS_API_BASE}/users/${userId}`, userData);
};

interface ValidationResponse {
    valid: boolean;
    errors?: Record<string, string>;
}

export const validateUserData = async (userData: UserFormData): Promise<ValidationResponse> => {
    try {
        return await post<ValidationResponse, UserFormData>(`${USERS_API_BASE}/validate`, userData);
    } catch (error) {
        console.error('Error validating user data:', error);
        return { valid: false, errors: { general: 'Error al validar datos. Intente nuevamente.' } };
    }
};

interface VerificationResponse {
    success: boolean;
    redirectUrl?: string;
}

interface VerificationRequest {
    userId: string;
    userData: UserFormData;
    captchaToken: string;
}

export const submitVerificationData = async (
    userId: string,
    formData: UserFormData,
    captchaToken: string
): Promise<VerificationResponse> => {
    try {
        const requestData: VerificationRequest = {
            userId,
            userData: formData,
            captchaToken
        };

        return await post<VerificationResponse, VerificationRequest>(
            `${USERS_API_BASE}/verification-complete`,
            requestData
        );
    } catch (error) {
        console.error('Error submitting verification data:', error);
        return { success: false };
    }
};