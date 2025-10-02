'use client'

import { api } from '../lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

interface AuthResponse {
    token: string;
}

const handleApiError = (err: any, defaultMessage: string) => {
    const error = new Error(err?.response?.data?.message || err?.message || defaultMessage);
    (error as any).status = err?.response?.data?.status || err?.status;
    throw error;
};

export const authApi = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await api.post<AuthResponse>('/login', {
                email,
                password
            });
            return response.data;
        } catch (err: any) {
            throw handleApiError(err, 'Login failed');
        }
    },

    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await api.post<AuthResponse>('/register', {
                name,
                email,
                password
            });
            return response.data;
        } catch (err: any) {
            throw handleApiError(err, 'Registration failed');
        }
    },

    getUserProfile: async (): Promise<User> => {
        try {
            const response = await api.get<User>('/user/profile');
            return response.data;
        } catch (err: any) {
            throw handleApiError(err, 'Failed to fetch user profile');
        }
    },
};

export function useAuthApi() {
    return authApi;
}