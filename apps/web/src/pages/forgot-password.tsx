import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ForgotPassword() {
  return (
    <div className="p-8">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Recupere sua conta
            </h1>

            <p className="text-sm text-muted-foreground">
              Você receberá as instruções para redefinir sua senha por e-mail.
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" type="email" id="email" />
          </div>

          <div className=" space-y-1 flex flex-col items-center">
            <Button type="submit" className="w-full">
              Recuperar Senha
            </Button>

            <span className="flex gap-1 text-xs font-medium text-muted-foreground">
              <Link to="/sign-up" className="text-foreground hover:underline">
                Acessar
              </Link>
              ao invés disso.
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
