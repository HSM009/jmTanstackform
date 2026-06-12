import { auth } from '@/lib/auth'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { getEvent, setCookie } from 'vinxi/server' // or 'nitropack/runtime'

export const getSessionFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })
    const token = 'your_geerated_jwt_toke'
    const event = getEvent()
    setCookie(event, 'session_token', token, {
      httpOnly: true,
      secure: true, // Required for HTTPS production environments on Vercel
      sameSite: 'lax',
      path: '/',
    })
    if (!session) {
      throw redirect({ to: '/' })
    }
    return session
  },
)
