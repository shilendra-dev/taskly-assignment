import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users-schema";

export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    title: text('title').notNull(),
    status: text('status').default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})