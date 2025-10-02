import { Response } from "express";
import { ApiResponse } from "@/types/base.types";
import { AuthenticatedRequest } from "@/types/base.types";
import { fetchUserByEmail } from "../queries/fetchUserByEmail";

export const meApi = async (req: AuthenticatedRequest, _res: Response): Promise<ApiResponse> => {
    try {
        if (!req.user) {
            return {
                status: 401,
                message: 'Unauthorized',
                type: 'error'
            }
        }
        const user = await fetchUserByEmail(req.user.email);
        return {
            status: 200,
            message: 'User fetched successfully',
            type: 'success',
            data: {user}
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error',
            type: 'error'
        }
    }
}