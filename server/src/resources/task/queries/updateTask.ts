import { db } from "@/db";
import { eq } from "drizzle-orm";
import { tasks } from "@/db/schema";

export async function updateTask(title: string, status: string, taskId: string) {
    try {
        const task = await db.update(tasks).set({ title, status }).where(eq(tasks.id, taskId)).returning();
        return task;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}