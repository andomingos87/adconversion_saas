'use client'

import { CreditCard, Video, TrendingUp } from 'lucide-react'

const stats = [
  {
    name: 'Credits Available',
    value: '40',
    description: '0/40 credits used',
    icon: CreditCard,
  },
  {
    name: 'Videos Created',
    value: '0',
    description: 'No videos created yet',
    icon: Video,
  },
  {
    name: 'Average Ads',
    value: '0',
    description: 'Per week',
    icon: TrendingUp,
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.name}
            className="rounded-lg bg-[#F7F8FA] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#1E2329]/70">{stat.name}</p>
                <p className="mt-2 text-3xl font-semibold text-[#1E2329]">{stat.value}</p>
                <p className="mt-1 text-sm text-[#1E2329]/70">{stat.description}</p>
              </div>
              <Icon className="h-5 w-5 text-[#1652F0]" />
            </div>
          </div>
        )
      })}
    </div>
  )
} 