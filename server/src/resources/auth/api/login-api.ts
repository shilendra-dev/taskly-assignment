import { ApiResponse } from "@/types/base.types";
import { comparePassword } from "@/lib/auth";
import { fetchUserByEmail } from "@/resources/auth/queries/fetchUserByEmail";
import { generateToken } from "@/lib/auth";
import { Request, Response } from "express";

export const loginAPI = async (req: Request, _res: Response): Promise<ApiResponse> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return {
                status: 400,
                message: 'Missing required fields',
                type: 'error'
            }
        }

        const user = await fetchUserByEmail(email);

        if (!user || user.length === 0) {
            return {
                status: 400,
                message: 'User not found',
                type: 'error'
            }
        }

        const isPasswordValid = comparePassword(password, user[0].password);

        if (!isPasswordValid) {
            return {
                status: 400,
                message: 'Invalid password',
                type: 'error'
            }
        }

        const token = generateToken({ userId: user[0].id, email: user[0].email });

        return {
            status: 200,
            message: 'Login successful',
            type: 'success',
            data: {
                token
            }
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return {
            status: 500,
            message: 'Internal server error',
            type: 'error'
        }
    }
}