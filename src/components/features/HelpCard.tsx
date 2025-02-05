'use client'

import { ChevronRight, LucideIcon } from 'lucide-react'

interface HelpCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export function HelpCard({ title, description, icon: Icon }: HelpCardProps) {
  return (
    <div className="container-interactive shadow-hover p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-500/30">
        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
      </div>
      <h3 className="mb-2 font-medium text-primary">{title}</h3>
      <p className="mb-4 text-sm text-secondary">{description}</p>
      <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-200">
        Learn more
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  )
} 