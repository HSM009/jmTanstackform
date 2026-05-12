import { LucideIcon } from 'lucide-react'
import { authClient } from './auth-client'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { type User } from 'better-auth'

export interface navUserProps {
  user: User
}

export interface NavPrimaryProps {
  items: {
    title: string
    to: string
    icon: LucideIcon
    activeOptions: { exact: boolean }
  }[]
}

//------------Handle Signout------------------
export const useHandleSignOut = () => {
  const navigate = useNavigate()
  return async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({
            to: '/',
          })
          toast.success('Signed out Successfully')
        },
        onError: ({ error }) => {
          toast.error(error.message)
        },
      },
    })
  }
}
