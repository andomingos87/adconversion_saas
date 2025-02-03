'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Video } from '@/types/project'
import { MoreVertical, Pencil, Trash } from 'lucide-react'

interface VideoGalleryProps {
  projectName: string
  videos: Video[]
}

export function VideoGallery({ projectName, videos }: VideoGalleryProps) {
  const [showMenu, setShowMenu] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1E2329]">
          Vídeos de {projectName}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative cursor-pointer rounded-lg border border-[#E6E8EA] bg-white p-3 transition-colors hover:border-[#125CC6]"
          >
            <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 font-medium text-[#1E2329]">{video.title}</h3>
                <p className="text-sm text-[#1E2329]/70">
                  {new Date(video.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(showMenu === video.id ? null : video.id)
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1E2329]/70 hover:bg-[#E6E8EA] hover:text-[#1E2329]"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {showMenu === video.id && (
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
        ))}
      </div>
    </div>
  )
} 