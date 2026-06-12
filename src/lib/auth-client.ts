import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import type { auth } from '@/lib/auth'

export const authClient = createAuthClient({
  baseURL: 'https://medcareid.vercel.app/',
  plugins: [inferAdditionalFields<typeof auth>()],
})
