import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { isAuthenticated } from '@/utils/auth'

export function AppLayout() {
  const navigate = useNavigate()
  const { thread } = useParams<{ thread: string }>()

  if (!thread) {
    console.log('Thread is empty.')
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/sign-in')
    }
  }, [navigate])

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative flex flex-col flex-1 max-h-screen">
          <SidebarTrigger className="p-4 m-2 fixed z-1 sm:hidden" />
          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}
