import { relations, sql } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { messages } from './messages'
import { users } from './users'

export const threads = pgTable('threads', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
})

export const threadsRelations = relations(threads, ({ one, many }) => ({
  owner: one(users, {
    fields: [threads.ownerId],
    references: [users.id],
  }),
  messages: many(messages),
}))
