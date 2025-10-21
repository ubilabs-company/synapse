import { and, eq } from 'drizzle-orm'
import type { FastifyZodInstance } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db, tables } from '@/lib/drizzle'
import { auth } from '@/middleware/auth'
import { NotFoundError, UnauthorizedError } from '@/utils/errors'

export default async function renameThread(app: FastifyZodInstance) {
  app.register(auth).patch('/threads/:threadId', {
    schema: {
      tags: ['Thread'],
      summary: 'Rename a thread.',
      operationId: 'renameThread',
      body: z.object({
        title: z
          .string()
          .meta({ example: "AI's Impact on Creative Industries" }),
      }),
      params: z.object({
        threadId: z.uuid(),
      }),
      response: {
        204: z.null(),
        [UnauthorizedError.status]: UnauthorizedError.schema,
      },
    },
    handler: async (request, reply) => {
      const { threadId } = request.params
      const { title } = request.body
      const userId = await request.getCurrentUserId()

      const thread = await db.query.threads.findFirst({
        where: and(
          eq(tables.threads.ownerId, userId),
          eq(tables.threads.id, threadId),
        ),
      })

      if (!thread) {
        throw new NotFoundError("Couldn't find thread.")
      }

      await db
        .update(tables.threads)
        .set({ title })
        .where(eq(tables.threads.id, thread.id))

      return reply.status(204).send()
    },
  })
}
