import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'

const shimmerStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(90deg, transparent calc(50% - 40px), #12A594, #E93D82, #FFB224, transparent calc(50% + 40px))',
  backgroundSize: '200% 100%',
  backgroundPosition: '-50% center',
}

export function NavThreads({
  favorites,
}: {
  favorites: {
    name: string
    url: string
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-sm">Recente</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map(item => (
          <Dialog key={item.name}>
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild className="h-10">
                <a href={item.url} title={item.name}>
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction className="!top-2.5" showOnHover>
                    <MoreVertical />
                    <span className="sr-only">Mais</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="text-muted-foreground" />
                      <span>Renomear</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem className="cursor-pointer">
                    <Trash2 className="text-muted-foreground" />
                    <span>Deletar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Renomear conversa</DialogTitle>
              </DialogHeader>
              <Input
                id="name-1"
                name="name"
                placeholder="Ideias para Campanha de Natal"
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Renomear</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
