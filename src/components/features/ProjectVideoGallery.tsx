'use client'

import Image from 'next/image'
import { Copy } from 'lucide-react'

interface ProjectVideoGalleryProps {
  videos: {
    id: number
    thumbnail: string
  }[]
}

export function ProjectVideoGallery({ videos }: ProjectVideoGalleryProps) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg border border-[#E6E8EA] bg-[#F7F8FA] p-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {videos.map((video) => (
        <div key={video.id} className="group relative w-full max-w-[160px]">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
            <Image
              src={video.thumbnail}
              alt="Video thumbnail"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <button className="absolute right-2 top-2 flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 text-xs font-medium text-[#125CC6] shadow-lg transition-opacity hover:bg-[#125CC6] hover:text-white opacity-0 group-hover:opacity-100">
              <Copy className="h-3.5 w-3.5" />
              Replicate
            </button>
          </div>
        </div>
      ))}
    </div>
  )
} 