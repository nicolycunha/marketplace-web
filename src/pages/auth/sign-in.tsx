import { AuthCard } from '@/components/auth-card'
import { Input } from '@/components/input'
import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from 'react-router-dom'

export function SignIn() {
  return (
    <AuthCard
      title="Acesse sua conta"
      description="Informe seu e-mail e senha para entrar"
    >
      <div className="flex flex-col h-full justify-between gap-20">
        <form className="flex flex-col gap-5">
          <Input
            id="email"
            label="E-mail"
            placeholder="Seu e-mail cadastrado"
            type="email"
            icon={Mail02Icon}
          />

          <Input
            id="password"
            label="Senha"
            placeholder="Sua senha de acesso"
            type="password"
            icon={AccessIcon}
          />

          <button className="bg-orange-base mt-12 font-action-md flex justify-between items-center border-none p-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark">
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
