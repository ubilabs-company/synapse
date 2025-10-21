import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  firstName: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres.'),
  lastName: z.string().min(2, 'O sobrenome deve ter no mínimo 2 caracteres.'),
  email: z.email('Por favor, insira um endereço de e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: z
    .string()
    .min(6, 'A confirmação da senha deve ter no mínimo 6 caracteres.'),
})

export function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

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

        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-4">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="first-name">Nome</FieldLabel>
                  <Input
                    {...field}
                    name="first-name"
                    type="text"
                    id="first-name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="last-name">Sobrenome</FieldLabel>
                  <Input
                    {...field}
                    name="last-name"
                    type="text"
                    id="last-name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="password-confirmation">
                    Confirmar Senha
                  </FieldLabel>
                  <Input
                    {...field}
                    name="password-confirmation"
                    type="password"
                    id="password-confirmation"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
