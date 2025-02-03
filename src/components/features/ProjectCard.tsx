'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MoreVertical, Pencil, Trash } from 'lucide-react'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  isSelected: boolean
  onSelect: () => void
}

export function ProjectCard({ project, isSelected, onSelect }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div
      className={`group relative flex w-[260px] shrink-0 cursor-pointer flex-col rounded-lg border border-[#E6E8EA] bg-white p-3 transition-colors hover:border-[#125CC6] ${
        isSelected ? 'border-[#125CC6]' : ''
      }`}
      onClick={onSelect}
    >
      <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-1 font-medium text-[#1E2329]">{project.name}</h3>
          <p className="flex items-center gap-1 text-sm text-[#1E2329]/70">
            <span>{project.videoCount}</span>
            <span>vídeos</span>
          </p>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1E2329]/70 hover:bg-[#E6E8EA] hover:text-[#1E2329]"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showMenu && (
            <div
              className="fixed right-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-lg border border-[#E6E8EA] bg-white py-1 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#1E2329] hover:bg-[#E6E8EA]">
                <Pencil className="h-3.5 w-3.5" />
                Renomear
              </button>
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-[#E6E8EA]">
                <Trash className="h-3.5 w-3.5" />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 