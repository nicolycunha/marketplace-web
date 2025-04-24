import { AuthCard } from '@/components/auth-card'
import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
  ViewIcon,
  ViewOffIcon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(prev => !prev)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm)
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate('/', { replace: true })
    }
  })

  async function handleSignIn(data: SignInForm) {
    const result = await authenticate({
      email: data.email,
      password: data.password
    })

    localStorage.setItem('token', result.accessToken)
  }

  return (
    <AuthCard
      title="Acesse sua conta"
      description="Informe seu e-mail e senha para entrar"
    >
      <div className="flex flex-col h-full justify-between gap-20">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col gap-5"
        >
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

          <button
            className="bg-orange-base mt-12 font-action-md flex justify-between items-center border-none p-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark"
            disabled={isSubmitting}
            type="submit"
          >
            Acessar
            <HugeiconsIcon icon={ArrowRight02Icon} className="h-6 w-6" />
          </button>
        </form>

        <div>
          <p className="font-body-md text-gray-300">Ainda não tem uma conta?</p>
          <Link
            to="/sign-up"
            className="bg-transparent mt-5 font-action-md flex justify-between items-center border border-orange-base p-4 rounded-xl text-orange-base hover:cursor-pointer hover:text-orange-dark hover:border-orange-dark"
          >
            Cadastro
            <HugeiconsIcon icon={ArrowRight02Icon} className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}
