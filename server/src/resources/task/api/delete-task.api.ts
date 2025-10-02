import { ApiResponse } from "@/types/base.types";
import { AuthenticatedRequest } from "@/types/base.types.js";
import { deleteTask } from "../queries/deleteTask.js";
import { Response } from "express";

export const deleteTaskAPI = async (req: AuthenticatedRequest, _res: Response): Promise<ApiResponse> => {
    try {
        const taskId = req.params.id;

        const task = await deleteTask(taskId);

        if (!task || task.length === 0) {
            return {
                status: 404,
                message: 'Task not found',
                type: 'error'
            }
        }

        return {
            status: 200,
            message: 'Task deleted successfully',
            type: 'success',
            data: {
                task
            }
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        return {
            status: 500,
            message: 'Internal server error',
            type: 'error'
        }
    }
}