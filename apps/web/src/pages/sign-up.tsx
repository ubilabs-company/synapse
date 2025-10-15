import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUp() {
  return (
    <div className="p-8">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>

          <p className="text-sm text-muted-foreground">
            Cadastre-se para começar a usar nosso assistente inteligente e
            aumentar sua produtividade.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="space-y-1">
            <Label htmlFor="username">Nome</Label>
            <Input name="username" type="text" id="username" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" type="email" id="email" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input name="password" type="password" id="password" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirmar Senha</Label>
            <Input
              name="password_confirmation"
              type="password"
              id="password_confirmation"
            />
          </div>

          <div className=" space-y-1 flex flex-col items-center">
            <Button type="submit" className="w-full">
              Registre-se
            </Button>

            <span className="flex gap-1 text-xs font-medium text-muted-foreground">
              Já possui uma conta?
              <Link to="/sign-in" className="text-foreground hover:underline">
                Acessar
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
