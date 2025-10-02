import { hashPassword } from "@/lib/auth";
import { fetchUserByEmail } from "@/resources/auth/queries/fetchUserByEmail.js";
import { insertUser } from "@/resources/auth/queries/insertUser.js";
import { generateToken } from "@/lib/auth.js";
import { Request, Response } from "express";
import { ApiResponse } from "@/types/base.types";

export const registerAPI = async (req: Request, _res: Response): Promise<ApiResponse> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return {
                status: 400,
                message: 'Missing required fields',
                type: 'error'
            }
        }

        const existingUser = await fetchUserByEmail(email);

        if (existingUser && existingUser.length > 0) {
            return {
                status: 400,
                message: 'User already exists',
                type: 'error'
            }
        }

        const hashedPassword = hashPassword(password);
        const newUser = await insertUser({
            name,
            email,
            password: hashedPassword
        });

        if (!newUser) {
            return {
                status: 500,
                message: 'Error creating user',
                type: 'error'
            }
        }

        const token = generateToken({ userId: newUser[0].id, email: newUser[0].email });

        return {
            status: 201,
            message: 'User registered successfully',
            type: 'success',
            data: {
                token
            }
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return {
            status: 500,
            message: 'Internal server error',
            type: 'error'
        }
    }
}