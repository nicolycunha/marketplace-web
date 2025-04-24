import { AuthCard } from '@/components/auth-card'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  Mail02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Picture } from '@/components/picture'

const signUpForm = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  avatarId: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string()
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(prev => !prev)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm)
  })

  const { mutateAsync } = useMutation({})

  async function handleSignUp(data: SignUpForm) {}

  return (
    <AuthCard
      title="Crie sua conta"
      description="Informe os seus dados pessoais e de acesso"
    >
      <div className="flex flex-col h-full justify-between gap-20">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col gap-12"
        >
          <div className="space-y-5">
            <p className="font-title-sm">Perfil</p>

            <Picture isSmall={true} />

            <div className="space-y-2">
              <label className={'font-label-md text-gray-300'} htmlFor="name">
                Nome
              </label>
              <div className="flex justify-between items-center border-b border-gray-100">
                <div className="flex gap-2 items-center flex-row-reverse">
                  <input
                    className="peer appearance-none bg-transparent border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base  transition-all"
                    id="name"
                    placeholder="Seu nome completo"
                    {...register('name')}
                  />

                  <HugeiconsIcon
                    icon={UserIcon}
                    className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={'font-label-md text-gray-300'} htmlFor="phone">
                Telefone
              </label>
              <div className="flex justify-between items-center border-b border-gray-100">
                <div className="flex gap-2 items-center flex-row-reverse">
                  <input
                    className="peer appearance-none bg-transparent border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base  transition-all"
                    id="phone"
                    placeholder="(00) 00000-0000"
                    {...register('phone')}
                  />

                  <HugeiconsIcon
                    icon={CallIcon}
                    className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <p className="font-title-sm">Acesso</p>
            <div className="space-y-2">
              <label className={'font-label-md text-gray-300'} htmlFor="email">
                E-mail
              </label>
              <div className="flex justify-between items-center border-b border-gray-100">
                <div className="flex gap-2 items-center flex-row-reverse">
                  <input
                    className="peer appearance-none bg-transparent border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base  transition-all"
                    id="email"
                    placeholder="Seu e-mail cadastrado"
                    {...register('email')}
                  />

                  <HugeiconsIcon
                    icon={Mail02Icon}
                    className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="font-label-md text-gray-300 peer-focus:text-orange-base transition-colors"
                htmlFor="password"
              >
                Senha
              </label>
              <div className="flex justify-between items-center border-b border-gray-100">
                <div className="flex gap-2 items-center flex-row-reverse">
                  <input
                    className="peer appearance-none bg-transparent  border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base transition-all"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha de acesso"
                    {...register('password')}
                  />

                  <HugeiconsIcon
                    icon={AccessIcon}
                    className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
                  />
                </div>

                <button
                  type="button"
                  onClick={togglePassword}
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  className="p-1 rounded border-none focus:outline-none hover:cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : ViewIcon}
                    className="h-6 w-6 text-gray-300"
                  />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="font-label-md text-gray-300 peer-focus:text-orange-base transition-colors"
                htmlFor="passwordAgain"
              >
                Confirmar senha
              </label>
              <div className="flex justify-between items-center border-b border-gray-100">
                <div className="flex gap-2 items-center flex-row-reverse">
                  <input
                    className="peer appearance-none bg-transparent  border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base transition-all"
                    id="passwordAgain"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirme a senha"
                    {...register('passwordAgain')}
                  />

                  <HugeiconsIcon
                    icon={AccessIcon}
                    className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
                  />
                </div>

                <button
                  type="button"
                  onClick={togglePassword}
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  className="p-1 rounded border-none focus:outline-none hover:cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : ViewIcon}
                    className="h-6 w-6 text-gray-300"
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            className="bg-orange-base font-action-md flex justify-between items-center border-none p-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark"
            disabled={isSubmitting}
            type="submit"
          >
            Cadastrar
            <HugeiconsIcon icon={ArrowRight02Icon} className="h-6 w-6" />
          </button>
        </form>

        <div>
          <p className="font-body-md text-gray-300">Já tem uma conta?</p>
          <Link
            to="/sign-up"
            className="bg-transparent mt-5 font-action-md flex justify-between items-center border border-orange-base p-4 rounded-xl text-orange-base hover:cursor-pointer hover:text-orange-dark hover:border-orange-dark"
          >
            Acessar
            <HugeiconsIcon icon={ArrowRight02Icon} className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}
