import * as ai from 'ai'
import { and, asc, eq } from 'drizzle-orm'
import type { FastifyZodInstance } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { model } from '@/lib/ai'
import { db, tables } from '@/lib/drizzle'
import { auth } from '@/middleware/auth'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/utils/errors'

export default async function sendMessage(app: FastifyZodInstance) {
  app.register(auth).post('/threads/:threadId/messages', {
    schema: {
      tags: ['Thread'],
      summary: 'Send new thread message.',
      operationId: 'sendMessage',
      params: z.object({
        threadId: z.uuid(),
      }),
      body: z.object({
        content: z.string().meta({ example: 'Hello, how are you?' }),
      }),
      response: {
        200: z.object({
          role: z.literal('assistant'),
          content: z.string(
            "Hello! I'm doing well, thank you. How are you today?",
          ),
        }),
        [BadRequestError.status]: BadRequestError.schema,
        [UnauthorizedError.status]: UnauthorizedError.schema,
      },
    },
    handler: async (request, reply) => {
      const { threadId } = request.params
      const { content } = request.body
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

      const messages = (await db.query.messages.findMany({
        columns: {
          role: true,
          content: true,
        },
        where: eq(tables.messages.threadId, thread.id),
        orderBy: [asc(tables.messages.createdAt)],
      })) as ai.ModelMessage[]

      const newMessage = {
        role: 'user',
        content,
      } as ai.ModelMessage

      messages.push(newMessage)

      const { text: assistantContent } = await ai.generateText({
        model,
        messages,
      })

      const response = {
        role: 'assistant' as const,
        content: assistantContent,
      }

      await db.insert(tables.messages).values([
        {
          threadId,
          role: 'user',
          content,
        },
        {
          threadId,
          ...response,
        },
      ])

      return reply.status(200).send(response)
    },
  })
}
