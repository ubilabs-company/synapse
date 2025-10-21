import { and, asc, eq } from 'drizzle-orm'
import type { FastifyZodInstance } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db, tables } from '@/lib/drizzle'
import { auth } from '@/middleware/auth'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/utils/errors'

export default async function getThreadMessages(app: FastifyZodInstance) {
  app.register(auth).get('/threads/:threadId/messages', {
    schema: {
      tags: ['Thread'],
      summary: 'Get thread messages.',
      operationId: 'getThreadMessages',
      params: z.object({
        threadId: z.uuid(),
      }),
      response: {
        200: z.array(
          z.object({
            role: z.union([
              z.literal('assistant'),
              z.literal('user'),
              z.literal('system'),
              z.literal('tool'),
            ]),
            content: z.string(
              "Hello! I'm doing well, thank you. How are you today?",
            ),
          }),
        ),
        [BadRequestError.status]: BadRequestError.schema,
        [UnauthorizedError.status]: UnauthorizedError.schema,
      },
    },
    handler: async (request, reply) => {
      const { threadId } = request.params
      const userId = await request.getCurrentUserId()

      const thread = await db.query.threads.findFirst({
        where: and(
          eq(tables.threads.id, threadId),
          eq(tables.threads.ownerId, userId),
        ),
      })

      if (!thread) {
        throw new NotFoundError("Couldn't find thread.")
      }

      const messages = await db.query.messages.findMany({
        columns: {
          role: true,
          content: true,
        },
        where: eq(tables.messages.threadId, thread.id),
        orderBy: [asc(tables.messages.createdAt)],
      })

      return reply.status(200).send(messages)
    },
  })
}
