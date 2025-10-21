import { api } from './api-client'

type SignInRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function signInWithPassword({
  firstName,
  lastName,
  email,
  password,
}: SignInRequest) {
  await api
    .post('sessions/password', {
      json: {
        firstName,
        lastName,
        email,
        password,
      },
    })
    .json<void>()
}
