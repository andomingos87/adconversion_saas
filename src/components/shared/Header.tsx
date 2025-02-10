import { UserMenu } from '@/components/features/UserMenu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
} 