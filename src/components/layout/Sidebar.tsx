'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, Layout, FolderOpen, HelpCircle, BookOpen, LogOut } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Templates', href: '/templates', icon: Layout },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Support', href: '/support', icon: HelpCircle },
  { name: 'Knowledge Base', href: '/know-how', icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-[#E6E8EA] bg-white">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8">
              <Image
                src="/logo-adconversion.png"
                alt="AdConversion Logo"
                width={140}
                height={32}
                priority
                className="object-contain"
              />
            </div>
          </Link>

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
                      ? 'bg-[#125CC6] text-white'
                      : 'text-[#1E2329] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#1E2329] hover:bg-[#F7F8FA]"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
} 