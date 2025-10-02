import { db } from "@/db";
import { users } from "@/db/schema";

export async function insertUser({ name, email, password }: { name: string; email: string; password: string }) {
    try {
        const user = await db.insert(users).values({ name, email, password }).returning();

        return user;
    } catch (error) {
        console.error('Error inserting user:', error);
        return null;
    }
}