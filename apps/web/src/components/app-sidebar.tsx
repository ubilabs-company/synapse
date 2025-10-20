import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { NavHeader } from './nav-header'
import { NavThreads } from './nav-threads'
import { NavUser } from './nav-user'

const user = {
  name: 'John Doe',
  email: 'email@example.com',
  avatar: 'https://api.github.com/users/PedroClerici',
}

const favorites = [
  {
    name: 'Gerenciamento de Projetos e Rastreamento de Tarefas',
    url: '#',
  },
  {
    name: 'Coleção de Receitas de Família e Planejamento de Refeições',
    url: '#',
  },
  {
    name: 'Rastreador Fitness e Rotinas de Treino',
    url: '#',
  },
  {
    name: 'Notas de Livros e Lista de Leitura',
    url: '#',
  },
  {
    name: 'Dicas de Jardinagem Sustentável e Cuidado com as Plantas',
    url: '#',
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavThreads favorites={favorites} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
