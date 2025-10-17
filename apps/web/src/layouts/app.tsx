import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex flex-col flex-1 max-h-screen">
        <SidebarTrigger className="p-4 m-2 fixed z-1" />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
