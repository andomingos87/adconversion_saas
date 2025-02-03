'use client'

import { Search, SlidersHorizontal } from 'lucide-react'

export function ProjectFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1E2329]/50" />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full rounded-lg border border-[#E6E8EA] bg-white py-2 pl-10 pr-4 text-sm text-[#1E2329] placeholder-[#1E2329]/50 outline-none focus:border-[#125CC6]"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-lg border border-[#E6E8EA] px-4 py-2 text-sm font-medium text-[#1E2329] hover:border-[#125CC6] hover:text-[#125CC6]">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
        <button className="rounded-lg bg-[#125CC6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#125CC6]/90">
          Create New Project
        </button>
      </div>
    </div>
  )
} 