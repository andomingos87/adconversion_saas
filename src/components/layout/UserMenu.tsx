'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { createBrowserClient } from '@supabase/ssr'
import { useAuth } from '@/contexts/AuthContext'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function UserMenu() {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const { user } = useAuth()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/auth/signin')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:ring-offset-gray-800 hover:ring-2">
          <span className="sr-only">Abrir menu do usuário</span>
          <Image
            className="h-8 w-8 rounded-full ring-2 ring-transparent transition-all duration-200 hover:ring-blue-500 dark:hover:ring-blue-400"
            src={user?.user_metadata?.avatar_url || '/avatar-placeholder.png'}
            alt={user?.email || ''}
            width={32}
            height={32}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profile"
                className={classNames(
                  active ? 'bg-gray-100 dark:bg-gray-700/70' : '',
                  'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                )}
              >
                Meu Perfil
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={toggleTheme}
                className={classNames(
                  active ? 'bg-gray-100 dark:bg-gray-700/70' : '',
                  'block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200'
                )}
              >
                {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSignOut}
                className={classNames(
                  active ? 'bg-gray-100 dark:bg-gray-700/70' : '',
                  'block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200'
                )}
              >
                Sair
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 