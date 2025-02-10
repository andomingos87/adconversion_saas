import Image from 'next/image'
import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/logo-adconversion-dark.png"
          alt="Logo"
          width={200}
          height={50}
          className="mx-auto block dark:hidden"
        />
        <Image
          src="/logo-adconversion-light.png"
          alt="Logo"
          width={200}
          height={50}
          className="mx-auto hidden dark:block"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow dark:bg-gray-800 sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Verifique seu email
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Enviamos um link de confirmação para o seu email.
              Por favor, verifique sua caixa de entrada e spam.
            </p>
            <div className="mt-6">
              <Link
                href="/auth/signin"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Voltar para login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 