import handleApiError from "@/utils/apiError";
import { api } from "../lib/api";

export interface Task {
    id: string;
    title: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}

export const taskApi = {
    create: async (title: string, status: string): Promise<Task> => {
        try {
            const response = await api.post<Task>('/task',{
                title,
                status
            })
            return response.data;
        } catch (err: any) {
            throw handleApiError(err, 'Failed to create task');
        }
    },
    update: async (id: string, title: string, status: string): Promise<Task> => {
        try {
            const response = await api.put<Task>(`/task/${id}`, {
                title,
                status
            });
            return response.data;
        } catch (err: any) {
            throw handleApiError(err, 'Failed to update task');
        }
    },
    delete: async (id: string): Promise<void> => {
        try {
            await api.delete(`/task/${id}`);
        } catch (err: any) {
            throw handleApiError(err, 'Failed to delete task');
        }
    },
    getAll: async (): Promise<{tasks: Task[]}> => {
        try {
            const response = await api.get<{tasks: Task[]}>("/tasks");
            return response.data;
        } catch (err: any) {
            throw handleApiError(err, 'Failed to get tasks');
        }
    },
};

export function useTaskApi() {
    return taskApi;
}
    