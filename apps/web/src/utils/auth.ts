import { cookies } from '@/lib/cookies'

export function isAuthenticated() {
  return !!cookies.get('token')
}
