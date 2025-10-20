import { PanelLeft, SquarePen } from 'lucide-react'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { ModeToggle } from './theme/theme-toggle'

export function NavHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-between">
        <SidebarMenuButton
          onClick={toggleSidebar}
          className="cursor-pointer hidden sm:block w-fit"
        >
          <PanelLeft />
        </SidebarMenuButton>
        <SidebarMenuButton className="cursor-pointer sm:w-fit group-data-[collapsible=icon]:hidden">
          <SquarePen />
          <span className="font-medium mt-1 sm:hidden">Nova Conversa</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
