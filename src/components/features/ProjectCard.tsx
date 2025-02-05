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
      className={`container-interactive shadow-hover w-[260px] shrink-0 p-3 ${
        isSelected ? 'border-[#125CC6] dark:border-blue-500' : ''
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
          <h3 className="mb-1 font-medium text-primary">
            {project.name}
          </h3>
          <p className="flex items-center gap-1 text-sm text-secondary">
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
            className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary container-hover"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showMenu && (
            <div
              className="container-base fixed right-0 top-full z-50 mt-1 w-36 overflow-hidden py-1 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-primary container-hover">
                <Pencil className="h-3.5 w-3.5" />
                Renomear
              </button>
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 container-hover dark:text-red-400">
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