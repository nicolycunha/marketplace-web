import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Picture } from '@/components/picture'
import { signUp } from '@/api/sign-up'

import { AuthCard } from '@/components/auth-card'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  InformationCircleIcon,
  Mail02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useNavigate } from 'react-router-dom'
import { uploadAttachments } from '@/api/upload-attachments'

const signUpForm = z
  .object({
    name: z.string().min(1, { message: 'O nome é obrigatório' }),
    phone: z.string().min(1, { message: 'O telefone é obrigatório' }),
    email: z
      .string()
      .min(1, { message: 'O e-mail é obrigatório' })
      .email('E-mail inválido'),
    password: z.string().min(1, { message: 'A senha é obrigatória' }),
    passwordConfirmation: z.string().min(1, {
      message: 'A confirmação é obrigatória'
    }),
    file: z.any().refine(file => file instanceof FileList && file.length > 0, {
      message: 'A imagem é obrigatória'
    })
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não conferem'
  })

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const [preview, setPreview] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)
  const togglePassword = () => setShowPassword(prev => !prev)
  const togglePasswordConfirmation = () =>
    setShowPasswordConfirmation(prev => !prev)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm)
  })

  const { mutateAsync: createNewSeller } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate('/', { replace: true })
    }
  })

  const { mutateAsync: uploadAttachmentsFn } = useMutation({
    mutationFn: uploadAttachments
  })

  const fileList = watch('file')

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0])
      setPreview(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [fileList])

  async function handleSignUp(data: SignUpForm) {
    const fileList = data.file as FileList

    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      const attachmentResponse = await uploadAttachmentsFn({
        files: [file]
      })
      const idAttachment = attachmentResponse.attachments[0].id
      await createNewSeller({ ...data, avatarId: idAttachment })
    }
  }

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
            <p className="font-title-sm text-gray-500">Perfil</p>

            <div className="space-y-2 w-fit">
              <label htmlFor="file">
                <Picture isSmall preview={preview} />
                <input
                  id="file"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  hidden
                  {...register('file')}
                />
              </label>
              {errors.file && (
                <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-4 w-4 text-orange-base"
                  />
                  {errors.file.message?.toString()}
                </span>
              )}
            </div>

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
              {errors.name && (
                <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-4 w-4 text-orange-base"
                  />
                  {errors.name.message}
                </span>
              )}
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
              </div>
            </div>
            {errors.phone && (
              <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="h-4 w-4 text-orange-base"
                />
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="space-y-5">
            <p className="font-title-sm text-gray-500">Acesso</p>
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
              {errors.email && (
                <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-4 w-4 text-orange-base"
                  />
                  {errors.email.message}
                </span>
              )}
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
              {errors.password && (
                <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-4 w-4 text-orange-base"
                  />
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="font-label-md text-gray-300 peer-focus:text-orange-base transition-colors"
                htmlFor="passwordConfirmation"
              >
                Confirmar senha
              </label>
              <div className="flex justify-between items-center border-b border-gray-100">
                <div className="flex gap-2 items-center flex-row-reverse">
                  <input
                    className="peer appearance-none bg-transparent  border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base transition-all"
                    id="passwordConfirmation"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    placeholder="Confirme a senha"
                    {...register('passwordConfirmation')}
                  />

                  <HugeiconsIcon
                    icon={AccessIcon}
                    className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
                  />
                </div>

                <button
                  type="button"
                  onClick={togglePasswordConfirmation}
                  aria-label={
                    showPasswordConfirmation ? 'Ocultar senha' : 'Exibir senha'
                  }
                  title={
                    showPasswordConfirmation ? 'Ocultar senha' : 'Exibir senha'
                  }
                  className="p-1 rounded border-none focus:outline-none hover:cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={showPasswordConfirmation ? ViewOffIcon : ViewIcon}
                    className="h-6 w-6 text-gray-300"
                  />
                </button>
              </div>
              {errors.passwordConfirmation && (
                <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-4 w-4 text-orange-base"
                  />
                  {errors.passwordConfirmation.message?.toString()}
                </span>
              )}
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
            to="/sign-in"
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
