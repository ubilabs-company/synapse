import { api } from './api-client'

type SignInRequest = {
  email: string
  password: string
}

type SignInResponse = {
  token: string
}

export async function signInWithPassword({ email, password }: SignInRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInResponse>()

  return result
}
