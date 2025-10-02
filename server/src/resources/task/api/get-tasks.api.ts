import { AuthenticatedRequest } from "@/types/base.types";
import { ApiResponse } from "@/types/base.types";
import { Response } from "express";
import { getTasks } from "../queries/getTasks.js";

export const getTasksAPI = async (req: AuthenticatedRequest, _res: Response): Promise<ApiResponse> => {
    try {
        if (!req.user) {
            return {
                status: 401,
                message: 'Unauthorized',
                type: 'error'
            }
        }
        const userId = req.user.id;
        const tasks = await getTasks(userId);

        return {
            status: 200,
            message: 'Tasks fetched successfully',
            type: 'success',
            data: {
                tasks
            }
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return {
            status: 500,
            message: 'Internal server error',
            type: 'error'
        }
    }
}