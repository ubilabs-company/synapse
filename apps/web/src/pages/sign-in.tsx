import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  return (
    <div className="p-8">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar chat
          </h1>

          <p className="text-sm text-muted-foreground">
            Mantenha-se produtivo com nosso assistente inteligente!
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" type="email" id="email" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input name="password" type="password" id="password" />

            <Link
              to="/forgot-password"
              className="text-xs font-medium text-foreground hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <div className=" space-y-1 flex flex-col items-center">
            <Button type="submit" className="w-full">
              Acessar
            </Button>

            <span className="flex gap-1 text-xs font-medium text-muted-foreground">
              Ainda não possui uma conta?
              <Link to="/sign-up" className="text-foreground hover:underline">
                Registre-se
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
