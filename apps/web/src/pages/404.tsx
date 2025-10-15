import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="text-muted-foreground mb-2">
        Ops! Você chegou a um território digital inexplorado.
      </p>
      <Link to="/chat">
        <Button type="submit">Voltar</Button>
      </Link>
    </div>
  )
}
