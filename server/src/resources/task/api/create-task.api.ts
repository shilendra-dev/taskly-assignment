import { ApiResponse } from "@/types/base.types";
import { insertTask } from "../queries/insertTask.js";
import { AuthenticatedRequest } from "@/types/base.types.js";
import { Response } from "express";

export const createTaskAPI = async (req: AuthenticatedRequest, _res: Response): Promise<ApiResponse> => {
    try {
        const { title, status } = req.body;

        if (!req.user) {
            return {
                status: 401,
                message: 'Unauthorized',
                type: 'error'
            }
        }
        const userId = req.user.id;

        if (!title || !status) {
            return {
                status: 400,
                message: 'Missing required fields',
                type: 'error'
            }
        }

        const task = await insertTask(title, status, userId);

        return {
            status: 200,
            message: 'Task created successfully',
            type: 'success',
            data: {
                task
            }
        }
    } catch (error) {
        console.error('Error creating task:', error);
        return {
            status: 500,
            message: 'Internal server error',
            type: 'error'
        }
    }
}