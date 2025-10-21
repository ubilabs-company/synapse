import { asc, eq } from 'drizzle-orm'
import type { FastifyZodInstance } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db, tables } from '@/lib/drizzle'
import { auth } from '@/middleware/auth'
import { UnauthorizedError } from '@/utils/errors'

export default async function getThreadMessages(app: FastifyZodInstance) {
  app.register(auth).get('/threads', {
    schema: {
      tags: ['Thread'],
      summary: 'Get user threads.',
      operationId: 'getThreads',
      response: {
        200: z.array(
          z.object({
            id: z.uuid(),
            title: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            ownerId: z.uuid(),
          }),
        ),
        [UnauthorizedError.status]: UnauthorizedError.schema,
      },
    },
    handler: async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const threads = await db.query.threads.findMany({
        where: eq(tables.threads.ownerId, userId),
        orderBy: [asc(tables.threads.updatedAt)],
      })

      return reply.status(200).send(threads)
    },
  })
}
