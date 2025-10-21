import ky from 'ky'
import { cookies } from '@/lib/cookies'

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async request => {
        const token = cookies.get('token')

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
