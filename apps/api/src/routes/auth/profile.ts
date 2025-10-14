import { eq } from 'drizzle-orm'
import type { FastifyZodInstance } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db, tables } from '@/lib/drizzle'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/utils/errors'

export default async function getProfile(app: FastifyZodInstance) {
  app.get('/users', {
    schema: {
      tags: ['Auth'],
      summary: 'Get authenticated user profile.',
      operationId: 'getProfile',
      security: [{ bearerAuth: [] }],
      response: {
        200: z.object({
          user: z.object({
            id: z.string().uuid(),
            username: z.string().nullable().meta({ example: 'John Doe' }),
            email: z
              .string()
              .nullable()
              .meta({ example: 'john.doe@example.com' }),
            avatarUrl: z.url().nullable(),
          }),
        }),
        [BadRequestError.status]: BadRequestError.schema,
        [UnauthorizedError.status]: UnauthorizedError.schema,
        [NotFoundError.status]: NotFoundError.schema,
      },
    },
    handler: async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const user = await db.query.users.findFirst({
        columns: {
          id: true,
          username: true,
          email: true,
          avatarUrl: true,
        },
        where: eq(tables.users.id, userId),
      })

      if (!user) {
        throw new NotFoundError('User not found')
      }

      return reply.status(200).send({ user })
    },
  })
}
