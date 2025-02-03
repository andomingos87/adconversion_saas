'use client'

import { ChevronRight, LucideIcon } from 'lucide-react'

interface HelpCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export function HelpCard({ title, description, icon: Icon }: HelpCardProps) {
  return (
    <div className="group cursor-pointer rounded-lg border border-[#E6E8EA] bg-white p-6 transition-shadow hover:shadow-lg">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#125CC6]/10">
        <Icon className="h-5 w-5 text-[#125CC6]" />
      </div>
      <h3 className="mb-2 font-medium text-[#1E2329]">{title}</h3>
      <p className="mb-4 text-sm text-[#1E2329]/70">{description}</p>
      <div className="flex items-center text-sm font-medium text-[#125CC6]">
        Learn more
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  )
} 