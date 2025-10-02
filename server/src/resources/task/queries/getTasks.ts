import { db } from "@/db";
import { eq } from "drizzle-orm";
import { tasks } from "@/db/schema";

export async function getTasks(userId: string) {
    try {
        const result = await db.select().from(tasks).where(eq(tasks.userId, userId));

        return result;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}