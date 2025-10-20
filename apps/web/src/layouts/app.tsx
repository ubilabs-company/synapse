import { Outlet, useParams } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export function AppLayout() {
  const { thread } = useParams<{ thread: string }>()
  console.log(thread)

  if (!thread) {
    console.log('Thread is empty.')
  }

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
