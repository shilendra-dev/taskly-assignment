import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export async function fetchUserByEmail(email: string) {
    try {
        const user = await db.select({
            id: users.id,
            email: users.email,
            name: users.name,
        }).from(users).where(eq(users.email, email));
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
}
