'use client'

import { api } from '../lib/api';
import handleApiError from '@/utils/apiError';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthResponse {
    token: string;
}

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

    getUserProfile: async (): Promise<{user: User[]}> => {
        try {
            const response = await api.get<{user: User[]}>('/me');
            return response.data;
        } catch (err: any) {
            throw handleApiError(err, 'Failed to fetch user profile');
        }
    },
};

export function useAuthApi() {
    return authApi;
}