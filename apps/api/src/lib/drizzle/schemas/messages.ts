import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core'
import { threads } from './threads'

export const threadRole = pgEnum('thread_role', ['ASSISTANT', 'USER'])

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  threadId: uuid('thread_id')
    .notNull()
    .references(() => threads.id, { onDelete: 'cascade' }),
  order: serial('order').notNull(),
  role: threadRole().notNull(),
  content: text('content').notNull(),
})

export const threadsRelations = relations(messages, ({ one }) => ({
  thread: one(threads, {
    fields: [messages.threadId],
    references: [threads.id],
  }),
}))
