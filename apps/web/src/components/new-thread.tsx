import { Brain, SquarePen } from 'lucide-react'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NewThread() {
  return (
    // <SidebarMenu className="flex">
    <SidebarMenuButton className="flex">
      <SquarePen className="size-4" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">New thread</span>
      </div>
    </SidebarMenuButton>
    // </SidebarMenu>
  )
}
