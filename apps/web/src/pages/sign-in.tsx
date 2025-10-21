import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithPassword } from '@/http/sign-in'
import { cookies } from '@/lib/cookies'

const formSchema = z.object({
  email: z.email('Por favor, insira um endereço de e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
})

export function SignIn() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password } = data

    try {
      const { token } = await signInWithPassword({
        email,
        password,
      })

      cookies.set('token', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      navigate('/chat')
    } catch (err) {
      if (err instanceof HTTPError) {
        const { message } = await err.response.json()

        return { success: false, message, errors: null }
      }

      console.error(err)
    }
  }

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

        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input {...field} name="email" type="email" id="email" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...field}
                    name="password"
                    type="password"
                    id="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-foreground hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </Field>
              )}
            />
          </FieldGroup>

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
