import { db } from "@/db";
import { tasks } from "@/db/schema";

export async function insertTask(title: string, status: string, userId: string) {
    try {
        const task = await db.insert(tasks).values({ title, status, userId }).returning();

        return task;
    } catch (error) {
        console.error('Error inserting task:', error);
        return null;
    }
}