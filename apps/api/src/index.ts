import { join } from 'node:path'
import autoLoad from '@fastify/autoload'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '@/utils/env'
import { errorHandler, notFoundHandler } from './utils/errors'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.withTypeProvider<ZodTypeProvider>()

app.setErrorHandler(errorHandler)
app.setNotFoundHandler(notFoundHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Synapse',
      description: 'Simple OpenAI Wrapper',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(import('@scalar/fastify-api-reference'), {
  routePrefix: '/docs',
  configuration: {
    defaultHttpClient: {
      targetKey: 'node',
      clientKey: 'axios',
    },
  },
})

app.register(fastifyCors)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  dirNameRoutePrefix: false,
})

app.listen({ port: env.PORT }).then(() => {
  const url = `http://${env.ADDRESS}:${env.PORT}`
  console.log(`Server is running on ${url}`)
  console.log(`Access API documentation at ${url}/docs`)
  console.group
})
