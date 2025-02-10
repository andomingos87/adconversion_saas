import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [fullname, setFullname] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Verificar conexão com internet
      if (!navigator.onLine) {
        setError('Sem conexão com a internet. Por favor, verifique sua conexão e tente novamente.')
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullname.trim()
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      }).catch(err => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Erro de conexão com o servidor. Por favor, tente novamente em alguns instantes.')
        }
        throw err
      })

      if (signUpError) {
        if (signUpError.message === 'User already registered') {
          setError('Este email já está cadastrado. Por favor, faça login ou use outro email.')
          return
        }
        throw signUpError
      }

      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(
            {
              id: data.user.id,
              full_name: fullname.trim(),
              email: email,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'id' }
          )

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
          throw profileError
        }

        router.push('/auth/verify-email')
      }
    } catch (error: any) {
      console.error('Erro detalhado:', error)
      setError(error?.message || 'Erro ao criar conta. Por favor, tente novamente.')
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
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="fullname"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}

                    className="block w-full appearance-none rounded-lg text-gray-500 border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Type your full name"
                  />
                </div>
              </div>
              
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm text-gray-500 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Digite sua senha"
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
                  className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-gray-500 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Criando conta...' : 'Criar conta'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Já tem uma conta?{' '}
              <Link
                href="/auth/signin"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Entrar
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