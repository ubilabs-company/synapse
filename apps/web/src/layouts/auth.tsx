import { Brain } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '@/utils/auth'

export function AuthLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('?')
    if (isAuthenticated()) {
      console.log('???')
      navigate('/chat')
    }
  }, [navigate])

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Brain className="size-5" />
          <span className="font-semibold">Synapse</span>
        </div>

        <footer className="text-sm">
          Copyright &copy; UbiLabs - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
