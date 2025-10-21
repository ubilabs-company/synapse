import * as ai from 'ai'
import type { FastifyZodInstance } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { model } from '@/lib/ai'
import { db, tables } from '@/lib/drizzle'
import { auth } from '@/middleware/auth'
import { BadRequestError, UnauthorizedError } from '@/utils/errors'

export default async function createThread(app: FastifyZodInstance) {
  app.register(auth).post('/threads', {
    schema: {
      tags: ['Thread'],
      summary: 'Create a new thread.',
      operationId: 'createNewThread',
      body: z.object({
        message: z.string().meta({ example: 'Hello, how are you?' }),
      }),
      response: {
        201: z.object({
          threadId: z.uuid(),
        }),
        [BadRequestError.status]: BadRequestError.schema,
        [UnauthorizedError.status]: UnauthorizedError.schema,
      },
    },
    handler: async (request, reply) => {
      const { message } = request.body
      const userId = await request.getCurrentUserId()

      const { text: title } = await ai.generateText({
        model,
        prompt: `Give me a concise conversation title with this initial message: ${message}`,
      })

      const { text: response } = await ai.generateText({
        model,
        prompt: message,
      })

      const { id: threadId } = await db.transaction(async tx => {
        const [thread] = await tx
          .insert(tables.threads)
          .values({ ownerId: userId, title })
          .returning()

        await tx
          .insert(tables.messages)
          .values([
            { threadId: thread.id, role: 'user', content: message },
            { threadId: thread.id, role: 'assistant', content: response },
          ])
          .returning()

        return thread
      })

      return reply.status(201).send({ threadId })
    },
  })
}
