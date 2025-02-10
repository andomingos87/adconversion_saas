import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) throw error

      setSuccess(true)
    } catch (error) {
      setError('Erro ao enviar email de recuperação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white md:grid-cols-2">
      {/* Lado Esquerdo - Formulário */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            src="/logo-adconversion-dark.png"
            alt="Logo"
            width={180}
            height={40}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-semibold tracking-tight text-gray-900">
            Recuperar senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 sm:px-10">
            {success ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  Email enviado!
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Verifique sua caixa de entrada para redefinir sua senha.
                </p>
                <div className="mt-6">
                  <Link
                    href="/auth/signin"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Voltar para login
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="Digite seu email"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {error}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                  >
                    {loading ? 'Enviando...' : 'Enviar email de recuperação'}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href="/auth/signin"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Voltar para login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Lado Direito - Imagem */}
      <div className="hidden md:block">
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="absolute inset-0">
            <div className="h-full w-full" style={{
              backgroundImage: "url('/auth-pattern.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.4
            }} />
          </div>
          <div className="relative flex h-full items-center justify-center">
            <Image
              src="/logo-adconversion-light.png"
              alt="Logo"
              width={280}
              height={60}
              className="opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 