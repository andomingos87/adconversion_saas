'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Layout, FolderOpen, HelpCircle, BookOpen, LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Templates', href: '/templates', icon: Layout },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Support', href: '/support', icon: HelpCircle },
  { name: 'Knowledge Base', href: '/know-how', icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()
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
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-[#E6E8EA] bg-white transition-colors duration-300 dark:border-gray-700/80 dark:bg-gray-800/95">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-8">
          <div className="p-4">
            <Image
              src="/logo-adconversion-dark.png"
              alt="Logo"
              width={150}
              height={40}
              className="block dark:hidden"

            />
            <Image
              src="/logo-adconversion-light.png"
              alt="Logo"
              width={150}
              height={40}
              className="hidden dark:block"
            />
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#125CC6] text-white dark:bg-blue-600 dark:text-gray-50'
                      : 'text-[#1E2329] hover:bg-[#F7F8FA] dark:text-gray-100 dark:hover:bg-gray-700/70'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {user && (
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#1E2329] transition-colors hover:bg-[#F7F8FA] dark:text-gray-100 dark:hover:bg-gray-700/70"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        )}
      </div>
    </aside>
  )
} 