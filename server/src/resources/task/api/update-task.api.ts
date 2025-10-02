import { AuthenticatedRequest } from "@/types/base.types";
import { ApiResponse } from "@/types/base.types";
import { Response } from "express";
import { updateTask } from "../queries/updateTask.js";

export const updateTaskAPI = async (req: AuthenticatedRequest, _res: Response): Promise<ApiResponse> => {
    try {
        const { title, status } = req.body;
        const taskId = req.params.id;

        if (!title || !status) {
            return {
                status: 400,
                message: 'Missing required fields',
                type: 'error'
            }
        }

        const task = await updateTask(title, status, taskId);

        return {
            status: 200,
            message: 'Task updated successfully',
            type: 'success',
            data: {
                task
            }
        }
    } catch (error) {
        console.error('Error updating task:', error);
        return {
            status: 500,
            message: 'Internal server error',
            type: 'error'
        }
    }
}