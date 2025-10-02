import { db } from "@/db";
import { eq } from "drizzle-orm";
import { tasks } from "@/db/schema";

export async function deleteTask(taskId: string) {
    try {
        const task = await db.delete(tasks).where(eq(tasks.id, taskId)).returning();
        return task;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}