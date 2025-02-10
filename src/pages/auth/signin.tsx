import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/')
    } catch (error) {
      setError('Email ou senha inválidos')
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
            Bem-vindo(a) de volta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entre com seu email e senha
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 sm:px-10">
            <form className="space-y-6" onSubmit={handleSignIn}>
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
                    className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm text-gray-500 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Digite seu email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full appearance-none rounded-lg border text-gray-500 border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Lembrar por 30 dias
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/auth/reset-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Esqueceu a senha?
                  </Link>
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
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Não tem uma conta?{' '}
              <Link
                href="/auth/signup"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Criar conta grátis
              </Link>
            </p>
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